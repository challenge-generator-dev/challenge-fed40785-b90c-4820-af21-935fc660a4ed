import { Observable } from 'rxjs';
import { OrderEvent } from '../events/order-event';

export interface OrderEventPort {
  publish(event: OrderEvent): Promise<void>;
  subscribe(): Observable<OrderEvent>;
}