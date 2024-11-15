import { Ride, RideStatus } from '../entities/ride.entity';
import { RideFactory, RidePropsFactory } from './ride.factory';

describe('Create static method', () => {
  it('should create a ride with provided passengerId, fromLat, fromLng, toLat and toLng', () => {
    // Arrange
    const passengerId = 'passengerId';
    const fromLat = 32.7885486;
    const fromLng = 130.7330224;
    const toLat = -23.5650274;
    const toLng = -46.739807;

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
    expect(ride.status).toBe(RideStatus.requested);
    expect(ride.driverId).toBeNull();
    expect(ride.date).toEqual(new Date());

    jest.useRealTimers();
  });
});

describe('Load static method', () => {
  it('should load the ride with correct arguments', () => {
    jest.useFakeTimers().setSystemTime(new Date());

    // Arrange
    const rideId = 'id';
    const data: RidePropsFactory = {
      passengerId: 'passengerId',
      driverId: 'driverId',
      date: new Date(),
      fare: 100,
      status: RideStatus.accepted,
      fromLat: 1,
      fromLng: 2,
      toLat: 3,
      toLng: 4,
    };

    // Act
    const ride = RideFactory.load(data, rideId);

    // Assert
    expect(ride).toBeInstanceOf(Ride);
    expect(ride.id).toBe(rideId);
    expect(ride.passengerId).toBe(data.passengerId);
    expect(ride.driverId).toBe(data.driverId);
    expect(ride.date).toBe(data.date);
    expect(ride.fare).toBe(data.fare);
    expect(ride.status).toBe(data.status);
    expect(ride.from.lat).toBe(data.fromLat);
    expect(ride.from.lng).toBe(data.fromLng);
    expect(ride.to.lat).toBe(data.toLat);
    expect(ride.to.lng).toBe(data.toLng);

    jest.useRealTimers();
  });
});
