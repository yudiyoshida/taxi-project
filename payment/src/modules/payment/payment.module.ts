import { Module } from '@nestjs/common';
import { ProcessPaymentUseCase } from './use-cases/process-payment/process-payment.service';

@Module({
  providers: [ProcessPaymentUseCase],
})
export class PaymentModule {}
