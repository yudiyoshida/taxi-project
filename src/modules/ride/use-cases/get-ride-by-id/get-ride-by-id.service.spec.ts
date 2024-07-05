import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { IRideDAO, RideDaoDto } from '../../persistence/dao/ride-dao.interface';
import { GetRideByIdUseCase } from './get-ride-by-id.service';

describe('GetRideByIdService', () => {
  let sut: GetRideByIdUseCase;
  let mockRideDao: jest.Mocked<IRideDAO>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(GetRideByIdUseCase).compile();

    sut = unit;
    mockRideDao = unitRef.get(TOKENS.IRideDAO);
  });

  it('should throw an error if ride is not found', async() => {
    // Arrange
    const id = 'ride-id';
    mockRideDao.findById.mockResolvedValue(null);

    // Act & Assert
    expect.assertions(2);
    return sut.execute(id).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(Errors.RIDE_NOT_FOUND);
    });
  });

  it('should return a ride', async() => {
    // Arrange
    const id = 'ride-id';
    const ride = createMock<RideDaoDto>();
    mockRideDao.findById.mockResolvedValue(ride);

    // Act
    const result = await sut.execute(id);

    // Assert
    expect(result).toEqual(ride);
  });
});
