/**
 * Tipos definidos para el contrato entre cliente y servidor
 * para eventos y órdenes en tiempo real.
 */
export interface OrderEvent {
  id: string;
  orderId: string;
  status: OrderStatus;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export type OrderStatus = {
  value: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
};