import { Account } from '../entities/account.entity';
import { AccountFactory } from './account.factory';

describe('Create static method', () => {
  it('should create a new instance of the entity with correct props', () => {
    // Arrange
    const props = {
      isPassenger: true,
      isDriver: false,
      name: 'John Doe',
      cpf: '12345678909',
      email: 'jhondoe@email.com',
      password: '123456789',
      carPlate: null,
    };

    // Act
    const account = AccountFactory.create(props);

    // Assert
    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBeDefined();
    expect(account.isPassenger).toBe(props.isPassenger);
    expect(account.isDriver).toBe(props.isDriver);
    expect(account.name).toBe(props.name);
    expect(account.cpf).toBe(props.cpf);
    expect(account.email).toBe(props.email);
    expect(account.password).toBe(props.password);
    expect(account.carPlate).toBe(props.carPlate);
  });
});

describe('Load static method', () => {
  it('should load the account entity with correct props', () => {
    // Arrange
    const accountId = '123';
    const props = {
      isPassenger: true,
      isDriver: false,
      name: 'John Doe',
      cpf: '12345678909',
      email: 'jhondoe@email.com',
      password: '123456789',
      carPlate: null,
    };

    // Act
    const account = AccountFactory.load(props, accountId);

    // Assert
    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBe(accountId);
    expect(account.isPassenger).toBe(props.isPassenger);
    expect(account.isDriver).toBe(props.isDriver);
    expect(account.name).toBe(props.name);
    expect(account.cpf).toBe(props.cpf);
    expect(account.email).toBe(props.email);
    expect(account.password).toBe(props.password);
    expect(account.carPlate).toBe(props.carPlate);
  });
});
