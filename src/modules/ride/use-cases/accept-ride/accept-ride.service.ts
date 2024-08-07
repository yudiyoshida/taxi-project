import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { IAccountRepository } from 'src/modules/account/persistence/repositories/account-repository.interface';
import { SuccessMessage } from 'src/shared/dtos/success-message/success-message.dto';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { IRideDAO } from '../../persistence/dao/ride-dao.interface';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';

@Injectable()
export class AcceptRideUseCase {
  constructor(
    @Inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
    @Inject(TOKENS.IRideRepository) private rideRepository: IRideRepository,
    @Inject(TOKENS.IRideDAO) private rideDao: IRideDAO,
  ) {}

  public async execute(rideId: string, accountId: string): Promise<SuccessMessage> {
    const account = await this.accountRepository.findById(accountId);
    if (!account.isDriverRole()) {
      throw new UnprocessableEntityException(Errors.ACCOUNT_NOT_DRIVE_TYPE);
    }

    // TODO: refactor to a domain service?
    const driverActiveRides = await this.rideDao.findBy({
      driverId: account.id,
      status: [RideStatus.accepted, RideStatus.inProgress],
    });
    if (driverActiveRides.length > 0) {
      throw new UnprocessableEntityException(Errors.DRIVER_ALREADY_HAS_ACTIVE_RIDE);
    }

    const ride = await this.rideRepository.findById(rideId);
    ride.accept(account.id);

    await this.rideRepository.edit(ride);

    return { message: `Corrida aceita pelo motorista ${account.name}.` };
  }
}
