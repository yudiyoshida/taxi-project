import { UnprocessableEntityException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Errors } from 'src/shared/errors/error-message';
import { RidePropsFactory } from '../factories/ride.factory';
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

export enum RideStatus {
  requested = 'requested',
  accepted = 'accepted',
  inProgress = 'inProgress',
  finished = 'finished',
  cancelled = 'cancelled',
}

export class Ride {
  private readonly _props: RideProps;

  public get id() { return this._props.id; }
  public get passengerId() { return this._props.passengerId; }
  public get driverId() { return this._props.driverId; }
  public get date() { return this._props.date; }
  public get fare() { return this._props.fare; }
  public get status() { return this._props.status; }
  public get from() { return this._props.from.value; }
  public get to() { return this._props.to.value; }

  constructor(props: RidePropsFactory, uuid?: string) {
    const id = uuid ?? crypto.randomUUID();
    const from = new Coordinate(props.fromLat, props.fromLng);
    const to = new Coordinate(props.toLat, props.toLng);

    // TODO: transformar status em VO?
    this._props = { ...props, id, from, to };
  }

  public canBeAccepted(): boolean {
    return this._props.status === RideStatus.requested;
  }

  public accept(driverId: string): void {
    if (this._props.status !== RideStatus.requested) {
      throw new UnprocessableEntityException(Errors.RIDE_NOT_IN_REQUESTED_STATUS);
    }
    this._props.driverId = driverId;
    this._props.status = RideStatus.accepted;
  }
}
