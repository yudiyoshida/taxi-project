import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { RideFactory } from '../../domain/factories/ride.factory';
import { IAccountGateway } from '../../gateway/account/account-gateway.interface';
import { IRideDAO } from '../../persistence/dao/ride-dao.interface';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';
import { RequestRideInputDto, RequestRideOutputDto } from './dtos/request-ride.dto';

@Injectable()
export class RequestRideUseCase {
  constructor(
    @Inject(TOKENS.IAccountGateway) private accountGateway: IAccountGateway,
    @Inject(TOKENS.IRideDAO) private rideDao: IRideDAO,
    @Inject(TOKENS.IRideRepository) private rideRepository: IRideRepository,
  ) {}

  public async execute(data: RequestRideInputDto): Promise<RequestRideOutputDto> {
    const passenger = await this.accountGateway.findPassengerById(data.passengerId);

    const passengerActiveRides = await this.rideDao.findBy({
      passengerId: passenger.id,
      status: [RideStatus.requested, RideStatus.accepted, RideStatus.inProgress],
    });
    if (passengerActiveRides.length > 0) {
      throw new ConflictException(Errors.PASSENGER_ALREADY_HAS_ACTIVE_RIDE);
    }

    const ride = RideFactory.create(
      data.passengerId,
      data.fromLat,
      data.fromLng,
      data.toLat,
      data.toLng
    );
    await this.rideRepository.save(ride);

    return { id: ride.id };
  }
}
