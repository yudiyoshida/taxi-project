/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AccountDaoDto, IAccountDAO } from '../../account-dao.interface';

@Injectable()
export class AccountInMemoryAdapterDAO implements IAccountDAO {
  public async findByEmail(email: string): Promise<AccountDaoDto|null> {
    return null;
  }
}
