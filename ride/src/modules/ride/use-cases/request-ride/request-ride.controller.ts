import { Body, Controller, Post } from '@nestjs/common';
import { RequestRideInputDto } from './dtos/request-ride.dto';
import { RequestRideUseCase } from './request-ride.service';

@Controller()
export class RequestRideController {
  constructor(private service: RequestRideUseCase) {}

  @Post()
  public async handle(@Body() body: RequestRideInputDto) {
    return this.service.execute(body);
  }
}
