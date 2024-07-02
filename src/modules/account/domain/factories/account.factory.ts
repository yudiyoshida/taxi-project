import { Account } from '../entities/account.entity';

export type AccountPropsCreation = {
  isPassenger: boolean;
  isDriver: boolean;
  name: string;
  cpf: string;
  email: string;
  password: string;
  carPlate: string | null;
}

export class AccountFactory {
  public static create(props: AccountPropsCreation): Account {
    return new Account(props);
  }

  public static load(props: AccountPropsCreation, id: string): Account {
    return new Account(props, id);
  }
}
