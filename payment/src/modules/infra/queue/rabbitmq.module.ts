import { Module } from '@nestjs/common';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { ProcessPaymentUseCase } from 'src/modules/payment/use-cases/process-payment/process-payment.service';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [PaymentModule],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  constructor(
    private rabbitmq: RabbitMQService,
    private processPaymentUseCase: ProcessPaymentUseCase,
  ) {
    this.subscribeToQueues();
  }

  public async subscribeToQueues(): Promise<void> {
    await this.rabbitmq.consume('ride-finished', async(message: any) => {
      await this.processPaymentUseCase.execute(message.content.toString());
    });
  }
}
