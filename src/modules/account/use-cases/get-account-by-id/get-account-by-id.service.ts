import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { IAccountDAO } from '../../persistence/dao/account-dao.interface';

@Injectable()
export class GetAccountByIdUseCase {
  constructor(
    @Inject(TOKENS.IAccountDAO) private accountDao: IAccountDAO
  ) {}

  public async execute(id: string) {
    const account = await this.accountDao.findById(id);

    if (!account) {
      throw new NotFoundException('Conta não encontrada na base de dados.');
    }
    return account;
  }
}
