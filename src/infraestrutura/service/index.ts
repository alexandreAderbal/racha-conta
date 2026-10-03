import { ComandaService } from "./comanda-service";
import { OpenAIService } from "./openai-service";

export const SERVICE = {
  openAIService: new OpenAIService(),
  comanda: new ComandaService(),
};
