import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { StringToNumber } from 'src/shared/validators/custom-transformers/string-to-number';
import { Trim } from 'src/shared/validators/custom-transformers/trim';

export class UpdatePositionInputDto {
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  @Trim()
  rideId: string;

  @IsNumber({}, { message: '$property deve ser um número' })
  @StringToNumber()
  lat: number;

  @IsNumber({}, { message: '$property deve ser um número' })
  @StringToNumber()
  lng: number;
}

export class UpdatePositionOutputDto {
  id: string;
}
