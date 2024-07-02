import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { Ride } from 'src/modules/ride/domain/entities/ride.entity';
import { IRideRepository } from '../../ride-repository.interface';

@Injectable()
export class RidePrismaAdapterRepository implements IRideRepository {
  constructor(private prisma: PrismaService) {}

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
}
