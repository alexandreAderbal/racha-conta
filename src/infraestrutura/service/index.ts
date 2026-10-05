import { ComandaService } from "./comanda-service";
import { ConfiguracaoService } from "./configuracao-service";
import { OpenAIService } from "./openai-service";

export const SERVICE = {
  openAIService: new OpenAIService(),
  comanda: new ComandaService(),
  configuracao: new ConfiguracaoService(),
};
