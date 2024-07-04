import { Module, Provider } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { AccountPrismaAdapterDAO } from './dao/adapters/prisma/account-prisma.dao';
import { AccountPrismaAdapterRepository } from './repositories/adapters/prisma/account-prisma.repository';

const providers: Provider[] = [
  {
    provide: TOKENS.IAccountDAO,
    useClass: AccountPrismaAdapterDAO,
  },
  {
    provide: TOKENS.IAccountRepository,
    useClass: AccountPrismaAdapterRepository,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class AccountPersistenceModule {}
