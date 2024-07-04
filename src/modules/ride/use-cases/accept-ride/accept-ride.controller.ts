import { Body, Controller, Param, Patch } from '@nestjs/common';
import { Params } from 'src/shared/dtos/params/params.dto';
import { AcceptRideUseCase } from './accept-ride.service';
import { AcceptRideInputDto } from './dtos/accept-ride.dto';

@Controller()
export class AcceptRideController {
  constructor(private service: AcceptRideUseCase) {}

  @Patch(':id/accept')
  public async handle(@Param() params: Params, @Body() body: AcceptRideInputDto) {
    return this.service.execute(params.id, body.accountId);
  }
}
