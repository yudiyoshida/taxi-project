import { Coordinate } from 'src/modules/ride/domain/value-objects/coordinate/coordinate.vo';

type PositionProps = {
  id?: string;
  rideId: string;
  lat: number;
  lng: number;
  date: Date;
}

// Aqui não usei _props igual as outras entidades, por motivos de estudos de novas opções.
export class Position {
  private _id: string;
  private _rideId: string;
  private _date: Date;
  private _coordinate: Coordinate;

  public get id() { return this._id; }
  public get rideId() { return this._rideId; }
  public get date() { return this._date; }
  public get lat() { return this._coordinate.lat; }
  public get lng() { return this._coordinate.lng; }

  constructor(props: PositionProps) {
    this._id = props?.id ?? crypto.randomUUID();
    this._rideId = props.rideId;
    this._date = props.date;
    this._coordinate = new Coordinate(props.lat, props.lng);
  }
}
