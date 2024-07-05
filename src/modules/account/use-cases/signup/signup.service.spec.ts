import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { ConflictException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { AccountDaoDto, IAccountDAO } from '../../persistence/dao/account-dao.interface';
import { IAccountRepository } from '../../persistence/repositories/account-repository.interface';
import { SignupInputDto } from './dtos/signup.dto';
import { SignupUseCase } from './signup.service';

const data = createMock<SignupInputDto>({
  email: 'jhondoe@email.com',
  cpf: '12345678909',
});

describe('SignupUseCase', () => {
  let sut: SignupUseCase;
  let mockRepository: jest.Mocked<IAccountRepository>;
  let mockDao: jest.Mocked<IAccountDAO>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(SignupUseCase).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IAccountRepository);
    mockDao = unitRef.get(TOKENS.IAccountDAO);
  });

  it('should throw an error if the email is already in use', async() => {
    // Arrange
    const account = createMock<AccountDaoDto>();
    mockDao.findByEmail.mockResolvedValue(account);

    // Act & Assert
    expect.assertions(3);
    await sut.execute(data).catch((error) => {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe(Errors.EMAIL_ALREADY_IN_USE);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  it('should return the id of the created account', async() => {
    // Arrange
    mockDao.findByEmail.mockResolvedValue(null);

    // Act
    const result = await sut.execute(data);

    // Assert
    expect(result).toEqual({ id: expect.any(String) });
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
});
