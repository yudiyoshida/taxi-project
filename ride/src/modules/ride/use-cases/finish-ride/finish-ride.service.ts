import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { RabbitMQService } from 'src/infra/queue/rabbitmq.service';
import { SuccessMessage } from 'src/shared/dtos/success-message/success-message.dto';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';

@Injectable()
export class FinishRideUseCase {
  constructor(
    @Inject(TOKENS.IRideRepository) private rideRepository: IRideRepository,
    private rabbitmqService: RabbitMQService,
  ) {}

  public async execute(rideId: string): Promise<SuccessMessage> {
    const ride = await this.rideRepository.findById(rideId);
    ride.finish();

    await this.rideRepository.edit(ride);

    await this.rabbitmqService.sendToQueue('ride-finished', { fare: ride.fare });

    return { message: 'Corrida finalizada.' };
  }
}
