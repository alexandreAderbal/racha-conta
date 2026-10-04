import { useAppDispatch, useAppSelector } from "@Store/hooks";
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
  const { ativarSpinner, desativarSpinner } = useSpinner();
  const dispatch = useAppDispatch();

  const adicionarComanda = (comanda: ComandaDTO) => {
    dispatch(atualizarComanda(comanda));
  };

  const atualizarTaxaGarcom = (value: string) => {
    if (comanda)
      adicionarComanda({ ...comanda, taxaServicoGarcom: Number(value) });
  };

  const adicionarPessoa = (pessoa: PessoaDTO, descricao: string) => {
    dispatch(atualizarPessoas(pessoa));
    dispatch(atualizaComandaItemPessoas({ pessoa, descricao }));
  };

  const marcarPessoa = (pessoa: PessoaDTO, descricao: string) => {
    dispatch(selecionarPessoa(pessoa));
    dispatch(atualizaComandaItemPessoas({ pessoa, descricao }));
  };

  const marcarPessoas = (pessoas: PessoaDTO[]) => {
    dispatch(selecionarPessoas(pessoas));
  };

  const removerPessoa = (nome: string) => {
    dispatch(removerPessoaAction(nome));
  };

  const atualizarQuantidadeConsumida = (
    descricao: string,
    nome: string,
    quantidadeConsumida: number,
  ) => {
    dispatch(
      atualizarQuantidadePessoaItem({
        descricao,
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

  const salvarComanda = async () => {
    try {
      ativarSpinner("Salvando a divisão");
      if (!comanda) return;
      const idComanda = await SERVICE.comanda.salvar(comanda);
      if (!idComanda) return;
      adicionarComanda({
        ...comanda,
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
    limparPessoas,
    comanda,
    pessoas,
    salvarComanda,
  };
}
