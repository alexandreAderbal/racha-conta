import { useAppDispatch, useAppSelector } from "@Store/hooks";
import { useAlerta } from "@Providers/alerta";
import { ComandaDTO } from "@Infra-dto/comanda-dto";
import { PessoaDTO } from "@Infra-dto/pessoa-dto";
import { useSpinner } from "./use-spinner";
import { SERVICE } from "@Infra-service";
import {
  atualizaComandaItemPessoas,
  atualizarComanda,
  atualizarQuantidadePessoaItem,
  atualizarPessoas,
  removerPessoa as removerPessoaAction,
  removerSelecionarPessoas,
  selecionarPessoa,
  selecionarPessoas,
  removerPessoas,
} from "@Store/slices/comanda-slice";

export function useComanda() {
  const { comanda, pessoas } = useAppSelector((state) => state.comandaReducer);
  const { mostrarAlerta } = useAlerta();
  const { ativarSpinner, desativarSpinner } = useSpinner();
  const dispatch = useAppDispatch();

  const processarOpenAi = async (base64: string[]): Promise<boolean> => {
    const dto = await SERVICE.openAIAPIService.analisar(base64);

    if (!dto.itens?.length) {
      mostrarAlerta({
        tipo: "aviso",
        titulo: "Nenhum item encontrado",
        mensagem:
          "Não identificamos itens nessa imagem. Tente novamente com uma foto mais nítida da comanda.",
      });
      return false;
    }

    adicionarComanda(dto);
    return true;
  };

  const adicionarComanda = async (dto: ComandaDTO) => {
    dispatch(atualizarComanda(dto));
  };

  const atualizarTaxaGarcom = (value: string) => {
    if (comanda)
      adicionarComanda({ ...comanda, taxaServicoGarcom: Number(value) });
  };

  const atualizarNomeMesa = (nome: string) => {
    if (comanda) adicionarComanda({ ...comanda, mesa: nome });
  };

  const adicionarPessoa = (pessoa: PessoaDTO, identificador: string) => {
    dispatch(atualizarPessoas(pessoa));
    dispatch(atualizaComandaItemPessoas({ pessoa, identificador }));
  };

  const marcarPessoa = (pessoa: PessoaDTO, identificador: string) => {
    dispatch(selecionarPessoa(pessoa));
    dispatch(atualizaComandaItemPessoas({ pessoa, identificador }));
  };

  const marcarPessoas = (pessoas: PessoaDTO[]) => {
    dispatch(selecionarPessoas(pessoas));
  };

  const removerPessoa = (nome: string) => {
    dispatch(removerPessoaAction(nome));
  };

  const atualizarQuantidadeConsumida = (
    identificador: string,
    nome: string,
    quantidadeConsumida: number,
  ) => {
    dispatch(
      atualizarQuantidadePessoaItem({
        identificador,
        nome,
        quantidadeConsumida,
      }),
    );
  };

  const limparPessoasMarcadas = (pessoas: PessoaDTO[]) => {
    dispatch(removerSelecionarPessoas());
  };

  const limparPessoas = () => {
    dispatch(removerPessoas());
  };

  const salvarComanda = async (dto: ComandaDTO) => {
    try {
      ativarSpinner("Salvando a divisão");
      if (!dto) return;
      const idComanda = await SERVICE.comanda.salvar(dto);
      if (!idComanda) return;
      adicionarComanda({
        ...dto,
        id: idComanda,
      });
    } finally {
      desativarSpinner();
    }
  };

  return {
    adicionarComanda,
    adicionarPessoa,
    marcarPessoa,
    marcarPessoas,
    removerPessoa,
    atualizarQuantidadeConsumida,
    limparPessoasMarcadas,
    atualizarTaxaGarcom,
    atualizarNomeMesa,
    limparPessoas,
    comanda,
    pessoas,
    salvarComanda,
    processarOpenAi,
  };
}
