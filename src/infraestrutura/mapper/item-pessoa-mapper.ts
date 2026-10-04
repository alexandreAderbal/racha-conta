import { ItemPessoaModelo } from "@Infra-modelo/item-pessoa-modelo";

export class ItemPessoaMapper {
  static toModelo(
    idItem?: number,
    idPessoa?: number,
    quantidadeConsumida = 1,
  ) {
    var modelo = new ItemPessoaModelo();
    modelo.idItem = idItem || 0;
    modelo.idPessoa = idPessoa || 0;
    modelo.quantidadeConsumida = quantidadeConsumida;
    return modelo;
  }
}
