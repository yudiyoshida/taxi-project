import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { AccountModule } from '../../account.module';
import { GetAccountByIdUseCase } from '../get-account-by-id/get-account-by-id.service';
import { SignupInputDto } from './dtos/signup.dto';
import { SignupController } from './signup.controller';

describe('SignupController', () => {
  let sut: SignupController;
  let prisma: PrismaService;
  let getAccountByIdUseCase: GetAccountByIdUseCase;

  beforeEach(async() => {
    // TODO: deve utilizar banco de dados de teste.
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccountModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get<SignupController>(SignupController);
    prisma = module.get<PrismaService>(PrismaService);
    getAccountByIdUseCase = module.get<GetAccountByIdUseCase>(GetAccountByIdUseCase);

    await prisma.account.deleteMany({});
  });

  it('should create a new account', async() => {
    // Arrange
    const body: SignupInputDto = {
      isPassenger: true,
      isDriver: false,
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: 'any_password',
      cpf: '12345678909',
      carPlate: null,
    };

    // Act
    const result = await sut.handle(body);

    // Assert
    const account = await getAccountByIdUseCase.execute(result.id);
    expect(account).toEqual({
      id: result.id,
      isPassenger: body.isPassenger,
      isDriver: body.isDriver,
      name: body.name,
      email: body.email,
      cpf: body.cpf,
      carPlate: body.carPlate,
    });
  });
});
