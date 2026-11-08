import { ComandaService } from "./comanda-service";
import { ConfiguracaoService } from "./configuracao-service";
import { OpenAIAPIService } from "./openai-api-service";

export const SERVICE = {
  comanda: new ComandaService(),
  configuracao: new ConfiguracaoService(),
  openAIAPIService: new OpenAIAPIService(),
};
