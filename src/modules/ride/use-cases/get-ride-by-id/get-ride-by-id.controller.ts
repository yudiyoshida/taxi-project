import { Controller, Get, Param } from '@nestjs/common';
import { Params } from 'src/shared/dtos/params/params.dto';
import { RideDaoDto } from '../../persistence/dao/ride-dao.interface';
import { GetRideByIdUseCase } from './get-ride-by-id.service';

@Controller()
export class GetRideByIdController {
  constructor(private service: GetRideByIdUseCase) {}

  @Get(':id')
  public async handle(@Param() params: Params): Promise<RideDaoDto> {
    return this.service.execute(params.id);
  }
}
