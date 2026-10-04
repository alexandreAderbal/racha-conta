import { ComandaRepository } from "@Infra-repositorio/comanda-repositorio";
import { ItemPessoaService } from "./item-pessoa-service";
import { ComandaMapper } from "../mapper/comanda-mapper";
import { ComandaDTO } from "@Infra-dto/comanda-dto";
import { PessoaService } from "./pessoa-service";
import { ItemService } from "./item-service";
import { dbPromise } from "@Infra-data-base/index";

export class ComandaService {
  private repositorio: ComandaRepository;
  private pessoaService: PessoaService;
  private itemService: ItemService;
  private itemPessoaService: ItemPessoaService;

  constructor() {
    this.repositorio = new ComandaRepository();
    this.pessoaService = new PessoaService();
    this.itemService = new ItemService();
    this.itemPessoaService = new ItemPessoaService();
  }

  async salvar(dto: ComandaDTO): Promise<number | null> {
    try {
      const db = await dbPromise;
      let idComandaSalva: number | null = null;

      await db.withTransactionAsync(async () => {
        const comanda = ComandaMapper.toComanda(dto);
        const idComanda = await this.repositorio.inserir(comanda);

        for (const item of dto.itens) {
          // O ID do item reconhecido pela foto não é um ID do SQLite.
          const idItem = await this.itemService.salvar(item, idComanda);
          const pessoas = item.pessoas || [];

          for (const pessoa of pessoas) {
            const idPessoa = await this.pessoaService.buscarOrSalvar(
              pessoa,
              idComanda,
            );
            await this.itemPessoaService.salvar(
              idItem,
              idPessoa,
              pessoa.quantidadeConsumida ??
                item.quantidade / Math.max(pessoas.length, 1),
            );
          }
        }

        idComandaSalva = idComanda;
      });

      return idComandaSalva;
    } catch (error) {
      console.error("Erro ao salvar comanda:", error);
      return null;
    }
  }

  async buscarTodas(): Promise<ComandaDTO[]> {
    try {
      var teste = await this.repositorio.listar();
      return await this.repositorio.buscarTodos();
    } catch (error) {
      console.error("Erro ao buscar as comandas:", error);
      return [];
    }
  }

  async buscarComanda(idComanda: number): Promise<ComandaDTO | null> {
    try {
      var comanda = await this.repositorio.buscarPorId(idComanda);
      if (comanda == null) return null;
      var comandaDTO = ComandaMapper.toDTO(comanda);

      comandaDTO.itens = await this.itemService.buscarPorIdComanda(idComanda);

      for (let i = 0; i < comandaDTO.itens.length; i++) {
        const item = comandaDTO.itens[i];
        if (!item.id) {
          continue;
        }
        const pessoas = await this.pessoaService.buscarPorItemComanda(
          item.id,
          idComanda,
        );
        item.pessoas = pessoas;
      }

      return comandaDTO;
    } catch (error) {
      console.error("Erro ao buscar as comandas:", error);
      return null;
    }
  }
}
