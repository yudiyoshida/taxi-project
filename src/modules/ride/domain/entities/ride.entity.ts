import * as crypto from 'crypto';
import { RidePropsCreation } from '../factories/ride.factory';
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

export type RideStatus = 'requested' | 'accepted' | 'inProgress' | 'finished' | 'canceled';

export class Ride {
  private _props: RideProps;

  constructor(props: RidePropsCreation, uuid?: string) {
    const id = uuid ?? crypto.randomUUID();
    const from = new Coordinate(props.fromLat, props.fromLng);
    const to = new Coordinate(props.toLat, props.toLng);

    this._props = { ...props, id, from, to };
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
