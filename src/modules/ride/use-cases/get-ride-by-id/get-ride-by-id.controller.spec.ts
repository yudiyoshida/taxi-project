import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { AccountModule } from 'src/modules/account/account.module';
import { SignupUseCase } from 'src/modules/account/use-cases/signup/signup.service';
import { Errors } from 'src/shared/errors/error-message';
import { RideStatus } from '../../domain/entities/ride.entity';
import { RideModule } from '../../ride.module';
import { RequestRideInputDto } from '../request-ride/dtos/request-ride.dto';
import { RequestRideUseCase } from '../request-ride/request-ride.service';
import { GetRideByIdController } from './get-ride-by-id.controller';

describe('GetRideByIdController', () => {
  let sut: GetRideByIdController;
  let prismaService: PrismaService;
  let requestRide: RequestRideUseCase;
  let signup: SignupUseCase;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      imports: [
        RideModule,
        AccountModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get<GetRideByIdController>(GetRideByIdController);
    prismaService = module.get<PrismaService>(PrismaService);
    requestRide = module.get<RequestRideUseCase>(RequestRideUseCase);
    signup = module.get<SignupUseCase>(SignupUseCase);

    await prismaService.ride.deleteMany();
  });

  afterAll(async() => {
    await prismaService.ride.deleteMany();
  });

  it('should throw an error if ride is not found', async() => {
    // Arrange
    const rideId = 'rideId';

    // Act & Assert
    expect.assertions(1);
    return sut.handle({ id: rideId }).catch((error) => {
      expect(error.message).toBe(Errors.RIDE_NOT_FOUND);
    });
  });

  it('should return a ride', async() => {
    // Arrange
    const account = await signup.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
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
    });
  });
});
