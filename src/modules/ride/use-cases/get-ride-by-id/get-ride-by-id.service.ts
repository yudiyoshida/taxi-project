import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { IRideDAO, RideDaoDto } from '../../persistence/dao/ride-dao.interface';

@Injectable()
export class GetRideByIdUseCase {
  constructor(
    @Inject(TOKENS.IRideDAO) private rideDao: IRideDAO
  ) {}

  public async execute(id: string): Promise<RideDaoDto> {
    const ride = await this.rideDao.findById(id);

    if (!ride) {
      throw new NotFoundException(Errors.RIDE_NOT_FOUND);
    }
    return ride;
  }
}
