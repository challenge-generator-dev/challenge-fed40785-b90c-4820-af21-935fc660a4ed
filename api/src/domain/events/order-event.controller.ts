import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { Observable, interval, map } from 'rxjs';
import { OrderEventService } from '../../application/services/order-event.service';
import { OrderEvent } from './order-event';

@Controller('orders')
export class OrderEventController {
  constructor(private readonly orderEventService: OrderEventService) {}

  @Get('events')
  async streamEvents(@Res() res: Response): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const observable = this.orderEventService.subscribeToOrderEvents();

    const subscription = observable.subscribe({
      next: (event: OrderEvent) => {
        const sseData = `data: ${JSON.stringify(event)}\n\n`;
        res.write(sseData);
      },
      error: (err) => {
        console.error('Error en stream de eventos:', err);
        res.write(`event: error\ndata: ${JSON.stringify({ message: 'Error en la conexión' })}\n\n`);
      },
      complete: () => {
        res.write('event: close\ndata: \n\n');
        res.end();
      },
    });

    res.on('close', () => {
      subscription.unsubscribe();
      res.end();
    });
  }

  @Sse('events-sse')
  sse(): Observable<{ data: OrderEvent }> {
    return this.orderEventService.subscribeToOrderEvents().pipe(
      map((event) => ({ data: event })),
    );
  }
}