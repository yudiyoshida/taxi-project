import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { StringToNumber } from 'src/shared/validators/custom-transformers/string-to-number';
import { Trim } from 'src/shared/validators/custom-transformers/trim';

export class RequestRideInputDto {
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  @Trim()
  passengerId: string;

  @IsNumber({}, { message: '$property deve ser um número' })
  @Min(-90, { message: '$property deve ser maior que -90' })
  @Max(90, { message: '$property deve ser menor que 90' })
  @StringToNumber()
  fromLat: number;

  @IsNumber({}, { message: '$property deve ser um número' })
  @Min(-180, { message: '$property deve ser maior que -180' })
  @Max(180, { message: '$property deve ser menor que 180' })
  @StringToNumber()
  fromLng: number;

  @IsNumber({}, { message: '$property deve ser um número' })
  @Min(-90, { message: '$property deve ser maior que -90' })
  @Max(90, { message: '$property deve ser menor que 90' })
  @StringToNumber()
  toLat: number;

  @IsNumber({}, { message: '$property deve ser um número' })
  @Min(-180, { message: '$property deve ser maior que -180' })
  @Max(180, { message: '$property deve ser menor que 180' })
  @StringToNumber()
  toLng: number;
}

export class RequestRideOutputDto {
  id: string;
}
