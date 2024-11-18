export interface IAccountGateway {
  findPassengerById(id: string): Promise<FindByIdResponse>;
  findDriverById(id: string): Promise<FindByIdResponse>;
  signup(data: SignupRequest): Promise<SignupResponse>;
}

export class SignupRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  carPlate: string | null;
  isPassenger: boolean;
  isDriver: boolean;
}

export class SignupResponse {
  id: string;
}

export class FindByIdResponse {
  id: string;
  name: string;
  cpf: string;
  email: string;
  carPlate: string | null;
  isPassenger: boolean;
  isDriver: boolean;
}
