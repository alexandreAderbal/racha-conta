import { PessoaDTO } from "./pessoa-dto";

export class ItemDTO {
  id?: number | null;
  identificador!: string;
  descricao!: string;
  quantidade!: number;
  valorUnitario!: number;
  valorTotal!: number;
  pessoas!: PessoaDTO[];
}
