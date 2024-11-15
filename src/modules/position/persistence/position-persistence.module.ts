import { Module, Provider } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { PositionPrismaAdapterRepository } from './repository/adapters/prisma/position-prisma.repository';

const providers: Provider[] = [
  {
    provide: TOKENS.IPositionRepository,
    useClass: PositionPrismaAdapterRepository,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class PositionPersistenceModule {}
