import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { TOKENS } from 'src/infra/ioc/token';
import { Ride } from '../../domain/entities/ride.entity';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';
import { StartRideUseCase } from './start-ride.service';

describe('StartRideUseCase', () => {
  let sut: StartRideUseCase;
  let mockRideRepository: jest.Mocked<IRideRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(StartRideUseCase).compile();

    sut = unit;
    mockRideRepository = unitRef.get(TOKENS.IRideRepository);
  });

  it('should start the ride and return a success message', async() => {
    // Arrange
    const ride = createMock<Ride>();
    mockRideRepository.findById.mockResolvedValue(ride);

    // Act
    const result = await sut.execute('rideId');

    // Assert
    expect(result).toEqual({ message: 'Corrida iniciada.' });
    expect(ride.start).toHaveBeenCalled();
    expect(mockRideRepository.edit).toHaveBeenCalledWith(ride);
  });
});
