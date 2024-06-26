import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { AccountDaoDto } from '../../persistence/dao/account-dao.interface';
import { AccountPrismaAdapterDAO } from '../../persistence/dao/adapters/prisma/account-prisma.dao';
import { GetAccountByIdUseCase } from './get-account-by-id.service';

describe('GetAccountByIdUseCase', () => {
  let sut: GetAccountByIdUseCase;
  let mockAccountDao: jest.Mocked<AccountPrismaAdapterDAO>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(GetAccountByIdUseCase).compile();

    sut = unit;
    mockAccountDao = unitRef.get(TOKENS.IAccountDAO);
  });

  it('should throw an error when account is not found', async() => {
    // Arrange
    const id = '123';
    mockAccountDao.findById.mockResolvedValue(null);

    // Act & Assert
    return sut.execute(id).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Conta não encontrada na base de dados.');
    });
  });

  it('should return an account when it is found', async() => {
    // Arrange
    const id = '123';
    const account = createMock<AccountDaoDto>();
    mockAccountDao.findById.mockResolvedValue(account);

    // Act
    const result = await sut.execute(id);

    // Assert
    expect(result).toBe(account);
  });
});
