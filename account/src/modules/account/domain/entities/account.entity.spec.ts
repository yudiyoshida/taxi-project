import { createMock } from '@golevelup/ts-jest';
import { AccountPropsFactory } from '../factories/account.factory';
import { Account } from './account.entity';

describe('Account entity', () => {
  const data = createMock<AccountPropsFactory>({
    cpf: '12345678909',
    email: 'jhondoe@email.com',
  });

  describe('isPassengerRole method', () => {
    it('should return true when account is passenger', () => {
      // Act
      const account = new Account({ ...data, isPassenger: true });

      // Assert
      expect(account.isPassengerRole()).toBe(true);
    });

    it('should return false when account is not passenger', () => {
      // Act
      const account = new Account({ ...data, isPassenger: false });

      // Assert
      expect(account.isPassengerRole()).toBe(false);
    });
  });

  describe('isDriverRole method', () => {
    it('should return true when account is driver and has carPlate', () => {
      // Act
      const account = new Account({ ...data, isDriver: true, carPlate: 'ABC-1234' });

      // Assert
      expect(account.isDriverRole()).toBe(true);
    });

    it('should return false when account is driver but does not have carPlate', () => {
      // Act
      const account = new Account({ ...data, isDriver: true, carPlate: null });

      // Assert
      expect(account.isDriverRole()).toBe(false);
    });

    it('should return false when account is not driver', () => {
      // Act
      const account = new Account({ ...data, isDriver: false });

      // Assert
      expect(account.isDriverRole()).toBe(false);
    });
  });
});
