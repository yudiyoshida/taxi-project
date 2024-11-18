import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { SuccessMessage } from 'src/shared/dtos/success-message/success-message.dto';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';

@Injectable()
export class FinishRideUseCase {
  constructor(
    @Inject(TOKENS.IRideRepository) private rideRepository: IRideRepository,
  ) {}

  public async execute(rideId: string): Promise<SuccessMessage> {
    const ride = await this.rideRepository.findById(rideId);
    ride.finish();

    await this.rideRepository.edit(ride);

    return { message: 'Corrida finalizada.' };
  }
}
