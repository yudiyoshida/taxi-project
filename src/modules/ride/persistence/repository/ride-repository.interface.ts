import { Ride } from '../../domain/entities/ride.entity';

export interface IRideRepository {
  save(ride: Ride): Promise<void>;
}
