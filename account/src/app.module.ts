import { Module } from '@nestjs/common';
import { AppRouterModule } from './app-router.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    AppRouterModule,
    AccountModule,
    PrismaModule,
  ],
})
export class AppModule {}
