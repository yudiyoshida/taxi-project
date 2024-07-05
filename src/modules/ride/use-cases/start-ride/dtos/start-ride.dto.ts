import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'src/shared/validators/custom-transformers/trim';

// TODO: criar testes.
export class StartRideInputDto {
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  @Trim()
  accountId: string;
}
