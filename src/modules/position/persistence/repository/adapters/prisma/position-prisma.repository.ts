import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { Position } from 'src/modules/position/domain/entities/position.entity';
import { Errors } from 'src/shared/errors/error-message';
import { IPositionRepository } from '../../position-repository.interface';

@Injectable()
export class PositionPrismaAdapterRepository implements IPositionRepository {
  constructor(private prisma: PrismaService) {}

  async findLastPositionByRideId(rideId: string): Promise<Position|null> {
    const position = await this.prisma.position.findMany({
      where: { rideId },
      orderBy: { date: 'desc' },
      take: 1,
    });

    if (!position.length) {
      return null;
    }

    return new Position({
      id: position[0].id,
      rideId: position[0].rideId,
      lat: position[0].lat,
      lng: position[0].lng,
      date: position[0].date,
    });
  }

  async findById(id: string): Promise<Position> {
    const position = await this.prisma.position.findUnique({
      where: { id },
    });

    if (!position) {
      throw new NotFoundException(Errors.POSITION_NOT_FOUND);
    }

    return new Position({
      id: position.id,
      rideId: position.rideId,
      lat: position.lat,
      lng: position.lng,
      date: position.date,
    });
  }

  async save(position: Position): Promise<void> {
    await this.prisma.position.create({
      data: {
        id: position.id,
        rideId: position.rideId,
        lat: position.lat,
        lng: position.lng,
        date: position.date,
      },
    });
  }
}
