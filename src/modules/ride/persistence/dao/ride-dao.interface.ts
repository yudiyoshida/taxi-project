import { RideStatus } from '../../domain/entities/ride.entity';

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

export type RideDaoDto = {
  id: string;
  date: Date;
  fare: number | null;
  status: string;
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  passengerId: string;
  driverId: string | null;
  distance: number;
}
