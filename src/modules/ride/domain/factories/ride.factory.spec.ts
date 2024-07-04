import { Ride } from '../entities/ride.entity';
import { RideFactory } from './ride.factory';

describe('RideFactory', () => {
  it('should create a ride with the provided passengerId, fromLat, fromLng, toLat and toLng', () => {
    // Arrange
    const passengerId = 'passengerId';
    const fromLat = 1;
    const fromLng = 2;
    const toLat = 3;
    const toLng = 4;

    // Act
    const ride = RideFactory.create(passengerId, fromLat, fromLng, toLat, toLng);

    // Assert
    expect(ride).toBeInstanceOf(Ride);
    expect(ride.passengerId).toBe(passengerId);
    expect(ride.from.lat).toBe(fromLat);
    expect(ride.from.lng).toBe(fromLng);
    expect(ride.to.lat).toBe(toLat);
    expect(ride.to.lng).toBe(toLng);
  });

  it('should create a ride with status requested, no driver and date as now', () => {
    jest.useFakeTimers().setSystemTime(new Date());

    // Arrange
    const passengerId = 'passengerId';
    const fromLat = 1;
    const fromLng = 2;
    const toLat = 3;
    const toLng = 4;

    // Act
    const ride = RideFactory.create(passengerId, fromLat, fromLng, toLat, toLng);

    // Assert
    expect(ride.status).toBe('requested');
    expect(ride.driverId).toBeNull();
    expect(ride.date).toEqual(new Date());

    jest.useRealTimers();
  });
});
