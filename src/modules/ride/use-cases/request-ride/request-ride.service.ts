import { ConflictException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { IAccountRepository } from 'src/modules/account/persistence/repositories/account-repository.interface';
import { Errors } from 'src/shared/errors/error-message';
import { Ride } from '../../domain/entities/ride.entity';
import { IRideDAO } from '../../persistence/dao/ride-dao.interface';
import { RequestRideInputDto, RequestRideOutputDto } from './dtos/request-ride.dto';

@Injectable()
export class RequestRideUseCase {
  constructor(
    // TODO: a entidade ride pode acessar o repository de account?
    @Inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
    @Inject(TOKENS.IRideDAO) private rideDao: IRideDAO,
  ) {}

  public async execute(data: RequestRideInputDto): Promise<RequestRideOutputDto> {
    const account = await this.accountRepository.findById(data.passengerId);
    if (!account.isPassengerRole()) {
      throw new UnprocessableEntityException(Errors.ACCOUNT_NOT_PASSENGER_TYPE);
    }

    const passengerActiveRides = await this.rideDao.findBy({
      passengerId: data.passengerId,
      status: ['requested', 'accepted', 'inProgress'],
    });
    if (passengerActiveRides.length > 0) {
      throw new ConflictException(Errors.PASSENGER_ALREADY_HAS_ACTIVE_RIDE);
    }

    const ride = Ride.create(data.passengerId, data.fromLat, data.fromLng, data.toLat, data.toLng);
    // TODO: salvar entidade ride no banco de dados.

    return ride;
  }
}
