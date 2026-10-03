import { PessoaRepository } from "@Infra-repositorio/pessoa-repositorio";
import { PessoaMapper } from "../mapper/pessoa-mapper";
import { PessoaDTO } from "@Infra-dto/pessoa-dto";

export class PessoaService {
  private repositorio: PessoaRepository;

  constructor() {
    this.repositorio = new PessoaRepository();
  }

  async buscarOrSalvar(
    dto: PessoaDTO,
    idComanda: number,
  ): Promise<number> {
    if (dto.id != null) {
      const pessoaPorId = await this.repositorio.buscarPorCampos({
        id: dto.id,
        idComanda,
      });

      if (pessoaPorId?.id != null) return pessoaPorId.id;
    }

    const pessoaPorNome = await this.repositorio.buscarPorCampos({
      nome: dto.nome,
      idComanda,
    });

    if (pessoaPorNome?.id != null) return pessoaPorNome.id;

    return this.salvar(dto, idComanda);
  }

  async salvar(
    dto: PessoaDTO,
    idComanda: number,
  ): Promise<number> {
    const modelo = PessoaMapper.toModelo(dto, idComanda);
    return this.repositorio.inserir(modelo);
  }

  async buscarPorItemComanda(
    idItem: number,
    idComanda: number,
  ): Promise<PessoaDTO[] | []> {
    try {
      return await this.repositorio.buscarPorItemComanda(idItem, idComanda);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
      return [];
    }
  }
}
