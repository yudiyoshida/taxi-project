import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { SignupUseCase } from 'src/modules/account/use-cases/signup/signup.service';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { RideModule } from '../../ride.module';
import { GetRideByIdUseCase } from '../get-ride-by-id/get-ride-by-id.service';
import { RequestRideInputDto } from './dtos/request-ride.dto';
import { RequestRideController } from './request-ride.controller';

describe('RequestRideController', () => {
  let sut: RequestRideController;
  let prisma: PrismaService;
  let signup: SignupUseCase;
  let getRideById: GetRideByIdUseCase;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      imports: [
        RideModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get<RequestRideController>(RequestRideController);
    prisma = module.get<PrismaService>(PrismaService);
    signup = module.get<SignupUseCase>(SignupUseCase);
    getRideById = module.get<GetRideByIdUseCase>(GetRideByIdUseCase);

    await prisma.account.deleteMany();
    await prisma.ride.deleteMany();
  });

  afterAll(async() => {
    await prisma.account.deleteMany();
    await prisma.ride.deleteMany();
  });

  it('should throw an error if provided id does not belong to a passenger', async() => {
    // Arrange
    const account = await signup.execute({
      name: 'Jhon Doe',
      cpf: '12345678909',
      email: 'jhondoe@email.com',
      password: 'any_password',
      isDriver: true,
      isPassenger: false,
      carPlate: 'ABC1234',
    });

    // Act & Assert
    return sut.handle({
      passengerId: account.id,
      fromLat: 1,
      fromLng: 2,
      toLat: 3,
      toLng: 4,
    })
      .catch(error => {
        expect(error.message).toBe(Errors.ACCOUNT_NOT_PASSENGER_TYPE);
      });
  });

  it('should throw an error when the passenger already has an active ride', async() => {
    // Arrange
    const account = await signup.execute({
      name: 'Jhon Doe',
      cpf: '12345678909',
      email: 'jhondoe@email.com',
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
    return sut.handle(data)
      .catch(error => {
        expect(error.message).toBe(Errors.PASSENGER_ALREADY_HAS_ACTIVE_RIDE);
      });
  });

  it('should create a new ride', async() => {
    // Arrange
    const account = await signup.execute({
      name: 'Jhon Doe',
      cpf: '12345678909',
      email: 'jhondoe@email.com',
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
  });
});
