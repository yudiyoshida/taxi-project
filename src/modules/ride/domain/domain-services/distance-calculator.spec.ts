import { Coordinate } from '../value-objects/coordinate/coordinate.vo';
import { DistanceCalculator } from './distance-calculator';

describe('DistanceCalculator', () => {
  describe('calculate', () => {
    it('should return the distance between two coordinates', () => {
      // Arrange
      const firstCoordinate = new Coordinate(-27.584905257808835, -48.545022195325124);
      const secondCoordinate = new Coordinate(-27.496887588317275, -48.522234807851476);

      // Act
      const result = DistanceCalculator.calculate(firstCoordinate, secondCoordinate);

      // Assert
      expect(result).toBe(10);
    });
  });
});
