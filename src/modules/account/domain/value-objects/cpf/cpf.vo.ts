import { BadRequestException } from '@nestjs/common';

const CPF_LENGTH = 11;

export class CPF {
  private readonly _value: string;

  constructor(cpf: string) {
    if (!this.validate(cpf)) {
      throw new BadRequestException('CPF inválido');
    }
    this._value = this.removePunctuation(cpf);
  }

  private validate(cpf: string): boolean {
    if (!cpf) return false;
    cpf = this.removePunctuation(cpf);

    if (cpf.length !== CPF_LENGTH) return false;
    if (this.allDigitsAreEqual(cpf)) return false;

    const firstDigit = this.calculateDigit(cpf, 9);
    if (firstDigit !== Number(cpf.substring(9, 10))) return false;

    const secondDigit = this.calculateDigit(cpf, 10);
    if (secondDigit !== Number(cpf.substring(10, 11))) return false;

    return true;
  }

  private removePunctuation(cpf: string): string {
    return cpf.replace(/[\s./-]*/gim, '');
  }

  private allDigitsAreEqual(cpf: string): boolean {
    return cpf.split('').every((digit) => digit === cpf[0]);
  }

  // https://www.macoratti.net/alg_cpf.htm
  private calculateDigit(cpf: string, length: number): number {
    let sum = 0;
    let rest = 0;

    for (let i = 1; i <= length; i++) {
      sum += Number(cpf.substring(i - 1, i)) * (length + 2 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;

    return rest;
  }

  public get value(): string {
    return this._value;
  }
}
