import { Module } from '@nestjs/common';
import { AccountPersistenceModule } from './persistence/account-persistence.module';
import { GetAccountByIdUseCase } from './use-cases/get-account-by-id/get-account-by-id.service';
import { GetDriverByIdController } from './use-cases/get-driver-by-id/get-driver-by-id.controller';
import { GetDriverByIdUseCase } from './use-cases/get-driver-by-id/get-driver-by-id.service';
import { GetPassengerByIdController } from './use-cases/get-passenger-by-id/get-passenger-by-id.controller';
import { GetPassengerByIdUseCase } from './use-cases/get-passenger-by-id/get-passenger-by-id.service';
import { SignupController } from './use-cases/signup/signup.controller';
import { SignupUseCase } from './use-cases/signup/signup.service';

@Module({
  imports: [
    AccountPersistenceModule,
  ],
  controllers: [
    GetDriverByIdController,
    GetPassengerByIdController,
    SignupController,
  ],
  providers: [
    GetAccountByIdUseCase,
    GetDriverByIdUseCase,
    GetPassengerByIdUseCase,
    SignupUseCase,
  ],
})
export class AccountModule {}
