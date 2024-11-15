import { Module } from '@nestjs/common';
import { PositionPersistenceModule } from './persistence/position-persistence.module';

@Module({
  imports: [PositionPersistenceModule],
  controllers: [],
  providers: [],
})
export class PositionModule {}
