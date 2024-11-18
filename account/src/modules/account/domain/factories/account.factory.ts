import { Account } from '../entities/account.entity';

export type AccountPropsFactory = {
  isPassenger: boolean;
  isDriver: boolean;
  name: string;
  cpf: string;
  email: string;
  password: string;
  carPlate: string | null;
}

export class AccountFactory {
  public static create(props: AccountPropsFactory): Account {
    return new Account(props);
  }

  public static load(props: AccountPropsFactory, id: string): Account {
    return new Account(props, id);
  }
}
