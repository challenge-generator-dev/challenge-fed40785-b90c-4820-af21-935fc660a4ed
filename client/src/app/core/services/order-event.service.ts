import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OrderEvent, OrderStatus } from '../models/types/contract.types';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';

/**
 * Servicio para manejar la conexión SSE con el servidor
 * y procesar eventos de órdenes en tiempo real.
 * Implementa reconexión automática y manejo de errores.
 */
@Injectable({
  providedIn: 'root',
})
export class OrderEventService {
  private readonly apiUrl = environment.apiUrl;
  private readonly sseEndpoint = environment.sseEndpoint;
  private readonly maxReconnectAttempts = environment.reconnectAttempts;
  private readonly reconnectDelay = environment.reconnectDelay;
  private readonly eventRetryCount = environment.eventRetryCount;

  private ordersSignal = signal<Order[]>([]);
  private eventSource: EventSource | null = null;
  private reconnectAttempts = 0;
  private isConnecting = false;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el estado reactivo de las órdenes.
   * Retorna una señal de solo lectura para prevenir modificaciones directas.
   */
  get orders() {
    return this.ordersSignal.asReadonly();
  }

  /**
   * Obtiene el estado actual de las órdenes como array.
   * Útil para iteraciones y operaciones de array.
   */
  getCurrentOrders(): Order[] {
    return this.ordersSignal();
  }

  /**
   * Inicia la conexión SSE para recibir eventos de órdenes.
   * Implementa verificación de conexión existente y manejo de estados.
   */
  connect(): void {
    if (this.eventSource || this.isConnecting) {
      return;
    }

    this.isConnecting = true;
    const fullUrl = `${this.apiUrl}${this.sseEndpoint}`;

    try {
      this.eventSource = new EventSource(fullUrl, {
        withCredentials: true,
      });

      this.eventSource.onopen = () => {
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        if (environment.enableDebugLogs) {
          console.log('[OrderEventService] SSE connection established');
        }
      };

      this.eventSource.onmessage = (event) => {
        try {
          const orderEvent: OrderEvent = JSON.parse(event.data);
          this.processEvent(orderEvent);
          this.reconnectAttempts = 0;
        } catch (error) {
          console.error('[OrderEventService] Error parsing event:', error);
        }
      };

      this.eventSource.onerror = (error) => {
        this.isConnecting = false;
        this.handleConnectionError(error);
      };
    } catch (error) {
      this.isConnecting = false;
      console.error('[OrderEventService] Failed to create EventSource:', error);
    }
  }

  /**
   * Maneja errores de conexión e implementa reconexión automática.
   * @param error Evento de error del EventSource.
   */
  private handleConnectionError(error: Event): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      if (environment.enableDebugLogs) {
        console.log(
          `[OrderEventService] Connection error. Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
        );
      }

      this.eventSource?.close();
      this.eventSource = null;

      setTimeout(() => this.connect(), delay);
    } else {
      console.error(
        '[OrderEventService] Max reconnection attempts reached. Connection failed.'
      );
      this.eventSource?.close();
      this.eventSource = null;
    }
  }

  /**
   * Procesa un evento de orden y actualiza el estado reactivo.
   * Maneja tanto actualización de órdenes existentes como creación de nuevas.
   * @param event Evento recibido desde el servidor.
   */
  private processEvent(event: OrderEvent): void {
    const currentOrders = this.ordersSignal();
    const existingOrderIndex = currentOrders.findIndex(
      (order) => order.id === event.orderId
    );

    if (existingOrderIndex >= 0) {
      const updatedOrders = [...currentOrders];
      const existingOrder = updatedOrders[existingOrderIndex];
      existingOrder.updateFromEvent(event);
      updatedOrders[existingOrderIndex] = existingOrder;
      this.ordersSignal.set(updatedOrders);

      if (environment.enableDebugLogs) {
        console.log(
          `[OrderEventService] Updated order ${event.orderId} to status ${event.status.value}`
        );
      }
    } else {
      const newOrder = new Order(
        event.orderId,
        event.status,
        event.timestamp,
        event.metadata
      );
      newOrder.updateFromEvent(event);
      this.ordersSignal.set([...currentOrders, newOrder]);

      if (environment.enableDebugLogs) {
        console.log(
          `[OrderEventService] Created new order ${event.orderId} with status ${event.status.value}`
        );
      }
    }
  }

  /**
   * Obtiene el historial de eventos para una orden específica.
   * Implementa reintentos automáticos y manejo de errores.
   * @param orderId ID de la orden.
   * @returns Observable con el historial de eventos.
   */
  getOrderEvents(orderId: string): Observable<OrderEvent[]> {
    return this.http
      .get<OrderEvent[]>(`${this.apiUrl}/orders/${orderId}/events`)
      .pipe(
        retry(this.eventRetryCount),
        catchError((error) => {
          console.error(
            `[OrderEventService] Error fetching order events for ${orderId}:`,
            error
          );
          return throwError(
            () => new Error(`Failed to fetch order events for order: ${orderId}`)
          );
        })
      );
  }

  /**
   * Obtiene una orden específica por su ID.
   * @param orderId ID de la orden a buscar.
   * @returns La orden encontrada o undefined.
   */
  getOrderById(orderId: string): Order | undefined {
    return this.ordersSignal().find((order) => order.id === orderId);
  }

  /**
   * Limpia todas las órdenes del estado.
   * Útil para pruebas o reset de la aplicación.
   */
  clearOrders(): void {
    this.ordersSignal.set([]);
  }

  /**
   * Cierra la conexión SSE y limpia el estado.
   * Debe llamarse al destruir el componente que usa el servicio.
   */
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.isConnecting = false;
      this.reconnectAttempts = 0;

      if (environment.enableDebugLogs) {
        console.log('[OrderEventService] SSE connection closed');
      }
    }
  }

  /**
   * Verifica si hay una conexión activa.
   * @returns true si hay una conexión SSE activa.
   */
  isConnected(): boolean {
    return this.eventSource !== null && this.eventSource.readyState === EventSource.OPEN;
  }

  /**
   * Obtiene el número de reintentos de conexión actuales.
   * Útil para debugging y métricas.
   */
  getReconnectAttempts(): number {
    return this.reconnectAttempts;
  }
}