import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Account } from 'src/modules/account/domain/entities/account.entity';
import { AccountFactory } from 'src/modules/account/domain/factories/account.factory';
import { IAccountRepository } from 'src/modules/account/persistence/repositories/account-repository.interface';
import { Errors } from 'src/shared/errors/error-message';
import { IRideDAO, RideDaoDto } from '../../persistence/dao/ride-dao.interface';
import { RequestRideInputDto } from './dtos/request-ride.dto';
import { RequestRideUseCase } from './request-ride.service';

describe('RequestRideUseCase', () => {
  let sut: RequestRideUseCase;
  let mockAccountRepository: jest.Mocked<IAccountRepository>;
  let mockRideDao: jest.Mocked<IRideDAO>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(RequestRideUseCase).compile();

    sut = unit;
    mockAccountRepository = unitRef.get(TOKENS.IAccountRepository);
    mockRideDao = unitRef.get(TOKENS.IRideDAO);
  });

  it('should throw an error when passengerId does not belong to a passenger', async() => {
    // Arrange
    const data = createMock<RequestRideInputDto>();
    const accountData = createMock<Account>({
      isPassenger: false,
      email: 'jhondoe@email.com',
      cpf: '12345678909',
    });
    const account = AccountFactory.create(accountData);
    mockAccountRepository.findById.mockResolvedValue(account);

    // Act & Assert
    expect.assertions(2);
    return sut.execute(data).catch((error) => {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error.message).toBe('Somente passageiros podem solicitar corridas.');
    });
  });

  it('should throw an error when the passenger already has an active ride', async() => {
    // Arrange
    const data = createMock<RequestRideInputDto>();
    const accountData = createMock<Account>({
      isPassenger: true,
      email: 'jhondoe@email.com',
      cpf: '12345678909',
    });
    const account = AccountFactory.create(accountData);
    mockAccountRepository.findById.mockResolvedValue(account);

    const rides = [createMock<RideDaoDto>()];
    mockRideDao.findBy.mockResolvedValue(rides);

    // Act & Assert
    expect.assertions(2);
    return sut.execute(data).catch((error) => {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe(Errors.PASSENGER_ALREADY_HAS_ACTIVE_RIDE);
    });
  });
});
