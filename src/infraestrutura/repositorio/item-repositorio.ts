import { ItemModelo } from "@Infra-modelo/item-modelo";
import { RepositorioBase } from "./repositorio-base";

export class ItemRepository extends RepositorioBase<ItemModelo> {
  protected tabela = "itens";
}
