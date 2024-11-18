import { Position } from '../../domain/entities/position.entity';

export interface IPositionRepository {
  findLastPositionByRideId(rideId: string): Promise<Position|null>;
  findById(id: string): Promise<Position>;
  save(position: Position): Promise<void>;
}
