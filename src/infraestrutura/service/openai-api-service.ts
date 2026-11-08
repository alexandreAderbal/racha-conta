import { ComandaDTO } from "@Infra-dto/comanda-dto";
import {
  API_CONSTANT,
  OPENAI_CONSTANT,
  PLAY_INTEGRITY_CONSTANT,
} from "@Constant";
import { PlayIntegrityService } from "./play-integrity-service";
import appConfig from "../../../app.json";
import { Alert } from "react-native";

export class OpenAIAPIService {
  private readonly playIntegrity = new PlayIntegrityService();

  constructor() {}

  async prepararPlayIntegrity(): Promise<void> {
    console.log("prepararPlayIntegrity");
    await this.playIntegrity.preparar();
  }

  async analisar(imagensBase64: string[]): Promise<ComandaDTO> {
    if (!imagensBase64.length) {
      throw new Error("Nenhuma imagem foi enviada.");
    }

    const corpoJson = JSON.stringify({
      imagensBase64,
      prompt: OPENAI_CONSTANT.COMANDA_PROMPT,
    });
    const tokenIntegridade = await this.playIntegrity.solicitarToken(corpoJson);
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      [PLAY_INTEGRITY_CONSTANT.PACKAGE_HEADER]: appConfig.expo.android.package,
    };

    if (tokenIntegridade) {
      headers[PLAY_INTEGRITY_CONSTANT.TOKEN_HEADER] = tokenIntegridade;
    }

    const response = await fetch(
      API_CONSTANT.COMANDA_ANALISE_URL.BASE +
        API_CONSTANT.COMANDA_ANALISE_URL.PATH_API_IA,
      {
        method: "POST",
        headers,
        body: corpoJson,
      },
    );

    if (!response.ok) {
      const detalhe = await response.text();
      throw new Error(
        detalhe || `A API retornou um erro (HTTP ${response.status}).`,
      );
    }

    try {
      var dados = await response.json();
    } catch (e) {
      const mensagem = e instanceof Error ? e.message : String(e);
      Alert.alert("Erro de conexão", mensagem);
      throw new Error(mensagem);
    }

    return JSON.parse(dados.resposta);
  }
}
