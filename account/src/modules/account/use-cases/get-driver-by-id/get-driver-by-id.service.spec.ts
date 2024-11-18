import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { Errors } from 'src/shared/errors/error-message';
import { AccountModule } from '../../account.module';
import { SignupInputDto } from '../signup/dtos/signup.dto';
import { SignupUseCase } from '../signup/signup.service';
import { GetDriverByIdUseCase } from './get-driver-by-id.service';

describe('GetDriverByIdUseCase', () => {
  let sut: GetDriverByIdUseCase;
  let signup: SignupUseCase;
  let prisma: PrismaService;

  beforeEach(async() => {
    // TODO: deve utilizar banco de dados de teste.
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccountModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get<GetDriverByIdUseCase>(GetDriverByIdUseCase);
    signup = module.get<SignupUseCase>(SignupUseCase);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.account.deleteMany({});
  });

  afterAll(async() => {
    await prisma.account.deleteMany({});
  });

  it('should throw an error if driver is not found', async() => {
    // Arrange
    const data: SignupInputDto = {
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: 'password',
      cpf: '12345678909',
      isPassenger: true,
      isDriver: false,
      carPlate: null,
    };
    const account = await signup.execute(data);

    // Act & Assert
    expect.assertions(2);
    return sut.execute(account.id).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(Errors.DRIVER_NOT_FOUND);
    });
  });

  it('should return driver by id', async() => {
    // Arrange
    const data: SignupInputDto = {
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: 'password',
      cpf: '12345678909',
      isPassenger: false,
      isDriver: true,
      carPlate: 'ABC1234',
    };
    const account = await signup.execute(data);

    // Act
    const result = await sut.execute(account.id);

    // Assert
    expect(result.id).toBe(account.id);
    expect(result.name).toBe(data.name);
    expect(result.email).toBe(data.email);
    expect(result.cpf).toBe(data.cpf);
    expect(result.isPassenger).toBe(false);
    expect(result.isDriver).toBe(true);
    expect(result.carPlate).toBe(data.carPlate);
    expect(result).not.toHaveProperty('password');
  });
});
