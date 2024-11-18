export class RideDaoDto {
  id: string;
  date: Date;
  fare: number | null;
  status: string;
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  passengerId: string;
  driverId: string | null;
  distance: number;
}
