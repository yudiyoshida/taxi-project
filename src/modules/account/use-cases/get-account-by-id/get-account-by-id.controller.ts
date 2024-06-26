import { Controller, Get, Param } from '@nestjs/common';
import { Params } from 'src/shared/dtos/params/params.dto';
import { GetAccountByIdUseCase } from './get-account-by-id.service';

@Controller()
export class GetAccountByIdController {
  constructor(private service: GetAccountByIdUseCase) {}

  @Get(':id')
  public async handle(@Param() params: Params) {
    return this.service.execute(params.id);
  }
}
