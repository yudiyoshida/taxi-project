import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/infra/ioc/token';
import { Account } from '../../domain/entities/account.entity';
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
      throw new ConflictException('O email informado já está sendo utilizado.');
    }

    const account = Account.create(data);
    await this.accountRepository.save(account);

    return { id: account.id };
  }
}
