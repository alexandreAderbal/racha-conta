import { ItemDTO } from "@Infra-dto/item-dto";
import { ItemModelo } from "@Infra-modelo/item-modelo";

export class ItemMapper {
  static toModelo(dto: ItemDTO, idComanda?: number) {
    var modelo = new ItemModelo();
    modelo.idComanda = idComanda || 0;
    modelo.identificador = dto.identificador;
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
    dto.identificador =
      modelo.identificador ||
      String(modelo.id ?? 0).padStart(8, "0").slice(-8);
    dto.quantidade = modelo.quantidade;
    dto.valorTotal = modelo.valorTotal;
    dto.descricao = modelo.descricao;
    dto.valorUnitario = modelo.valorUnitario;
    return dto;
  }
}
