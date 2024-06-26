import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { AccountDaoDto, IAccountDAO } from '../../persistence/dao/account-dao.interface';

@Injectable()
export class GetAccountByIdUseCase {
  constructor(
    @Inject(TOKENS.IAccountDAO) private accountDao: IAccountDAO
  ) {}

  public async execute(id: string): Promise<AccountDaoDto> {
    const account = await this.accountDao.findById(id);

    if (!account) {
      throw new NotFoundException(Errors.ACCOUNT_NOT_FOUND);
    }
    return account;
  }
}
