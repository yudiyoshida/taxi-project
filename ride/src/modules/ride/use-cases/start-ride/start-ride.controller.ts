import { Controller, Param, Patch } from '@nestjs/common';
import { Params } from 'src/shared/dtos/params/params.dto';
import { StartRideUseCase } from './start-ride.service';

@Controller()
export class StartRideController {
  constructor(private service: StartRideUseCase) {}

  @Patch(':id/start')
  public async handle(@Param() params: Params) {
    return this.service.execute(params.id);
  }
}
