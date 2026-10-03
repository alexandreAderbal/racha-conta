import { ItemRepository } from "@Infra-repositorio/item-repositorio";
import { ItemMapper } from "../mapper/item-mapper";
import { ItemDTO } from "@Infra-dto/item-dto";

export class ItemService {
  private repositorio: ItemRepository;

  constructor() {
    this.repositorio = new ItemRepository();
  }

  async buscarOrSalvar(
    dto: ItemDTO,
    idComanda: number,
  ): Promise<number> {
    if (dto.id != null) {
      const item = await this.repositorio.buscarPorCampos({
        id: dto.id,
        idComanda,
      });

      if (item?.id != null) return item.id;
    }

    return this.salvar(dto, idComanda);
  }

  async salvar(dto: ItemDTO, idComanda: number): Promise<number> {
    const modelo = ItemMapper.toModelo(dto, idComanda);
    return this.repositorio.inserir(modelo);
  }

  async buscarPorIdComanda(idComanda: number): Promise<ItemDTO[] | []> {
    try {
      const itens = await this.repositorio.buscarTodosPorCampo(
        "idComanda",
        idComanda,
      );
      return ItemMapper.toDTOs(itens);
    } catch (error) {
      console.error(
        "Erro ao buscar os item(s) da comanda : " + idComanda,
        error,
      );
      return [];
    }
  }
}
