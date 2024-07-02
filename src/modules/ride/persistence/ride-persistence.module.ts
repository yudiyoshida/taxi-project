import { Module, Provider } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { RidePrismaAdapterDAO } from './dao/adapters/prisma/ride-prisma.dao';
import { RidePrismaAdapterRepository } from './repository/adapters/prisma/ride-prisma.repository';

const providers: Provider[] = [
  {
    provide: TOKENS.IRideDAO,
    useClass: RidePrismaAdapterDAO,
  },
  {
    provide: TOKENS.IRideRepository,
    useClass: RidePrismaAdapterRepository,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class RidePersistenceModule {}
