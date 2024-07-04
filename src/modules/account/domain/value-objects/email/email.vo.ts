import { BadRequestException } from '@nestjs/common';

export class Email {
  private readonly _value: string;

  public get value(): string {
    return this._value;
  }

  constructor(rawEmail: string) {
    const email = this.sanitize(rawEmail);

    if (!this.validate(email)) {
      throw new BadRequestException('Email inválido');
    }
    this._value = email;
  }

  private sanitize(email: string): string {
    return email?.trim().toLowerCase();
  }

  private validate(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
}
