// TODO(reto): Implementar la lógica para manejar eventos de órdenes.
// Este servicio debe:
// 1. Consumir eventos del adaptador de Kafka
// 2. Procesar los eventos y actualizar el estado de las órdenes
// 3. Publicar eventos actualizados cuando sea necesario
// 4. Manejar errores y reconexiones

import { Injectable, Inject } from '@nestjs/common';
import { Observable, catchError, mergeMap } from 'rxjs';
import { OrderEvent, OrderEventFactory } from '../../domain/events/order-event';
import { OrderEventPort } from '../../domain/ports/order-event.port';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class OrderEventService {
  constructor(@Inject('OrderEventPort') private readonly orderEventPort: OrderEventPort) {}

  subscribeToOrderEvents(): Observable<OrderEvent> {
    return this.orderEventPort.subscribe().pipe(
      catchError((error) => {
        console.error('Error consuming order events:', error);
        throw error;
      }),
    );
  }

  async processOrderEvent(orderEvent: OrderEvent): Promise<OrderEvent> {
    // TODO(reto): Implementar lógica de procesamiento
    // 1. Validar el evento
    // 2. Actualizar el estado de la orden correspondiente
    // 3. Publicar evento actualizado si es necesario
    // 4. Manejar transiciones de estado válidas

    return OrderEventFactory.create(
      orderEvent.orderId,
      orderEvent.status,
      orderEvent.metadata,
    );
  }
}