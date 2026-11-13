import { Injectable } from '@nestjs/common';
import { OrderEvent } from '../../domain/events/order-event';

@Injectable()
export class OrderEventRepository {
  private readonly events: OrderEvent[] = [];

  async save(event: OrderEvent): Promise<void> {
    this.events.push(event);
    // In a real implementation, this would persist to a database
  }

  async findByOrderId(orderId: string): Promise<OrderEvent[]> {
    return this.events.filter(event => event.orderId === orderId);
  }

  async findAll(): Promise<OrderEvent[]> {
    return [...this.events];
  }

  async findLatestByOrderId(orderId: string): Promise<OrderEvent | null> {
    const orderEvents = await this.findByOrderId(orderId);
    if (orderEvents.length === 0) {
      return null;
    }
    return orderEvents.reduce((latest, current) =>
      new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
    );
  }
}