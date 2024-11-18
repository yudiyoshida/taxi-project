import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Position } from 'src/modules/position/domain/entities/position.entity';
import { IPositionRepository } from 'src/modules/position/persistence/repository/position-repository.interface';
import { Errors } from 'src/shared/errors/error-message';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';
import { UpdatePositionInputDto, UpdatePositionOutputDto } from './dtos/update-position.dto';

@Injectable()
export class UpdatePositionUseCase {
  constructor(
    @Inject(TOKENS.IRideRepository) private rideRepository: IRideRepository,
    @Inject(TOKENS.IPositionRepository) private positionRepository: IPositionRepository,
  ) {}

  public async execute(data: UpdatePositionInputDto): Promise<UpdatePositionOutputDto> {
    const ride = await this.rideRepository.findById(data.rideId);
    if (!ride.isInProgress()) {
      throw new BadRequestException(Errors.RIDE_NOT_IN_PROGRESS);
    }

    const lastPosition = await this.positionRepository.findLastPositionByRideId(data.rideId);

    const newPosition = new Position({ ...data, date: new Date() });
    await this.positionRepository.save(newPosition);

    if (lastPosition) {
      ride.updateDistance(lastPosition, newPosition);
      await this.rideRepository.edit(ride);
    }

    return { id: newPosition.id };
  }
}
