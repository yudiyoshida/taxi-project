import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { SuccessMessage } from 'src/shared/dtos/success-message/success-message.dto';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { IAccountGateway } from '../../gateway/account/account-gateway.interface';
import { IRideDAO } from '../../persistence/dao/ride-dao.interface';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';

@Injectable()
export class AcceptRideUseCase {
  constructor(
    @Inject(TOKENS.IAccountGateway) private accountGateway: IAccountGateway,
    @Inject(TOKENS.IRideRepository) private rideRepository: IRideRepository,
    @Inject(TOKENS.IRideDAO) private rideDao: IRideDAO,
  ) {}

  public async execute(rideId: string, accountId: string): Promise<SuccessMessage> {
    const driver = await this.accountGateway.findDriverById(accountId);

    const driverActiveRides = await this.rideDao.findBy({
      driverId: driver.id,
      status: [RideStatus.accepted, RideStatus.inProgress],
    });
    if (driverActiveRides.length > 0) {
      throw new UnprocessableEntityException(Errors.DRIVER_ALREADY_HAS_ACTIVE_RIDE);
    }

    const ride = await this.rideRepository.findById(rideId);
    ride.accept(driver.id);

    await this.rideRepository.edit(ride);

    return { message: `Corrida aceita pelo motorista ${driver.name}.` };
  }
}
