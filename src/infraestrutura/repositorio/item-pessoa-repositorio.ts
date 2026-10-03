import { RepositorioBase } from "./repositorio-base";
import { ItemPessoaModelo } from "@Infra-modelo/item-pessoa-modelo";

export class ItemPessoaRepository extends RepositorioBase<ItemPessoaModelo> {
  protected tabela = "item_pessoas";
}
