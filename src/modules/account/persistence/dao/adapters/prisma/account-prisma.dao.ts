import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { AccountDaoDto, IAccountDAO } from '../../account-dao.interface';

const accountSelect = {
  id: true,
  isPassenger: true,
  isDriver: true,
  name: true,
  cpf: true,
  email: true,
  carPlate: true,
} satisfies Prisma.AccountSelect;

@Injectable()
export class AccountPrismaAdapterDAO implements IAccountDAO {
  constructor(private prisma: PrismaService) {}

  public async findById(id: string): Promise<AccountDaoDto|null> {
    return this.prisma.account.findUnique({
      where: { id },
      select: accountSelect,
    });
  }

  public async findByEmail(email: string): Promise<AccountDaoDto|null> {
    return this.prisma.account.findUnique({
      where: { email },
      select: accountSelect,
    });
  }
}
