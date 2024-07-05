import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { UnprocessableEntityException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { AccountFactory, AccountPropsFactory } from 'src/modules/account/domain/factories/account.factory';
import { IAccountRepository } from 'src/modules/account/persistence/repositories/account-repository.interface';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { RideFactory, RidePropsFactory } from '../../domain/factories/ride.factory';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';
import { StartRideUseCase } from './start-ride.service';

const accountData = createMock<AccountPropsFactory>({
  email: 'jhondoe@email.com',
  cpf: '12345678909',
  carPlate: 'ABC1234',
});

describe('StartRideUseCase', () => {
  let sut: StartRideUseCase;
  let mockAccountRepository: jest.Mocked<IAccountRepository>;
  let mockRideRepository: jest.Mocked<IRideRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(StartRideUseCase).compile();

    sut = unit;
    mockAccountRepository = unitRef.get(TOKENS.IAccountRepository);
    mockRideRepository = unitRef.get(TOKENS.IRideRepository);
  });

  it('should throw an error if accountId does not belong to a drive', async() => {
    // Arrange
    const accountProps = createMock<AccountPropsFactory>({ ...accountData, isDriver: false });
    const account = AccountFactory.create(accountProps);
    mockAccountRepository.findById.mockResolvedValue(account);

    // Act & Assert
    expect.assertions(2);
    return sut.execute('rideId', 'accountId').catch((error) => {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error.message).toBe(Errors.ACCOUNT_NOT_DRIVE_TYPE);
    });
  });

  it('should throw an error if ride status is not accepted', async() => {
    // Arrange
    const accountProps = createMock<AccountPropsFactory>({ ...accountData, isDriver: true });
    const account = AccountFactory.create(accountProps);
    mockAccountRepository.findById.mockResolvedValue(account);

    const rideProps = createMock<RidePropsFactory>({ status: RideStatus.requested });
    const ride = RideFactory.load(rideProps, 'rideId');
    mockRideRepository.findById.mockResolvedValue(ride);

    // Act & Assert
    expect.assertions(2);
    return sut.execute('rideId', 'accountId').catch((error) => {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error.message).toBe(Errors.RIDE_NOT_IN_ACCEPTED_STATUS);
    });
  });

  it('should start the ride and return a success message', async() => {
    // Arrange
    const accountProps = createMock<AccountPropsFactory>({ ...accountData, isDriver: true });
    const account = AccountFactory.create(accountProps);
    mockAccountRepository.findById.mockResolvedValue(account);

    const rideProps = createMock<RidePropsFactory>({ status: RideStatus.accepted });
    const ride = RideFactory.load(rideProps, 'rideId');
    mockRideRepository.findById.mockResolvedValue(ride);

    // Act
    const result = await sut.execute('rideId', 'accountId');

    // Assert
    expect(result).toEqual({ message: 'Corrida iniciada.' });
  });
});
