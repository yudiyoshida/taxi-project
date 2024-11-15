import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { TOKENS } from 'src/infra/ioc/token';
import { Ride } from '../../domain/entities/ride.entity';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';
import { FinishRideUseCase } from './finish-ride.service';

describe('FinishRideUseCase', () => {
  let sut: FinishRideUseCase;
  let mockRideRepository: jest.Mocked<IRideRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FinishRideUseCase).compile();

    sut = unit;
    mockRideRepository = unitRef.get(TOKENS.IRideRepository);
  });

  it('should finish the ride and return a success message', async() => {
    // Arrange
    const ride = createMock<Ride>();
    mockRideRepository.findById.mockResolvedValue(ride);

    // Act
    const result = await sut.execute('rideId');

    // Assert
    expect(result).toEqual({ message: 'Corrida finalizada.' });
    expect(ride.finish).toHaveBeenCalled();
    expect(mockRideRepository.edit).toHaveBeenCalledWith(ride);
  });
});
