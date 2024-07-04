import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { UnprocessableEntityException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Account } from 'src/modules/account/domain/entities/account.entity';
import { AccountFactory, AccountPropsFactory } from 'src/modules/account/domain/factories/account.factory';
import { IAccountRepository } from 'src/modules/account/persistence/repositories/account-repository.interface';
import { Ride } from '../../domain/entities/ride.entity';
import { RideFactory, RidePropsFactory } from '../../domain/factories/ride.factory';
import { IRideDAO, RideDaoDto } from '../../persistence/dao/ride-dao.interface';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';
import { AcceptRideUseCase } from './accept-ride.service';

const accountId = 'random-account-id';
const rideId = 'random-ride-id';
const accountProps = createMock<AccountPropsFactory>({
  email: 'jhondoe@email.com',
  cpf: '12345678909',
  isDriver: true,
  carPlate: 'ABC-1234',
});

describe('AcceptRideUseCase', () => {
  let sut: AcceptRideUseCase;
  let mockAccountRepository: jest.Mocked<IAccountRepository>;
  let mockRideRepository: jest.Mocked<IRideRepository>;
  let mockRideDao: jest.Mocked<IRideDAO>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AcceptRideUseCase).compile();

    sut = unit;
    mockAccountRepository = unitRef.get(TOKENS.IAccountRepository);
    mockRideRepository = unitRef.get(TOKENS.IRideRepository);
    mockRideDao = unitRef.get(TOKENS.IRideDAO);
  });

  it('should throw an error when accountId does not belong to a driver', async() => {
    // Arrange
    const account = AccountFactory.load({ ...accountProps, isDriver: false }, accountId);
    mockAccountRepository.findById.mockResolvedValue(account);

    // Act & Assert
    expect.assertions(2);
    return sut.execute(rideId, accountId).catch((error) => {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error.message).toBe('Somente motoristas podem aceitar corridas.');
    });
  });

  it('should throw an error when driver does not have a carPlate', async() => {
    // Arrange
    const account = AccountFactory.load({ ...accountProps, carPlate: null }, accountId);
    mockAccountRepository.findById.mockResolvedValue(account);

    // Act & Assert
    expect.assertions(2);
    return sut.execute(rideId, accountId).catch((error) => {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error.message).toBe('Somente motoristas podem aceitar corridas.');
    });
  });

  it('should throw an error when ride status is not requested', async() => {
    // Arrange
    const account = createMock<Account>({ isDriverRole: () => true });
    mockAccountRepository.findById.mockResolvedValue(account);

    const rideProps = createMock<RidePropsFactory>({ status: 'accepted' });
    const ride = RideFactory.load(rideProps, rideId);
    mockRideRepository.findById.mockResolvedValue(ride);

    // Act & Assert
    expect.assertions(2);
    return sut.execute(rideId, accountId).catch((error) => {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error.message).toBe('Corrida não está no status requested.');
    });
  });

  it('should throw an error if driver has another accepted or in progress ride', async() => {
    // Arrange
    const account = createMock<Account>({ isDriverRole: () => true });
    mockAccountRepository.findById.mockResolvedValue(account);

    const ride = createMock<Ride>({ canBeAccepted: () => true });
    mockRideRepository.findById.mockResolvedValue(ride);

    const driverInProgressRides = [createMock<RideDaoDto>()];
    mockRideDao.findBy.mockResolvedValue(driverInProgressRides);

    // Act & Assert
    expect.assertions(2);
    return sut.execute(rideId, accountId).catch((error) => {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error.message).toBe('Erro. Motorista já possui uma corrida em andamento.');
    });
  });

  it('should return a success message when ride is accepted', async() => {
    // Arrange
    const account = createMock<Account>({ isDriverRole: () => true, name: 'Jhon Doe' });
    mockAccountRepository.findById.mockResolvedValue(account);

    const ride = createMock<Ride>({ canBeAccepted: () => true });
    mockRideRepository.findById.mockResolvedValue(ride);

    const driverInProgressRides = [];
    mockRideDao.findBy.mockResolvedValue(driverInProgressRides);

    // Act
    const result = await sut.execute(rideId, accountId);

    // Assert
    expect(result).toEqual({ message: 'Corrida aceita pelo motorista Jhon Doe.' });
  });
});
