import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { ConflictException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { FindByIdResponse, IAccountGateway } from '../../gateway/account/account-gateway.interface';
import { RideDaoDto } from '../../persistence/dao/ride-dao.dto';
import { IRideDAO } from '../../persistence/dao/ride-dao.interface';
import { RequestRideInputDto } from './dtos/request-ride.dto';
import { RequestRideUseCase } from './request-ride.service';

describe('RequestRideUseCase', () => {
  let sut: RequestRideUseCase;
  let mockAccountGateway: jest.Mocked<IAccountGateway>;
  let mockRideDao: jest.Mocked<IRideDAO>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(RequestRideUseCase).compile();

    sut = unit;
    mockAccountGateway = unitRef.get(TOKENS.IAccountGateway);
    mockRideDao = unitRef.get(TOKENS.IRideDAO);
  });

  it('should throw an error when the passenger already has an active ride', async() => {
    // Arrange
    const account = createMock<FindByIdResponse>();
    const data = createMock<RequestRideInputDto>();
    mockAccountGateway.findPassengerById.mockResolvedValue(account);

    const rides = [createMock<RideDaoDto>()];
    mockRideDao.findBy.mockResolvedValue(rides);

    // Act & Assert
    expect.assertions(2);
    return sut.execute(data).catch((error) => {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe(Errors.PASSENGER_ALREADY_HAS_ACTIVE_RIDE);
    });
  });

  it('should return the id of the requested ride', async() => {
    // Arrange
    const account = createMock<FindByIdResponse>();
    const data = createMock<RequestRideInputDto>();
    mockAccountGateway.findPassengerById.mockResolvedValue(account);

    const rides = [];
    mockRideDao.findBy.mockResolvedValue(rides);

    // Act
    const result = await sut.execute(data);

    // Assert
    expect(result).toEqual({ id: expect.any(String) });
  });
});
