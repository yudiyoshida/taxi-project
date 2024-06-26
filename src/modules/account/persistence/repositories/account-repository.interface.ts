import { Account } from '../../domain/entities/account.entity';

export interface IAccountRepository {
  save(account: Account): Promise<void>;
}
