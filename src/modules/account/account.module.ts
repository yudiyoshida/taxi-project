import { Module } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { AccountPrismaAdapterDAO } from './persistence/dao/adapters/prisma/account-prisma.dao';
import { AccountPrismaAdapterRepository } from './persistence/repositories/adapters/prisma/account-prisma.repository';
import { SignupController } from './use-cases/signup/signup.controller';
import { SignupService } from './use-cases/signup/signup.service';

@Module({
  controllers: [
    SignupController,
  ],
  providers: [
    SignupService,
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
