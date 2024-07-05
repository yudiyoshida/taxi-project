import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { IAccountRepository } from 'src/modules/account/persistence/repositories/account-repository.interface';
import { SuccessMessage } from 'src/shared/dtos/success-message/success-message.dto';
import { Errors } from 'src/shared/errors/error-message';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';

@Injectable()
export class StartRideUseCase {
  constructor(
    @Inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
    @Inject(TOKENS.IRideRepository) private rideRepository: IRideRepository,
  ) {}

  public async execute(rideId: string, accountId: string): Promise<SuccessMessage> {
    const account = await this.accountRepository.findById(accountId);
    if (!account.isDriverRole()) {
      throw new UnprocessableEntityException(Errors.ACCOUNT_NOT_DRIVE_TYPE);
    }

    const ride = await this.rideRepository.findById(rideId);
    ride.start();

    await this.rideRepository.edit(ride);

    return { message: 'Corrida iniciada.' };
  }
}
