import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { RidePersistenceModule } from './persistence/ride-persistence.module';
import { AcceptRideController } from './use-cases/accept-ride/accept-ride.controller';
import { AcceptRideUseCase } from './use-cases/accept-ride/accept-ride.service';
import { GetRideByIdController } from './use-cases/get-ride-by-id/get-ride-by-id.controller';
import { GetRideByIdUseCase } from './use-cases/get-ride-by-id/get-ride-by-id.service';
import { RequestRideController } from './use-cases/request-ride/request-ride.controller';
import { RequestRideUseCase } from './use-cases/request-ride/request-ride.service';
import { StartRideController } from './use-cases/start-ride/start-ride.controller';
import { StartRideUseCase } from './use-cases/start-ride/start-ride.service';

@Module({
  imports: [
    AccountModule,
    RidePersistenceModule,
  ],
  controllers: [
    RequestRideController,
    GetRideByIdController,
    AcceptRideController,
    StartRideController,
  ],
  providers: [
    RequestRideUseCase,
    GetRideByIdUseCase,
    AcceptRideUseCase,
    StartRideUseCase,
  ],
})
export class RideModule {}
