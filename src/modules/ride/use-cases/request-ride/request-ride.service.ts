import { ConflictException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { IAccountRepository } from 'src/modules/account/persistence/repositories/account-repository.interface';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { RideFactory } from '../../domain/factories/ride.factory';
import { IRideDAO } from '../../persistence/dao/ride-dao.interface';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';
import { RequestRideInputDto, RequestRideOutputDto } from './dtos/request-ride.dto';

@Injectable()
export class RequestRideUseCase {
  constructor(
    @Inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
    @Inject(TOKENS.IRideDAO) private rideDao: IRideDAO,
    @Inject(TOKENS.IRideRepository) private rideRepository: IRideRepository,
  ) {}

  public async execute(data: RequestRideInputDto): Promise<RequestRideOutputDto> {
    const account = await this.accountRepository.findById(data.passengerId);
    if (!account.isPassengerRole()) {
      throw new UnprocessableEntityException(Errors.ACCOUNT_NOT_PASSENGER_TYPE);
    }

    const passengerActiveRides = await this.rideDao.findBy({
      passengerId: account.id,
      status: [RideStatus.requested, RideStatus.accepted, RideStatus.inProgress],
    });
    if (passengerActiveRides.length > 0) {
      throw new ConflictException(Errors.PASSENGER_ALREADY_HAS_ACTIVE_RIDE);
    }

    const ride = RideFactory.create(data.passengerId, data.fromLat, data.fromLng, data.toLat, data.toLng);
    await this.rideRepository.save(ride);

    return { id: ride.id };
  }
}
