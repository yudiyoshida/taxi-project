import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StringToNumber } from 'src/shared/validators/custom-transformers/string-to-number';
import { Trim } from 'src/shared/validators/custom-transformers/trim';

export class RequestRideInputDto {
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  @Trim()
  passengerId: string;

  @IsNumber({}, { message: '$property deve ser um número' })
  @StringToNumber()
  fromLat: number;

  @IsNumber({}, { message: '$property deve ser um número' })
  @StringToNumber()
  fromLng: number;

  @IsNumber({}, { message: '$property deve ser um número' })
  @StringToNumber()
  toLat: number;

  @IsNumber({}, { message: '$property deve ser um número' })
  @StringToNumber()
  toLng: number;
}

export class RequestRideOutputDto {
  id: string;
}
