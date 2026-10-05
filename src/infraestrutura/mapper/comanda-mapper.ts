import { ComandaDTO } from "@Infra-dto/comanda-dto";
import { ComandaModelo } from "@Infra-modelo/comanda-modelo";
import { DataUtil } from "src/core/utils/data-util";

export class ComandaMapper {
  static toComanda(dto: ComandaDTO) {
    var modelo = new ComandaModelo();
    modelo.finalizadaEm = new Date().toISOString();
    modelo.criadoEm = new Date().toISOString();
    modelo.mesa = dto.mesa;
    modelo.status = "FINALIZADA";
    modelo.total = dto.total;
    modelo.subtotal = dto.subtotal;
    modelo.id = dto.id || 0;
    return modelo;
  }
  static toDTOs(modelos?: ComandaModelo[]) {
    if (!modelos) return [];
    return modelos.map(this.toDTO);
  }

  static toDTO(modelo: ComandaModelo) {
    var dto = new ComandaDTO();
    dto.finalizadaEm = DataUtil.formatar(modelo.finalizadaEm) || "";
    dto.criadoEm = DataUtil.formatar(modelo.criadoEm) || "";
    dto.mesa = modelo.mesa;
    dto.status = modelo.status;
    dto.total = modelo.total;
    dto.subtotal = modelo.subtotal;
    dto.id = modelo.id;
    dto.taxaServicoGarcom = 10;
    return dto;
  }
}
