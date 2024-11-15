import { Position } from 'src/modules/position/domain/entities/position.entity';
import { DistanceCalculator } from './distance-calculator';

describe('DistanceCalculator', () => {
  it('should return the distance between two coordinates', () => {
    // Arrange
    const firstPosition = new Position({ rideId: '', date: new Date(), lat: -27.584905257808835, lng: -48.545022195325124 });
    const secondPosition = new Position({ rideId: '', date: new Date(), lat: -27.496887588317275, lng: -48.522234807851476 });

    // Act
    const result = DistanceCalculator.calculate(firstPosition, secondPosition);

    // Assert
    expect(result).toBe(10);
  });
});
