import { ConfiguracaoRepository } from "@Infra-repositorio/configuracao-repositorio";
import { ConfiguracaoModelo } from "@Infra-modelo/configuracao-modelo";

export class ConfiguracaoService {
  private repositorio: ConfiguracaoRepository;

  constructor() {
    this.repositorio = new ConfiguracaoRepository();
  }

  async salvar(chave: string, valor: string): Promise<void> {
    const exite = await this.repositorio.buscarPorCampos({ chave });
    console.log(exite);
    if (exite?.id) {
      this.repositorio.atualizar(exite.id, { ...exite, valor: valor });
    } else {
      const modelo = new ConfiguracaoModelo();
      modelo.chave = chave;
      modelo.valor = valor;
      this.repositorio.inserir(modelo);
    }
  }

  async buscarValorPorChave(chave: string): Promise<string> {
    var modelo = await this.repositorio.buscarPorCampos({ chave });
    return modelo?.valor || "";
  }
}
