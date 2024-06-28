import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { Account } from 'src/modules/account/domain/entities/account.entity';
import { Errors } from 'src/shared/errors/error-message';
import { IAccountRepository } from '../../account-repository.interface';

@Injectable()
export class AccountPrismaAdapterRepository implements IAccountRepository {
  constructor(private prisma: PrismaService) {}

  public async findById(id: string): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException(Errors.ACCOUNT_NOT_FOUND);
    }
    return Account.load(account, account.id);
  }

  public async save(account: Account): Promise<void> {
    await this.prisma.account.create({
      data: {
        id: account.id,
        isPassenger: account.isPassenger,
        isDriver: account.isDriver,
        name: account.name,
        cpf: account.cpf,
        email: account.email,
        password: account.password,
        carPlate: account.carPlate,
      },
    });
  }
}
