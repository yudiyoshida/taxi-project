import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppRouterModule } from './app-router.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { RideModule } from './modules/ride/ride.module';

@Module({
  imports: [
    AppRouterModule,
    HttpModule,
    RideModule,
    PrismaModule,
  ],
})
export class AppModule {}
