import { Module } from '@nestjs/common';
import { AppRouterModule } from './app-router.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AccountModule } from './modules/account/account.module';
import { RideModule } from './modules/ride/ride.module';

@Module({
  imports: [
    AppRouterModule,
    AccountModule,
    RideModule,
    PrismaModule,
  ],
})
export class AppModule {}
