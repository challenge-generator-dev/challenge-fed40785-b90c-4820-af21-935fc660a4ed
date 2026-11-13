// TODO(reto): Implementar el adaptador para Kafka que:
// 1. Se conecte al broker de Kafka
// 2. Consuma eventos del topic de órdenes
// 3. Publique eventos en el topic de órdenes
// 4. Maneje errores de conexión y reconexiones

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';
import { Observable, Subject } from 'rxjs';
import { OrderEvent } from '../../domain/events/order-event';
import { OrderEventPort } from '../../domain/ports/order-event.port';

@Injectable()
export class KafkaOrderEventAdapter implements OrderEventPort, OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private readonly eventsSubject = new Subject<OrderEvent>();

  constructor() {
    this.kafka = new Kafka({
      clientId: 'order-service',
      brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'order-service-group' });
  }

  async onModuleInit() {
    await this.connect();
    await this.subscribeToTopic();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect(): Promise<void> {
    try {
      await this.producer.connect();
      await this.consumer.connect();
    } catch (error) {
      console.error('Failed to connect to Kafka:', error);
      throw error;
    }
  }

  private async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      await this.consumer.disconnect();
    } catch (error) {
      console.error('Failed to disconnect from Kafka:', error);
    }
  }

  private async subscribeToTopic(): Promise<void> {
    try {
      await this.consumer.subscribe({
        topic: 'orders',
        fromBeginning: true,
      });

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
          if (message.value) {
            const event = JSON.parse(message.value.toString()) as OrderEvent;
            this.eventsSubject.next(event);
          }
        },
      });
    } catch (error) {
      console.error('Failed to subscribe to Kafka topic:', error);
      throw error;
    }
  }

  async publish(event: OrderEvent): Promise<void> {
    try {
      await this.producer.send({
        topic: 'orders',
        messages: [{ value: JSON.stringify(event) }],
      });
    } catch (error) {
      console.error('Failed to publish event to Kafka:', error);
      throw error;
    }
  }

  subscribe(): Observable<OrderEvent> {
    return this.eventsSubject.asObservable();
  }
}