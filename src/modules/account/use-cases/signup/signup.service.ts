import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Errors } from 'src/shared/errors/error-message';
import { AccountFactory } from '../../domain/factories/account.factory';
import { IAccountDAO } from '../../persistence/dao/account-dao.interface';
import { IAccountRepository } from '../../persistence/repositories/account-repository.interface';
import { SignupInputDto, SignupOutputDto } from './dtos/signup.dto';

@Injectable()
export class SignupUseCase {
  constructor(
    @Inject(TOKENS.IAccountRepository) private accountRepository: IAccountRepository,
    @Inject(TOKENS.IAccountDAO) private accountDao: IAccountDAO,
  ) {}

  public async execute(data: SignupInputDto): Promise<SignupOutputDto> {
    const accountExists = await this.accountDao.findByEmail(data.email);
    if (accountExists) {
      throw new ConflictException(Errors.EMAIL_ALREADY_IN_USE);
    }

    const account = AccountFactory.create(data);
    await this.accountRepository.save(account);

    return { id: account.id };
  }
}
