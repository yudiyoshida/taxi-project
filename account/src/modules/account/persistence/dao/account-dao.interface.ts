import { AccountDaoDto } from './account-dao.dto';

export interface IAccountDAO {
  findById(id: string): Promise<AccountDaoDto|null>;
  findByEmail(email: string): Promise<AccountDaoDto|null>;
}
