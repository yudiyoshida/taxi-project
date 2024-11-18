import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { FindByIdResponse, IAccountGateway, SignupRequest, SignupResponse } from '../../account-gateway.interface';

@Injectable()
export class AccountAxiosAdapterGateway implements IAccountGateway {
  private baseUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpService) {}

  async findPassengerById(id: string): Promise<FindByIdResponse> {
    const response = await lastValueFrom(
      this.http.get(`${this.baseUrl}/passengers/${id}`).pipe(
        map((response) => response),
        catchError((error) => {
          throw error;
        })
      )
    );

    return response.data;
  }

  async findDriverById(id: string): Promise<FindByIdResponse> {
    const response = await lastValueFrom(
      this.http.get(`${this.baseUrl}/drivers/${id}`).pipe(
        map((response) => response),
        catchError((error) => {
          throw error;
        })
      )
    );

    return response.data;
  }

  async signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await lastValueFrom(
      this.http.post(`${this.baseUrl}`, data)
    );

    return response.data;
  }
}
