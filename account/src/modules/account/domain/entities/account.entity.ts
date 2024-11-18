import * as crypto from 'crypto';
import { CPF } from 'src/modules/account/domain/value-objects/cpf/cpf.vo';
import { Email } from 'src/modules/account/domain/value-objects/email/email.vo';
import { AccountPropsFactory } from '../factories/account.factory';

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
  private readonly _props: AccountProps;

  public get id() { return this._props.id; }
  public get isPassenger() { return this._props.isPassenger; }
  public get isDriver() { return this._props.isDriver; }
  public get name() { return this._props.name; }
  public get cpf() { return this._props.cpf.value; }
  public get email() { return this._props.email.value; }
  public get password() { return this._props.password; }
  public get carPlate() { return this._props.carPlate; }

  constructor(props: AccountPropsFactory, uuid?: string) {
    const id = uuid ?? crypto.randomUUID();
    const email = new Email(props.email);
    const cpf = new CPF(props.cpf);

    this._props = { ...props, id, email, cpf };
  }

  public isPassengerRole(): boolean {
    // apesar de ser um método simples, é usado para encapsular esta regra de negócio,
    // uma vez que verificar se a conta é do tipo passageiro pode mudar futuramente.
    return this._props.isPassenger;
  }

  public isDriverRole(): boolean {
    // apesar de ser um método simples, é usado para encapsular esta regra de negócio,
    // uma vez que verificar se a conta é do tipo motorista pode mudar futuramente.
    return this._props.isDriver && !!this._props.carPlate;
  }
}
