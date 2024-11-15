import { Module } from '@nestjs/common';
import { AccountPersistenceModule } from '../account/persistence/account-persistence.module';
import { PositionPersistenceModule } from '../position/persistence/position-persistence.module';
import { RidePersistenceModule } from './persistence/ride-persistence.module';
import { AcceptRideController } from './use-cases/accept-ride/accept-ride.controller';
import { AcceptRideUseCase } from './use-cases/accept-ride/accept-ride.service';
import { FinishRideController } from './use-cases/finish-ride/finish-ride.controller';
import { FinishRideUseCase } from './use-cases/finish-ride/finish-ride.service';
import { GetRideByIdController } from './use-cases/get-ride-by-id/get-ride-by-id.controller';
import { GetRideByIdUseCase } from './use-cases/get-ride-by-id/get-ride-by-id.service';
import { RequestRideController } from './use-cases/request-ride/request-ride.controller';
import { RequestRideUseCase } from './use-cases/request-ride/request-ride.service';
import { StartRideController } from './use-cases/start-ride/start-ride.controller';
import { StartRideUseCase } from './use-cases/start-ride/start-ride.service';
import { UpdatePositionUseCase } from './use-cases/update-position/update-position.service';

@Module({
  imports: [
    AccountPersistenceModule,
    RidePersistenceModule,
    PositionPersistenceModule,
  ],
  controllers: [
    RequestRideController,
    GetRideByIdController,
    AcceptRideController,
    StartRideController,
    FinishRideController,
  ],
  providers: [
    RequestRideUseCase,
    GetRideByIdUseCase,
    AcceptRideUseCase,
    StartRideUseCase,
    UpdatePositionUseCase,
    FinishRideUseCase,
  ],
})
export class RideModule {}
