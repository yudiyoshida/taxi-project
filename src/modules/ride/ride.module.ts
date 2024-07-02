import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { RidePersistenceModule } from './persistence/ride-persistence.module';
import { GetRideByIdController } from './use-cases/get-ride-by-id/get-ride-by-id.controller';
import { GetRideByIdUseCase } from './use-cases/get-ride-by-id/get-ride-by-id.service';
import { RequestRideController } from './use-cases/request-ride/request-ride.controller';
import { RequestRideUseCase } from './use-cases/request-ride/request-ride.service';

@Module({
  imports: [
    AccountModule,
    RidePersistenceModule,
  ],
  controllers: [
    RequestRideController,
    GetRideByIdController,
  ],
  providers: [
    RequestRideUseCase,
    GetRideByIdUseCase,
  ],
})
export class RideModule {}
