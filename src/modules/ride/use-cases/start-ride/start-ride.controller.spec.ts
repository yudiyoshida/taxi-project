import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { AccountModule } from 'src/modules/account/account.module';
import { SignupUseCase } from 'src/modules/account/use-cases/signup/signup.service';
import { RideStatus } from '../../domain/entities/ride.entity';
import { RideModule } from '../../ride.module';
import { AcceptRideUseCase } from '../accept-ride/accept-ride.service';
import { GetRideByIdUseCase } from '../get-ride-by-id/get-ride-by-id.service';
import { RequestRideUseCase } from '../request-ride/request-ride.service';
import { StartRideController } from './start-ride.controller';

describe('StartRideController', () => {
  let sut: StartRideController;
  let prisma: PrismaService;
  let signup: SignupUseCase;
  let requestRide: RequestRideUseCase;
  let acceptRide: AcceptRideUseCase;
  let getRideById: GetRideByIdUseCase;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      imports: [
        RideModule,
        AccountModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get<StartRideController>(StartRideController);
    prisma = module.get<PrismaService>(PrismaService);
    signup = module.get<SignupUseCase>(SignupUseCase);
    requestRide = module.get<RequestRideUseCase>(RequestRideUseCase);
    acceptRide = module.get<AcceptRideUseCase>(AcceptRideUseCase);
    getRideById = module.get<GetRideByIdUseCase>(GetRideByIdUseCase);

    await prisma.account.deleteMany();
    await prisma.ride.deleteMany();
  });

  afterAll(async() => {
    await prisma.account.deleteMany();
    await prisma.ride.deleteMany();
  });

  it('should start a ride', async() => {
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
    const driver = await signup.execute({
      name: 'Driver Doe',
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

    await acceptRide.execute(requestedRide.id, driver.id);

    // Act
    await sut.handle({ id: requestedRide.id });

    // Assert
    const startedRide = await getRideById.execute(requestedRide.id);
    expect(startedRide.id).toBe(requestedRide.id);
    expect(startedRide.driverId).toBe(driver.id);
    expect(startedRide.status).toBe(RideStatus.inProgress);
  });
});
