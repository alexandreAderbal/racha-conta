import { ComandaDTO } from "@Infra-dto/comanda-dto";
import { ENV, OPENAI_CONSTANT } from "@Constant";
import COMANDA from "@Mocks/comanda.json";
import OpenAI from "openai";

export class OpenAIService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: ENV.OPENAI_API_KEY,
    });
  }

  async analisar(imagensBase64: string[]): Promise<ComandaDTO> {
    if (__DEV__) return COMANDA as ComandaDTO;
    if (!imagensBase64.length) {
      throw new Error("Nenhuma imagem foi enviada.");
    }

    const imagens = imagensBase64.map((imagemBase64: any) => ({
      type: "input_image" as const,
      image_url: `data:image/jpeg;base64,${imagemBase64}`,
      detail: "high" as const,
    }));

    const response = await this.openai.responses.create({
      model: OPENAI_CONSTANT.MODEL,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: OPENAI_CONSTANT.COMANDA_PROMPT,
            },
            ...imagens,
          ],
        },
      ],
    });

    const texto = response.output_text;

    if (!texto) {
      throw new Error("A OpenAI não retornou nenhum resultado.");
    }

    try {
      const resultado = JSON.parse(texto) as ComandaDTO;
      return resultado;
    } catch (error) {
      console.error("Erro ao interpretar resposta da OpenAI:", texto);
      throw new Error("A resposta da OpenAI não possui um JSON válido.");
    }
  }
}
