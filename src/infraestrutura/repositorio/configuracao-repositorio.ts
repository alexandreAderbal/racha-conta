import { ConfiguracaoModelo } from "@Infra-modelo/configuracao-modelo";
import { RepositorioBase } from "./repositorio-base";

export class ConfiguracaoRepository extends RepositorioBase<ConfiguracaoModelo> {
  protected tabela = "configuracoes";
}
