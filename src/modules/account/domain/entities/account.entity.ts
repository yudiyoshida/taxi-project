import * as crypto from 'crypto';
import { CPF } from 'src/modules/account/domain/value-objects/cpf/cpf.vo';
import { Email } from 'src/modules/account/domain/value-objects/email/email.vo';

export type AccountProps = {
  id: string;
  isPassenger: boolean;
  isDriver: boolean;
  name: string;
  cpf: CPF;
  email: Email;
  password: string;

  carPlate: string | null;
}

export type AccountCreationProps = {
  isPassenger: boolean;
  isDriver: boolean;
  name: string;
  cpf: string;
  email: string;
  password: string;
  carPlate: string | null;
}

export class Account {
  private _props: AccountProps;

  private constructor(props: AccountCreationProps, uuid?: string) {
    const id = uuid ?? crypto.randomUUID();
    const email = new Email(props.email);
    const cpf = new CPF(props.cpf);

    this._props = { ...props, id, email, cpf };
  }

  public static create(props: AccountCreationProps): Account {
    return new Account({ ...props });
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
