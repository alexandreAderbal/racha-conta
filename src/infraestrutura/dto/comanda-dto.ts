import { ItemDTO } from "./item-dto";

export class ComandaDTO {
  id?: number | null;
  criadoEm?: string;
  atualizadoEm?: string;
  mesa!: string;
  total!: number;
  subtotal!: number;
  taxaServicoGarcom!: number;
  status!: "EM_ANDAMENTO" | "FINALIZADA";
  finalizadaEm?: string;
  itens!: ItemDTO[];
  quantidadePessoas?: number;
}
