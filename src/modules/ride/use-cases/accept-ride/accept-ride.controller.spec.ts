import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { SignupUseCase } from 'src/modules/account/use-cases/signup/signup.service';
import { RideStatus } from '../../domain/entities/ride.entity';
import { RideModule } from '../../ride.module';
import { GetRideByIdUseCase } from '../get-ride-by-id/get-ride-by-id.service';
import { RequestRideUseCase } from '../request-ride/request-ride.service';
import { AcceptRideController } from './accept-ride.controller';

describe('AcceptRideController', () => {
  let sut: AcceptRideController;
  let prisma: PrismaService;
  let signup: SignupUseCase;
  let requestRide: RequestRideUseCase;
  let getRideById: GetRideByIdUseCase;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      imports: [
        RideModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get<AcceptRideController>(AcceptRideController);
    prisma = module.get<PrismaService>(PrismaService);
    signup = module.get<SignupUseCase>(SignupUseCase);
    requestRide = module.get<RequestRideUseCase>(RequestRideUseCase);
    getRideById = module.get<GetRideByIdUseCase>(GetRideByIdUseCase);

    await prisma.account.deleteMany();
    await prisma.ride.deleteMany();
  });

  afterAll(async() => {
    await prisma.account.deleteMany();
    await prisma.ride.deleteMany();
  });

  it('should accept a ride', async() => {
    // Arrange
    const passenger = await signup.execute({
      name: 'Passenger Doe',
      email: 'passenger@email.com',
      password: 'password',
      cpf: '12345678909',
      carPlate: null,
      isDriver: false,
      isPassenger: true,
    });
    const driverName = 'Driver Doe';
    const driver = await signup.execute({
      name: driverName,
      email: 'driver@email.com',
      password: 'password',
      cpf: '12345678909',
      carPlate: 'ABC1234',
      isDriver: true,
      isPassenger: false,
    });

    const requestedRide = await requestRide.execute({
      passengerId: passenger.id,
      fromLat: -23.561399,
      fromLng: -46.656056,
      toLat: -23.561399,
      toLng: -46.656056,
    });

    // Act
    const ride = await sut.handle({ id: requestedRide.id }, { accountId: driver.id });

    // Assert
    expect(ride.message).toBe(`Corrida aceita pelo motorista ${driverName}.`);

    const acceptedRide = await getRideById.execute(requestedRide.id);
    expect(acceptedRide.id).toBe(requestedRide.id);
    expect(acceptedRide.driverId).toBe(driver.id);
    expect(acceptedRide.status).toBe(RideStatus.accepted);
  });
});
