import { Controller, Get, Param } from '@nestjs/common';
import { Params } from 'src/shared/dtos/params/params.dto';
import { GetDriverByIdUseCase } from './get-driver-by-id.service';

@Controller('drivers')
export class GetDriverByIdController {
  constructor(private service: GetDriverByIdUseCase) {}

  @Get(':id')
  public async handle(@Param() params: Params) {
    return this.service.execute(params.id);
  }
}
