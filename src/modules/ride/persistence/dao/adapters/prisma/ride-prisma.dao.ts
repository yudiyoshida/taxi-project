import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { IRideDAO, RideDaoDto, RideWhereInput } from '../../ride-dao.interface';

const rideSelect = {
  id: true,
  passengerId: true,
  driverId: true,
  date: true,
  fare: true,
  status: true,
  fromLat: true,
  fromLng: true,
  toLat: true,
  toLng: true,
} satisfies Prisma.RideSelect;

@Injectable()
export class RidePrismaAdapterDAO implements IRideDAO {
  constructor(private prisma: PrismaService) {}

  private whereBuilder(fields: RideWhereInput) {
    const where: Prisma.RideWhereInput = {};

    if (fields.date) where.date = fields.date;
    if (fields.driverId) where.driverId = fields.driverId;
    if (fields.passengerId) where.passengerId = fields.passengerId;
    if (fields.status) where.status = { in: fields.status };

    return where;
  }

  public async findBy(fields: RideWhereInput): Promise<RideDaoDto[]> {
    const where = this.whereBuilder(fields);

    return this.prisma.ride.findMany({
      where,
      select: rideSelect,
    });
  }

  public async findById(id: string): Promise<RideDaoDto|null> {
    return this.prisma.ride.findUnique({
      where: { id },
      select: rideSelect,
    });
  }
}
