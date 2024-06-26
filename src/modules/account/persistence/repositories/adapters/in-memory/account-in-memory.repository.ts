/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Account } from 'src/modules/account/domain/entities/account.entity';
import { IAccountRepository } from '../../account-repository.interface';

@Injectable()
export class AccountInMemoryAdapterRepository implements IAccountRepository {
  public async save(account: Account): Promise<void> {
    return;
  }
}
