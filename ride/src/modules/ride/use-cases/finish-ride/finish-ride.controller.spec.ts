import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { TOKENS } from 'src/infra/ioc/token';
import { RabbitMQService } from 'src/infra/queue/rabbitmq.service';
import { RideStatus } from '../../domain/entities/ride.entity';
import { IAccountGateway } from '../../gateway/account/account-gateway.interface';
import { RideModule } from '../../ride.module';
import { AcceptRideUseCase } from '../accept-ride/accept-ride.service';
import { GetRideByIdUseCase } from '../get-ride-by-id/get-ride-by-id.service';
import { RequestRideUseCase } from '../request-ride/request-ride.service';
import { StartRideUseCase } from '../start-ride/start-ride.service';
import { FinishRideController } from './finish-ride.controller';

describe('FinishRideController', () => {
  let sut: FinishRideController;
  let prisma: PrismaService;
  let requestRide: RequestRideUseCase;
  let acceptRide: AcceptRideUseCase;
  let startRide: StartRideUseCase;
  let getRideById: GetRideByIdUseCase;
  let accountGateway: IAccountGateway;
  let rabbitMqService: RabbitMQService;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      imports: [
        RideModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get<FinishRideController>(FinishRideController);
    prisma = module.get<PrismaService>(PrismaService);
    requestRide = module.get<RequestRideUseCase>(RequestRideUseCase);
    acceptRide = module.get<AcceptRideUseCase>(AcceptRideUseCase);
    startRide = module.get<StartRideUseCase>(StartRideUseCase);
    getRideById = module.get<GetRideByIdUseCase>(GetRideByIdUseCase);
    accountGateway = module.get<IAccountGateway>(TOKENS.IAccountGateway);
    rabbitMqService = module.get<RabbitMQService>(RabbitMQService);

    await prisma.ride.deleteMany();
  });

  afterAll(async() => {
    await prisma.ride.deleteMany();
    await rabbitMqService.close();
  });

  it('should finish a ride', async() => {
    // Arrange
    const passenger = await accountGateway.signup({
      name: 'Passenger Doe',
      email: `passenger-${Math.random()}@email.com`,
      password: 'password',
      cpf: '12345678909',
      carPlate: null,
      isDriver: false,
      isPassenger: true,
    });
    const driver = await accountGateway.signup({
      name: 'Driver Doe',
      email: `driver-${Math.random()}@email.com`,
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
    await startRide.execute(requestedRide.id);

    // Act
    await sut.handle({ id: requestedRide.id });

    // Assert
    const finishedRide = await getRideById.execute(requestedRide.id);
    expect(finishedRide.status).toBe(RideStatus.finished);
  });
});
