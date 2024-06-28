import { Module, Provider } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { RidePrismaAdapterDAO } from './dao/prisma/ride-prisma.dao';

const providers: Provider[] = [
  {
    provide: TOKENS.IRideDAO,
    useClass: RidePrismaAdapterDAO,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class RidePersistenceModule {}
