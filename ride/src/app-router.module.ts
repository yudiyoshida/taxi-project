import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RideModule } from './modules/ride/ride.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'rides',
        module: RideModule,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRouterModule {}
