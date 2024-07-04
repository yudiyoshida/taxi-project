import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { Ride } from 'src/modules/ride/domain/entities/ride.entity';
import { RideFactory } from 'src/modules/ride/domain/factories/ride.factory';
import { Errors } from 'src/shared/errors/error-message';
import { IRideRepository } from '../../ride-repository.interface';

@Injectable()
export class RidePrismaAdapterRepository implements IRideRepository {
  constructor(private prisma: PrismaService) {}

  public async findById(id: string): Promise<Ride> {
    const ride = await this.prisma.ride.findUnique({
      where: { id },
    });

    if (!ride) {
      throw new NotFoundException(Errors.RIDE_NOT_FOUND);
    }
    return RideFactory.load(ride, ride.id);
  }

  public async save(ride: Ride): Promise<void> {
    await this.prisma.ride.create({
      data: {
        id: ride.id,
        passengerId: ride.passengerId,
        fromLat: ride.from.lat,
        fromLng: ride.from.lng,
        toLat: ride.to.lat,
        toLng: ride.to.lng,
        driverId: ride.driverId,
        status: ride.status,
        fare: ride.fare,
        date: ride.date,
      },
    });
  }

  public async edit(ride: Ride): Promise<void> {
    await this.prisma.ride.update({
      where: { id: ride.id },
      data: {
        fromLat: ride.from.lat,
        fromLng: ride.from.lng,
        toLat: ride.to.lat,
        toLng: ride.to.lng,
        driverId: ride.driverId,
        status: ride.status,
        fare: ride.fare,
        date: ride.date,
      },
    });
  }
}
