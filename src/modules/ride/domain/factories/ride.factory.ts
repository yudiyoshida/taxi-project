import { Ride, RideStatus } from '../entities/ride.entity';

export type RidePropsCreation = {
  passengerId: string;
  driverId: string | null;
  date: Date;
  fare: number | null;
  status: RideStatus;
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
}

export class RideFactory {
  public static create(passengerId: string, fromLat: number, fromLng: number, toLat: number, toLng: number): Ride {
    return new Ride({
      passengerId,
      fromLat,
      fromLng,
      toLat,
      toLng,
      driverId: null,
      fare: null,
      status: 'requested',
      date: new Date(),
    });
  }
}
