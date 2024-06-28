import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { RidePersistenceModule } from './persistence/ride-persistence.module';
import { RequestRideController } from './use-cases/request-ride/request-ride.controller';
import { RequestRideUseCase } from './use-cases/request-ride/request-ride.service';

@Module({
  imports: [
    AccountModule,
    RidePersistenceModule,
  ],
  controllers: [
    RequestRideController,
  ],
  providers: [
    RequestRideUseCase,
  ],
})
export class RideModule {}
