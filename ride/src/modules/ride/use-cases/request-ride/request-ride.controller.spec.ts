import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { IAccountGateway } from '../../gateway/account/account-gateway.interface';
import { RideModule } from '../../ride.module';
import { GetRideByIdUseCase } from '../get-ride-by-id/get-ride-by-id.service';
import { RequestRideInputDto } from './dtos/request-ride.dto';
import { RequestRideController } from './request-ride.controller';

describe('RequestRideController', () => {
  let sut: RequestRideController;
  let getRideById: GetRideByIdUseCase;
  let prisma: PrismaService;
  let accountGateway: IAccountGateway;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      imports: [
        RideModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get<RequestRideController>(RequestRideController);
    getRideById = module.get<GetRideByIdUseCase>(GetRideByIdUseCase);
    prisma = module.get<PrismaService>(PrismaService);
    accountGateway = module.get<IAccountGateway>(TOKENS.IAccountGateway);

    await prisma.ride.deleteMany();
  });

  afterAll(async() => {
    await prisma.ride.deleteMany();
  });

  it('should create a new ride', async() => {
    // Arrange
    const account = await accountGateway.signup({
      name: 'Jhon Doe',
      cpf: '12345678909',
      email: `jhondoe${Math.random()}@email.com`,
      password: 'any_password',
      isDriver: false,
      isPassenger: true,
      carPlate: null,
    });

    const data: RequestRideInputDto = {
      passengerId: account.id,
      fromLat: 1,
      fromLng: 2,
      toLat: 3,
      toLng: 4,
    };

    // Act
    const ride = await sut.handle(data);
    expect(ride).toHaveProperty('id');

    // Assert
    const result = await getRideById.execute(ride.id);
    expect(result).toHaveProperty('id', ride.id);
    expect(result).toHaveProperty('status', RideStatus.requested);
    expect(result).toHaveProperty('distance', 0);
  });

  it('should throw an error when the passenger already has an active ride', async() => {
    // Arrange
    const account = await accountGateway.signup({
      name: 'Jhon Doe',
      cpf: '12345678909',
      email: `jhondoe${Math.random()}@email.com`,
      password: 'any_password',
      isDriver: false,
      isPassenger: true,
      carPlate: null,
    });

    const data: RequestRideInputDto = {
      passengerId: account.id,
      fromLat: 1,
      fromLng: 2,
      toLat: 3,
      toLng: 4,
    };

    // Act
    await sut.handle(data);

    // Assert
    expect.assertions(1);
    return sut.handle(data).catch(error => {
      expect(error.message).toBe(Errors.PASSENGER_ALREADY_HAS_ACTIVE_RIDE);
    });
  });
});
