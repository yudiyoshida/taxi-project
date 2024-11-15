import { Position } from 'src/modules/position/domain/entities/position.entity';

export class DistanceCalculator {
  static calculate(firstPosition: Position, secondPosition: Position): number {
    const earthRadius = 6371;
    const degreesToRadians = Math.PI / 180;
    const deltaLat = (firstPosition.lat - secondPosition.lat) * degreesToRadians;
    const deltaLon = (firstPosition.lng - secondPosition.lng) * degreesToRadians;
    const a =
			Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
			Math.cos(secondPosition.lat * degreesToRadians) *
			Math.cos(firstPosition.lat * degreesToRadians) *
			Math.sin(deltaLon / 2) *
			Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return Math.round(distance);
  }
}
