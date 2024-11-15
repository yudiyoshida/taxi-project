import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { IAccountRepository } from 'src/modules/account/persistence/repositories/account-repository.interface';
import { SuccessMessage } from 'src/shared/dtos/success-message/success-message.dto';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';

@Injectable()
export class StartRideUseCase {
  constructor(
    @Inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
    @Inject(TOKENS.IRideRepository) private rideRepository: IRideRepository,
  ) {}

  // Aqui faltou verificar se é um motorista que está tentando iniciar a corrida,
  // mas, isso é algo que será verificado nos guards.
  public async execute(rideId: string): Promise<SuccessMessage> {
    const ride = await this.rideRepository.findById(rideId);
    ride.start();

    await this.rideRepository.edit(ride);

    return { message: 'Corrida iniciada.' };
  }
}
