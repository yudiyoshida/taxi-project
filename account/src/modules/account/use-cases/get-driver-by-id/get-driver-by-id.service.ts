import { Injectable, NotFoundException } from '@nestjs/common';
import { Errors } from 'src/shared/errors/error-message';
import { AccountDaoDto } from '../../persistence/dao/account-dao.dto';
import { GetAccountByIdUseCase } from '../get-account-by-id/get-account-by-id.service';

@Injectable()
export class GetDriverByIdUseCase {
  constructor(private getAccountById: GetAccountByIdUseCase) {}

  public async execute(id: string): Promise<AccountDaoDto> {
    const account = await this.getAccountById.execute(id);

    if (!account.isDriver) {
      throw new NotFoundException(Errors.DRIVER_NOT_FOUND);
    }
    return account;
  }
}
