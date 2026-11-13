export interface OrderStatus {
  value: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface OrderEvent {
  id: string;
  orderId: string;
  status: OrderStatus;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export class OrderEventFactory {
  static create(orderId: string, status: OrderStatus, metadata?: Record<string, unknown>): OrderEvent {
    return {
      id: this.generateId(),
      orderId,
      status,
      timestamp: new Date().toISOString(),
      metadata,
    };
  }

  private static generateId(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }
}