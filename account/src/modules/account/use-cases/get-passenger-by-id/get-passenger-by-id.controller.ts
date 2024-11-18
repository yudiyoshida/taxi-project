import { Controller, Get, Param } from '@nestjs/common';
import { Params } from 'src/shared/dtos/params/params.dto';
import { GetPassengerByIdUseCase } from './get-passenger-by-id.service';

@Controller('passengers')
export class GetPassengerByIdController {
  constructor(private service: GetPassengerByIdUseCase) {}

  @Get(':id')
  public async handle(@Param() params: Params) {
    return this.service.execute(params.id);
  }
}
