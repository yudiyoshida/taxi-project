import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { IAccountGateway } from '../../gateway/account/account-gateway.interface';
import { RideModule } from '../../ride.module';
import { RequestRideInputDto } from '../request-ride/dtos/request-ride.dto';
import { RequestRideUseCase } from '../request-ride/request-ride.service';
import { GetRideByIdController } from './get-ride-by-id.controller';

describe('GetRideByIdController', () => {
  let sut: GetRideByIdController;
  let prisma: PrismaService;
  let requestRide: RequestRideUseCase;
  let accountGateway: IAccountGateway;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      imports: [
        RideModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get<GetRideByIdController>(GetRideByIdController);
    prisma = module.get<PrismaService>(PrismaService);
    requestRide = module.get<RequestRideUseCase>(RequestRideUseCase);
    accountGateway = module.get<IAccountGateway>(TOKENS.IAccountGateway);

    await prisma.ride.deleteMany();
  });

  afterAll(async() => {
    await prisma.ride.deleteMany();
  });

  it('should throw an error if ride is not found', async() => {
    // Act & Assert
    expect.assertions(1);
    return sut.handle({ id: 'rideId' }).catch((error) => {
      expect(error.message).toBe(Errors.RIDE_NOT_FOUND);
    });
  });

  it('should return a ride', async() => {
    // Arrange
    const account = await accountGateway.signup({
      name: 'Jhon Doe',
      email: `jhondoe-${Math.random()}@email.com`,
      password: 'password',
      cpf: '12345678909',
      isPassenger: true,
      isDriver: false,
      carPlate: null,
    });

    const data: RequestRideInputDto = {
      passengerId: account.id,
      fromLat: 1,
      fromLng: 2,
      toLat: 3,
      toLng: 4,
    };

    const ride = await requestRide.execute(data);

    // Act
    const result = await sut.handle({ id: ride.id });

    // Assert
    expect(result).toEqual({
      id: ride.id,
      passengerId: account.id,
      driverId: null,
      date: expect.any(Date),
      fare: null,
      status: RideStatus.requested,
      fromLat: data.fromLat,
      fromLng: data.fromLng,
      toLat: data.toLat,
      toLng: data.toLng,
      distance: 0,
    });
  });
});
