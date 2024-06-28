import { BadRequestException } from '@nestjs/common';

type CoordinateValue = {
  lat: number;
  lng: number;
};

export class Coordinate {
  private _lat: number;
  private _lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  private set lat(lat: number) {
    if (lat < -90 || lat > 90) {
      throw new BadRequestException('Latitude inválida');
    }
    this._lat = lat;
  }

  private set lng(lng: number) {
    if (lng < -180 || lng > 180) {
      throw new BadRequestException('Longitude inválida');
    }
    this._lng = lng;
  }

  public get value(): CoordinateValue {
    return { lat: this._lat, lng: this._lng };
  }
}
