import { RideStatus } from '../../domain/entities/ride.entity';

export interface IRideDAO {
  findBy(fields: RideWhereInput): Promise<RideDaoDto[]>;
}

export type RideWhereInput = {
  passengerId?: string;
  driverId?: string;
  date?: Date;
  status?: RideStatus[];
}

export type RideDaoDto = {
  id: string;
  passengerId: string;
  driverId: string | null;
  date: Date;
  fare: number | null;
  status: string;
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
}
