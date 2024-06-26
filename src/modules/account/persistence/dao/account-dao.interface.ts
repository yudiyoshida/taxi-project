export interface IAccountDAO {
  findByEmail(email: string): Promise<AccountDaoDto|null>;
}

export type AccountDaoDto = {
  id: string;
  email: string;
}
