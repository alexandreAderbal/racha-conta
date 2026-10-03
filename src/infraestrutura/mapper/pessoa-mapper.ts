import { PessoaDTO } from "@Infra-dto/pessoa-dto";
import { PessoaModelo } from "@Infra-modelo/pessoa-modelo";

export class PessoaMapper {
  static toModelo(dto: PessoaDTO, idComanda?: number) {
    var modelo = new PessoaModelo();
    modelo.nome = dto.nome;
    modelo.idComanda = idComanda || 0;
    return modelo;
  }
}
