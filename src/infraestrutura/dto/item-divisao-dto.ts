export class ItemDivisaoDTO {
  id: number;
  descricao: string;
  quantidade: number;
  valor: number;

  constructor(
    id: number,
    descricao: string,
    quantidade: number,
    valor: number,
  ) {
    this.id = id;
    this.descricao = descricao;
    this.quantidade = quantidade;
    this.valor = valor;
  }
}
