import { Injectable, NotFoundException } from '@nestjs/common';
import { Errors } from 'src/shared/errors/error-message';
import { AccountDaoDto } from '../../persistence/dao/account-dao.dto';
import { GetAccountByIdUseCase } from '../get-account-by-id/get-account-by-id.service';

@Injectable()
export class GetPassengerByIdUseCase {
  constructor(private getAccountById: GetAccountByIdUseCase) {}

  public async execute(id: string): Promise<AccountDaoDto> {
    const account = await this.getAccountById.execute(id);

    if (!account.isPassenger) {
      throw new NotFoundException(Errors.PASSENGER_NOT_FOUND);
    }
    return account;
  }
}
