import { Module } from '@nestjs/common';
import { AccountPersistenceModule } from './persistence/account-persistence.module';
import { GetAccountByIdController } from './use-cases/get-account-by-id/get-account-by-id.controller';
import { GetAccountByIdUseCase } from './use-cases/get-account-by-id/get-account-by-id.service';
import { SignupController } from './use-cases/signup/signup.controller';
import { SignupUseCase } from './use-cases/signup/signup.service';

@Module({
  imports: [
    AccountPersistenceModule,
  ],
  controllers: [
    SignupController,
    GetAccountByIdController,
  ],
  providers: [
    SignupUseCase,
    GetAccountByIdUseCase,
  ],
})
export class AccountModule {}
