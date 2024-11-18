import { IsBoolean, IsNotEmpty, IsString, MinLength, ValidateIf } from 'class-validator';
import { Trim } from 'src/shared/validators/custom-transformers/trim';

export class SignupInputDto {
  @IsBoolean({ message: '$property deve ser do tipo booleano' })
  isPassenger: boolean;

  @IsBoolean({ message: '$property deve ser do tipo booleano' })
  isDriver: boolean;

  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  @Trim()
  name: string;

  @IsString({ message: '$property deve ser do tipo texto' })
  cpf: string;

  @IsString({ message: '$property deve ser do tipo texto' })
  email: string;

  @IsString({ message: '$property deve ser do tipo texto' })
  @MinLength(8, { message: '$property deve ter no mínimo 8 caracteres' })
  @Trim()
  password: string;

  @ValidateIf((object) => object.isDriver)
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  @Trim()
  carPlate: string | null;
}

export class SignupOutputDto {
  id: string;
}
