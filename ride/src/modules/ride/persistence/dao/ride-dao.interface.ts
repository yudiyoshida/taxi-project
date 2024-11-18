import { RideStatus } from '../../domain/entities/ride.entity';
import { RideDaoDto } from './ride-dao.dto';

export interface IRideDAO {
  findBy(fields: RideDaoWhereInput): Promise<RideDaoDto[]>;
  findById(id: string): Promise<RideDaoDto|null>;
}

export type RideDaoWhereInput = {
  date?: Date;
  driverId?: string;
  passengerId?: string;
  status?: RideStatus[];
}
