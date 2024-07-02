import { Account } from '../entities/account.entity';
import { AccountFactory } from './account.factory';

describe('Create static method', () => {
  it('should create a new instance of the entity', () => {
    // Arrange
    const props = {
      isPassenger: true,
      isDriver: false,
      name: 'John Doe',
      cpf: '123.456.789-09',
      email: 'jhondoe@email.com',
      password: '123456789',
      carPlate: null,
    };

    // Act
    const account = AccountFactory.create(props);

    // Assert
    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBeDefined();
    expect(account.isPassenger).toBe(true);
    expect(account.isDriver).toBe(false);
    expect(account.name).toBe('John Doe');
    expect(account.cpf).toBe('12345678909');
    expect(account.email).toBe('jhondoe@email.com');
    expect(account.password).toBe('123456789');
    expect(account.carPlate).toBe(null);
  });
});
