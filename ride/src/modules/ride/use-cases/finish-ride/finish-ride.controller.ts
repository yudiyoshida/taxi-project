import { Controller, Param, Patch } from '@nestjs/common';
import { Params } from 'src/shared/dtos/params/params.dto';
import { FinishRideUseCase } from './finish-ride.service';

@Controller()
export class FinishRideController {
  constructor(private service: FinishRideUseCase) {}

  @Patch(':id/finish')
  public async handle(@Param() params: Params) {
    return this.service.execute(params.id);
  }
}
