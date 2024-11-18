import { Email } from './email.vo';

describe('Email Value Object', () => {
  it.each(
    [
      null,
      undefined,
      '',
      '             ',
      'invalid-email',
      'invalid@email@com',
    ]
  )('should throw an error when providing invalid email', (email: string) => {
    expect(() => new Email(email)).toThrow('Email inválido');
  });

  it('should create an email value object', () => {
    const email = new Email('   vAlID@emAIL.cOM   ');

    expect(email).toBeInstanceOf(Email);
    expect(email.value).toBe('valid@email.com');
  });
});
