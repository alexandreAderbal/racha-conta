import { ItemDTO } from "@Infra-dto/item-dto";
import { ItemModelo } from "@Infra-modelo/item-modelo";

export class ItemMapper {
  static toModelo(dto: ItemDTO, idComanda?: number) {
    var modelo = new ItemModelo();
    modelo.idComanda = idComanda || 0;
    modelo.quantidade = dto.quantidade;
    modelo.valorTotal = dto.valorTotal;
    modelo.descricao = dto.descricao;
    modelo.valorUnitario = dto.valorUnitario;
    return modelo;
  }

  static toDTOs(modelos?: ItemModelo[]) {
    if (!modelos) return [];
    return modelos.map(this.toDTO);
  }

  static toDTO(modelo: ItemModelo) {
    var dto = new ItemDTO();
    dto.id = modelo.id;
    dto.quantidade = modelo.quantidade;
    dto.valorTotal = modelo.valorTotal;
    dto.descricao = modelo.descricao;
    dto.valorUnitario = modelo.valorUnitario;
    return dto;
  }
}
