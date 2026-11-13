import { OrderEvent, OrderStatus } from './types/contract.types';

/**
 * Modelo de datos para representar una orden en el sistema.
 * Incluye lógica para manejar eventos y actualizar su estado.
 */
export class Order {
  private _id: string;
  private _status: OrderStatus;
  private _timestamp: Date;
  private _metadata: Record<string, unknown>;
  private _events: OrderEvent[] = [];

  constructor(
    id: string,
    status: OrderStatus,
    timestamp: string,
    metadata?: Record<string, unknown>
  ) {
    if (!id || !status || !timestamp) {
      throw new Error('Order requires id, status, and timestamp');
    }

    this._id = id;
    this._status = status;
    this._timestamp = new Date(timestamp);
    this._metadata = metadata || {};
  }

  get id(): string {
    return this._id;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get metadata(): Record<string, unknown> {
    return this._metadata;
  }

  get events(): OrderEvent[] {
    return [...this._events];
  }

  /**
   * Actualiza el estado de la orden basado en un nuevo evento.
   * @param event Evento recibido desde el servidor.
   */
  updateFromEvent(event: OrderEvent): void {
    if (event.orderId !== this._id) {
      throw new Error('Event does not belong to this order');
    }

    this._status = event.status;
    this._timestamp = new Date(event.timestamp);
    if (event.metadata) {
      this._metadata = { ...this._metadata, ...event.metadata };
    }
    this._events.push(event);
  }

  /**
   * Convierte la orden a un formato compatible con el contrato.
   * @returns Objeto plano con los datos de la orden.
   */
  toContract(): Omit<OrderEvent, 'id'> {
    return {
      orderId: this._id,
      status: this._status,
      timestamp: this._timestamp.toISOString(),
      metadata: this._metadata,
    };
  }
}