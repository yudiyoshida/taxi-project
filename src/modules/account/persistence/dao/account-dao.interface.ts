export interface IAccountDAO {
  findById(id: string): Promise<AccountDaoDto|null>;
  findByEmail(email: string): Promise<AccountDaoDto|null>;
}

export type AccountDaoDto = {
  id: string;
  isPassenger: boolean;
  isDriver: boolean;
  name: string;
  cpf: string;
  email: string;
  carPlate: string | null;
}
