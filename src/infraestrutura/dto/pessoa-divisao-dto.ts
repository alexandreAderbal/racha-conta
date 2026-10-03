import { ItemDivisaoDTO } from "./item-divisao-dto";

export class PessoaDivisaoDTO {
  nome: string;
  itens: ItemDivisaoDTO[];
  subtotal: number;
  taxaServicoGarcom: number;
  total: number;

  constructor(
    nome: string,
    itens: ItemDivisaoDTO[] = [],
    subtotal: number = 0,
    taxaServicoGarcom: number = 0,
    total: number = 0,
  ) {
    this.nome = nome;
    this.itens = itens;
    this.subtotal = subtotal;
    this.taxaServicoGarcom = taxaServicoGarcom;
    this.total = total;
  }
}
