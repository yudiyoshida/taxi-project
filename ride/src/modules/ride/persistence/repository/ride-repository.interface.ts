import { Ride } from '../../domain/entities/ride.entity';

export interface IRideRepository {
  findById(id: string): Promise<Ride>;
  save(ride: Ride): Promise<void>;
  edit(ride: Ride): Promise<void>;
}
