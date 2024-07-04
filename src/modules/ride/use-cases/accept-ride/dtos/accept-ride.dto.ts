import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'src/shared/validators/custom-transformers/trim';

// TODO: melhoria - implementar login e aí pode apagar esse dto
// TODO: criar testes.
export class AcceptRideInputDto {
  @IsString({ message: '$property deve ser do tipo texto' })
  @IsNotEmpty({ message: '$property é um campo obrigatório' })
  @Trim()
  accountId: string;
}
