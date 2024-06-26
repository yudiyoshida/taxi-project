import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AccountModule } from './modules/account/account.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'accounts',
        module: AccountModule,
      },
    ]),
    PrismaModule,
  ],
  exports: [RouterModule],
})
export class AppRouterModule {}
