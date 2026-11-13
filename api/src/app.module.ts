import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderEventController } from './domain/events/order-event.controller';
import { OrderEventService } from './application/services/order-event.service';
import { KafkaOrderEventAdapter } from './infrastructure/messaging/kafka-order-event.adapter';
import { OrderEventRepository } from './infrastructure/repositories/order-event.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OrderEventController],
  providers: [
    {
      provide: 'OrderEventPort',
      useClass: KafkaOrderEventAdapter,
    },
    OrderEventService,
    OrderEventRepository,
  ],
  exports: [OrderEventService, OrderEventRepository],
})
export class AppModule {}