import { Body, Controller, Param, Patch } from '@nestjs/common';
import { Params } from 'src/shared/dtos/params/params.dto';
import { StartRideInputDto } from './dtos/start-ride.dto';
import { StartRideUseCase } from './start-ride.service';

@Controller()
export class StartRideController {
  constructor(private service: StartRideUseCase) {}

  @Patch(':id/start')
  public async handle(@Param() params: Params, @Body() body: StartRideInputDto) {
    return this.service.execute(params.id, body.accountId);
  }
}
