import { Body, Controller, Post } from '@nestjs/common';
import { SignupInputDto } from './dtos/signup.dto';
import { SignupUseCase } from './signup.service';

@Controller()
export class SignupController {
  constructor(private service: SignupUseCase) {}

  @Post()
  public async handle(@Body() body: SignupInputDto) {
    return this.service.execute(body);
  }
}
