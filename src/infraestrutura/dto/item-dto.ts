import { PessoaDTO } from "./pessoa-dto";

export class ItemDTO {
  id?: number | null;
  descricao!: string;
  quantidade!: number;
  valorUnitario!: number;
  valorTotal!: number;
  pessoas!: PessoaDTO[];
}
