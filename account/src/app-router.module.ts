import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'accounts',
        module: AccountModule,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRouterModule {}
