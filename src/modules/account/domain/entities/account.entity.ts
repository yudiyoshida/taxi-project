import * as crypto from 'crypto';
import { CPF } from 'src/modules/account/domain/value-objects/cpf/cpf.vo';
import { Email } from 'src/modules/account/domain/value-objects/email/email.vo';
import { AccountPropsCreation } from '../factories/account.factory';

type AccountProps = {
  id: string;
  isPassenger: boolean;
  isDriver: boolean;
  name: string;
  cpf: CPF;
  email: Email;
  password: string;
  carPlate: string | null;
}

export class Account {
  private _props: AccountProps;

  constructor(props: AccountPropsCreation, uuid?: string) {
    const id = uuid ?? crypto.randomUUID();
    const email = new Email(props.email);
    const cpf = new CPF(props.cpf);

    this._props = { ...props, id, email, cpf };
  }

  public isPassengerRole(): boolean {
    // apesar de ser um método simples, ele é usado para um design flexível,
    // uma vez que a regra de negócio sobre verificar se a conta é do tipo passageiro pode mudar futuramente.
    return this._props.isPassenger;
  }

  public get id(): string {
    return this._props.id;
  }
  public get isPassenger(): boolean {
    return this._props.isPassenger;
  }
  public get isDriver(): boolean {
    return this._props.isDriver;
  }
  public get name(): string {
    return this._props.name;
  }
  public get cpf(): string {
    return this._props.cpf.value;
  }
  public get email(): string {
    return this._props.email.value;
  }
  public get password(): string {
    return this._props.password;
  }
  public get carPlate(): string | null {
    return this._props.carPlate;
  }
}
