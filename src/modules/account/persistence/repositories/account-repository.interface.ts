import { Account } from '../../domain/entities/account.entity';

export interface IAccountRepository {
  findById(id: string): Promise<Account>;
  save(account: Account): Promise<void>;
}
