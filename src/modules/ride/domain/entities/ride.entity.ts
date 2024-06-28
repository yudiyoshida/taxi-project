import * as crypto from 'crypto';
import { Coordinate } from '../value-objects/coordinate/coordinate.vo';

type RideProps = {
  id: string;
  passengerId: string;
  driverId: string | null;
  date: Date;
  fare: number | null;
  status: RideStatus;
  from: Coordinate;
  to: Coordinate;
}

type RidePropsCreation = {
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

export type RideStatus = 'requested' | 'accepted' | 'inProgress' | 'finished' | 'canceled';

export class Ride {
  private _props: RideProps;

  private constructor(props: RidePropsCreation, uuid?: string) {
    const id = uuid ?? crypto.randomUUID();
    const from = new Coordinate(props.fromLat, props.fromLng);
    const to = new Coordinate(props.toLat, props.toLng);

    this._props = {
      id,
      passengerId: props.passengerId,
      driverId: props.driverId,
      date: props.date,
      fare: props.fare,
      status: props.status,
      from,
      to,
    };
  }

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

  public get id(): string {
    return this._props.id;
  }
  public get passengerId(): string {
    return this._props.passengerId;
  }
  public get driverId(): string | null {
    return this._props.driverId;
  }
  public get date(): Date {
    return this._props.date;
  }
  public get fare(): number | null {
    return this._props.fare;
  }
  public get status(): string {
    return this._props.status;
  }
  public get from() {
    return this._props.from.value;
  }
  public get to() {
    return this._props.to.value;
  }
}
