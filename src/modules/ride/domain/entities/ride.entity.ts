import { UnprocessableEntityException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Position } from 'src/modules/position/domain/entities/position.entity';
import { Errors } from 'src/shared/errors/error-message';
import { DistanceCalculator } from '../domain-services/distance-calculator';
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
  distance: number;
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
  public get from() { return this._props.from; }
  public get to() { return this._props.to; }
  public get distance() { return this._props.distance; }

  constructor(props: RidePropsFactory, uuid?: string) {
    const id = uuid ?? crypto.randomUUID();
    const from = new Coordinate(props.fromLat, props.fromLng);
    const to = new Coordinate(props.toLat, props.toLng);

    // TODO: transformar status em VO?
    this._props = { ...props, id, from, to };
  }

  public accept(driverId: string): void {
    if (this._props.status !== RideStatus.requested) {
      throw new UnprocessableEntityException(Errors.RIDE_NOT_IN_REQUESTED_STATUS);
    }

    if (this._props.driverId) {
      throw new UnprocessableEntityException(Errors.RIDE_ALREADY_HAS_DRIVER);
    }

    this._props.driverId = driverId;
    this._props.status = RideStatus.accepted;
  }

  public start(): void {
    if (this._props.status !== RideStatus.accepted) {
      throw new UnprocessableEntityException(Errors.RIDE_NOT_IN_ACCEPTED_STATUS);
    }
    this._props.status = RideStatus.inProgress;
  }

  public finish(): void {
    if (this._props.status !== RideStatus.inProgress) {
      throw new UnprocessableEntityException(Errors.RIDE_NOT_IN_IN_PROGRESS_STATUS);
    }
    this._props.status = RideStatus.finished;
  }

  public isInProgress(): boolean {
    return this._props.status === RideStatus.inProgress;
  }

  public updateDistance(firstPosition: Position, secondPosition: Position): void {
    const distance = DistanceCalculator.calculate(firstPosition, secondPosition);
    this._props.distance += distance;
  }
}
