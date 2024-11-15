import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { Errors } from 'src/shared/errors/error-message';
import { AccountModule } from '../../account.module';
import { SignupInputDto } from '../signup/dtos/signup.dto';
import { SignupUseCase } from '../signup/signup.service';
import { GetAccountByIdController } from './get-account-by-id.controller';

describe('GetAccountByIdController', () => {
  let sut: GetAccountByIdController;
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

    sut = module.get<GetAccountByIdController>(GetAccountByIdController);
    signup = module.get<SignupUseCase>(SignupUseCase);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.account.deleteMany({});
  });

  it('should throw an error if account is not found', async() => {
    // Act & Assert
    expect.assertions(1);
    return sut.handle({ id: 'random-id' }).catch((error) => {
      expect(error.message).toBe(Errors.ACCOUNT_NOT_FOUND);
    });
  });

  it('should return account by id', async() => {
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

    // Act
    const result = await sut.handle({ id: account.id });

    // Assert
    expect(result.id).toBe(account.id);
    expect(result.name).toBe(data.name);
    expect(result.email).toBe(data.email);
    expect(result.cpf).toBe(data.cpf);
    expect(result.isPassenger).toBe(data.isPassenger);
    expect(result.isDriver).toBe(data.isDriver);
    expect(result.carPlate).toBe(data.carPlate);
  });
});
