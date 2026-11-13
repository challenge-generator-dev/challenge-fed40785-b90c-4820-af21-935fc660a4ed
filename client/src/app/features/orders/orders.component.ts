import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { OrderEventService } from '../../core/services/order-event.service';
import { Order } from '../../core/models/order.model';
import { CommonModule } from '@angular/common';
import { OrderStatusBadgeComponent } from '../../shared/components/order-status-badge.component';

/**
 * Componente contenedor para la visualización y gestión de órdenes.
 * Maneja la lógica de suscripción a eventos y actualización del estado.
 */
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderStatusBadgeComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private orderEventService: OrderEventService) {
    effect(() => {
      this.orders = this.orderEventService.orders();
    });
  }

  ngOnInit(): void {
    this.orderEventService.connect();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.orderEventService.disconnect();
  }

  /**
   * Carga datos iniciales de órdenes desde el servidor.
   */
  private loadInitialData(): void {
    this.isLoading = true;
    this.error = null;

    // Simulación de carga inicial (en un caso real, se haría con una API REST)
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  /**
   * Maneja errores de conexión o procesamiento.
   * @param message Mensaje de error.
   */
  private handleError(message: string): void {
    this.error = message;
    this.isLoading = false;
  }

  /**
   * Obtiene el historial de eventos para una orden específica.
   * @param orderId ID de la orden.
   */
  viewOrderHistory(orderId: string): void {
    this.orderEventService.getOrderEvents(orderId).subscribe({
      next: (events) => {
        console.log('Order events:', events);
      },
      error: (err) => {
        this.handleError('Failed to load order history');
      },
    });
  }
}