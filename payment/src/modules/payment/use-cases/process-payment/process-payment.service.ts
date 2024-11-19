import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessPaymentUseCase {
  public async execute(data: any): Promise<void> {
    console.log('Processing payment...');
    console.log(data);
  }
}
