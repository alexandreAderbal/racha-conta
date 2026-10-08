import { useSpinner } from "src/apresentacao/hooks/use-spinner";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useComanda } from "./use-comanda";

export function useSelecionarArquivos() {
  const { ativarSpinner, desativarSpinner } = useSpinner();
  const { processarOpenAi, limparPessoas } = useComanda();
  const navigation = useNavigation<any>();

  async function selecionarArquivos() {
    try {
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        console.log("Permissão negada");
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (resultado.canceled || !resultado.assets) {
        return [];
      }

      const arquivos: string[] = resultado.assets.map(
        (arquivo: any) => arquivo.uri,
      );

      if (arquivos.length === 0) {
        return;
      }
      await processaImagens(arquivos);
    } catch (error) {
      console.error("Erro ao selecionar arquivos:", error);
    }
  }

  async function processaImagens(arquivos: string[]) {
    try {
      ativarSpinner();

      const imagensBase64 = await arquivosParaBase64(arquivos);
      const processado = await processarOpenAi(imagensBase64);
      if (!processado) return;

      limparPessoas();
      navigation.navigate("Comanda");
    } catch (error) {
      console.error("Erro ao selecionar arquivos:", error);
    } finally {
      desativarSpinner();
    }
  }
  async function arquivosParaBase64(arquivos: string[]): Promise<string[]> {
    return Promise.all(
      arquivos.map(async (arquivo) => {
        const file = new FileSystem.File(arquivo);
        return await file.base64();
      }),
    );
  }

  return { selecionarArquivos };
}
