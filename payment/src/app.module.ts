import { Module } from '@nestjs/common';
import { RabbitMQModule } from './modules/infra/queue/rabbitmq.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    PaymentModule,
    RabbitMQModule,
  ],
})
export class AppModule {}
