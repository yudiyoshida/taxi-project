import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AccountModule } from './modules/account/account.module';
import { RideModule } from './modules/ride/ride.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'accounts',
        module: AccountModule,
      },
      {
        path: 'rides',
        module: RideModule,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRouterModule {}
