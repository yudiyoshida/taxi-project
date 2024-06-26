import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AccountModule } from './modules/account/account.module';

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
