import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { TOKENS } from 'src/infra/ioc/token';
import { IPositionRepository } from 'src/modules/position/persistence/repository/position-repository.interface';
import { PositionModule } from 'src/modules/position/position.module';
import { Errors } from 'src/shared/errors/error-message';
import { Ride } from '../../domain/entities/ride.entity';
import { IAccountGateway } from '../../gateway/account/account-gateway.interface';
import { IRideRepository } from '../../persistence/repository/ride-repository.interface';
import { RideModule } from '../../ride.module';
import { AcceptRideUseCase } from '../accept-ride/accept-ride.service';
import { RequestRideUseCase } from '../request-ride/request-ride.service';
import { StartRideUseCase } from '../start-ride/start-ride.service';
import { UpdatePositionUseCase } from './update-position.service';

describe('UpdatePositionUseCase', () => {
  let sut: UpdatePositionUseCase;
  let positionRepository: IPositionRepository;
  let rideRepository: IRideRepository;
  let requestRide: RequestRideUseCase;
  let acceptRide: AcceptRideUseCase;
  let startRide: StartRideUseCase;
  let prisma: PrismaService;
  let accountGateway: IAccountGateway;

  beforeEach(async() => {
    const module = await Test.createTestingModule({
      imports: [
        PositionModule,
        RideModule,
        PrismaModule,
      ],
    }).compile();

    sut = module.get(UpdatePositionUseCase);
    positionRepository = module.get<IPositionRepository>(TOKENS.IPositionRepository);
    rideRepository = module.get<IRideRepository>(TOKENS.IRideRepository);
    requestRide = module.get<RequestRideUseCase>(RequestRideUseCase);
    acceptRide = module.get<AcceptRideUseCase>(AcceptRideUseCase);
    startRide = module.get<StartRideUseCase>(StartRideUseCase);
    prisma = module.get<PrismaService>(PrismaService);
    accountGateway = module.get<IAccountGateway>(TOKENS.IAccountGateway);

    await prisma.position.deleteMany();
    await prisma.ride.deleteMany();
  });

  afterAll(async() => {
    await prisma.position.deleteMany();
    await prisma.ride.deleteMany();
  });

  it('should throw an error if ride is not in progress', async() => {
    // Arrange
    const mockRide = createMock<Ride>({ isInProgress: jest.fn().mockReturnValue(false) });
    jest.spyOn(rideRepository, 'findById').mockResolvedValue(mockRide);

    // Act & Assert
    return sut.execute({ rideId: mockRide.id, lat: 0, lng: 0 }).catch((error) => {
      expect(error.message).toBe(Errors.RIDE_NOT_IN_PROGRESS);
    });
  });

  it('should create a new position', async() => {
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
    const newPosition = await sut.execute({ rideId: requestedRide.id, lat: 0, lng: 0 });

    // Assert
    const position = await positionRepository.findById(newPosition.id);
    expect(position).toBeDefined();
    expect(position.rideId).toBe(requestedRide.id);
    expect(position.lat).toBe(0);
    expect(position.lng).toBe(0);
  });

  it('should update the ride distance', async() => {
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
    await sut.execute({ rideId: requestedRide.id, lat: -27.584905257808835, lng: -48.545022195325124 });
    await sut.execute({ rideId: requestedRide.id, lat: -27.496887588317275, lng: -48.522234807851476 });

    // Assert
    const ride = await rideRepository.findById(requestedRide.id);
    expect(ride.distance).toBeGreaterThan(0);
  });
});
