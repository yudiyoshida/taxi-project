import { BadRequestException } from '@nestjs/common';

export class Email {
  private _value: string;

  constructor(email: string) {
    if (!this.validate(email)) {
      throw new BadRequestException('Email inválido');
    }
    this._value = email;
  }

  private validate(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  public get value(): string {
    return this._value;
  }
}
