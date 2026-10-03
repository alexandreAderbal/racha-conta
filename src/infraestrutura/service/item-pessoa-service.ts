import { ItemPessoaRepository } from "@Infra-repositorio/item-pessoa-repositorio";
import { ItemPessoaMapper } from "../mapper/item-pessoa-mapper";

export class ItemPessoaService {
  private repositorio: ItemPessoaRepository;

  constructor() {
    this.repositorio = new ItemPessoaRepository();
  }

  async salvar(
    idItem: number,
    idPessoa: number,
  ): Promise<number> {
    const modelo = ItemPessoaMapper.toModelo(idItem, idPessoa);
    return this.repositorio.inserir(modelo);
  }
}
