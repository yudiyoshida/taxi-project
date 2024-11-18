import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { UnprocessableEntityException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { RideFactory, RidePropsFactory } from '../../domain/factories/ride.factory';
import { FindByIdResponse, IAccountGateway } from '../../gateway/account/account-gateway.interface';
import { RideDaoDto } from '../../persistence/dao/ride-dao.dto';
import { IRideDAO } from '../../persistence/dao/ride-dao.interface';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';
import { AcceptRideUseCase } from './accept-ride.service';

describe('AcceptRideUseCase', () => {
  let sut: AcceptRideUseCase;
  let mockAccountGateway: jest.Mocked<IAccountGateway>;
  let mockRideRepository: jest.Mocked<IRideRepository>;
  let mockRideDao: jest.Mocked<IRideDAO>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AcceptRideUseCase).compile();

    sut = unit;
    mockAccountGateway = unitRef.get(TOKENS.IAccountGateway);
    mockRideRepository = unitRef.get(TOKENS.IRideRepository);
    mockRideDao = unitRef.get(TOKENS.IRideDAO);
  });

  it('should throw an error if driver has another accepted or in progress ride', async() => {
    // Arrange
    mockAccountGateway.findDriverById.mockResolvedValue(createMock<any>());

    const driverInProgressRides = [createMock<RideDaoDto>()];
    mockRideDao.findBy.mockResolvedValue(driverInProgressRides);

    // Act & Assert
    expect.assertions(2);
    return sut.execute('rideId', 'accountId').catch((error) => {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error.message).toBe(Errors.DRIVER_ALREADY_HAS_ACTIVE_RIDE);
    });
  });

  it('should return a success message when ride is accepted', async() => {
    // Arrange
    const driverName = 'Jhon Doe';
    const driver = createMock<FindByIdResponse>({ name: driverName });
    mockAccountGateway.findDriverById.mockResolvedValue(driver);

    const driverInProgressRides = [];
    mockRideDao.findBy.mockResolvedValue(driverInProgressRides);

    const rideProps = createMock<RidePropsFactory>({ status: RideStatus.requested });
    const ride = RideFactory.load(rideProps, 'rideId');
    mockRideRepository.findById.mockResolvedValue(ride);

    // Act
    const result = await sut.execute('rideId', 'accountId');

    // Assert
    expect(result).toEqual({ message: `Corrida aceita pelo motorista ${driverName}.` });
  });
});
