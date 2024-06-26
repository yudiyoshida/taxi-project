import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { ConflictException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { AccountDaoDto } from '../../persistence/dao/account-dao.interface';
import { AccountInMemoryAdapterDAO } from '../../persistence/dao/adapters/in-memory/account-in-memory.dao';
import { AccountInMemoryAdapterRepository } from '../../persistence/repositories/adapters/in-memory/account-in-memory.repository';
import { SignupInputDto } from './dtos/signup.dto';
import { SignupUseCase } from './signup.service';

describe('Signup use case', () => {
  let sut: SignupUseCase;
  let mockRepository: jest.Mocked<AccountInMemoryAdapterRepository>;
  let mockDao: jest.Mocked<AccountInMemoryAdapterDAO>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(SignupUseCase).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IAccountRepository);
    mockDao = unitRef.get(TOKENS.IAccountDAO);
  });

  it('should throw an error if the email is already in use', async() => {
    // Arrange
    const account = createMock<AccountDaoDto>();
    const data = createMock<SignupInputDto>();
    mockDao.findByEmail.mockResolvedValue(account);

    // Act & Assert
    expect.assertions(3);
    await sut.execute(data).catch((error) => {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('O email informado já está sendo utilizado.');
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  it('should return the id of the created account', async() => {
    // Arrange
    const data = createMock<SignupInputDto>({
      email: 'jhondoe@email.com',
      cpf: '12345678909',
    });
    mockDao.findByEmail.mockResolvedValue(null);

    // Act
    const result = await sut.execute(data);

    // Assert
    expect(result).toEqual({ id: expect.any(String) });
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
});
