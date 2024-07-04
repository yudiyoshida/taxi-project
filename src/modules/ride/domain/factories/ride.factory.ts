import { Ride, RideStatus } from '../entities/ride.entity';

export type RidePropsFactory = {
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
      status: RideStatus.requested,
      date: new Date(),
    });
  }

  public static load(props: RidePropsFactory, id: string): Ride {
    return new Ride(props, id);
  }
}
