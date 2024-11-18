export class AccountDaoDto {
  id: string;
  isPassenger: boolean;
  isDriver: boolean;
  name: string;
  cpf: string;
  email: string;
  carPlate: string | null;
}
