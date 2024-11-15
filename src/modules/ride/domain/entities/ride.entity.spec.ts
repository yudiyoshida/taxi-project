import { createMock } from '@golevelup/ts-jest';
import { Errors } from 'src/shared/errors/error-message';
import { RidePropsFactory } from '../factories/ride.factory';
import { Ride, RideStatus } from './ride.entity';

describe('Ride Entity', () => {
  describe('accept method', () => {
    it('should throw an error when ride status is not requested', () => {
      // Arrange
      const propsMock = createMock<RidePropsFactory>({ status: RideStatus.cancelled });
      const ride = new Ride(propsMock);

      // Act & Assert
      expect(() => ride.accept('random-driver-id')).toThrow(Errors.RIDE_NOT_IN_REQUESTED_STATUS);
    });

    it('should throw an error if ride already has a driver', () => {
    // Arrange
      const propsMock = createMock<RidePropsFactory>({ status: RideStatus.requested, driverId: 'random-driver-id' });
      const ride = new Ride(propsMock);

      // Act & Assert
      expect(() => ride.accept('random-driver-id')).toThrow(Errors.RIDE_ALREADY_HAS_DRIVER);
    });

    it('should change ride status to accepted and set driver id', () => {
    // Arrange
      const driverId = 'random-driver-id';
      const propsMock = createMock<RidePropsFactory>({ status: RideStatus.requested });
      const ride = new Ride(propsMock);

      // Act
      ride.accept(driverId);

      // Assert
      expect(ride.status).toBe(RideStatus.accepted);
      expect(ride.driverId).toBe(driverId);
    });
  });
});
