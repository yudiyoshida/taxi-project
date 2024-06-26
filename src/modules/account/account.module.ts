import { Module } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { AccountPrismaAdapterDAO } from './persistence/dao/adapters/prisma/account-prisma.dao';
import { AccountPrismaAdapterRepository } from './persistence/repositories/adapters/prisma/account-prisma.repository';
import { GetAccountByIdController } from './use-cases/get-account-by-id/get-account-by-id.controller';
import { GetAccountByIdUseCase } from './use-cases/get-account-by-id/get-account-by-id.service';
import { SignupController } from './use-cases/signup/signup.controller';
import { SignupUseCase } from './use-cases/signup/signup.service';

@Module({
  controllers: [
    SignupController,
    GetAccountByIdController,
  ],
  providers: [
    SignupUseCase,
    GetAccountByIdUseCase,
    {
      provide: TOKENS.IAccountRepository,
      useClass: AccountPrismaAdapterRepository,
    },
    {
      provide: TOKENS.IAccountDAO,
      useClass: AccountPrismaAdapterDAO,
    },
  ],
})
export class AccountModule {}
