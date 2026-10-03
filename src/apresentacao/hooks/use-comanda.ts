import { useAppDispatch, useAppSelector } from "@Store/hooks";
import { ComandaDTO } from "@Infra-dto/comanda-dto";
import { PessoaDTO } from "@Infra-dto/pessoa-dto";
import {
  atualizaComandaItemPessoas,
  atualizarComanda,
  atualizarPessoas,
  removerSelecionarPessoas,
  selecionarPessoa,
  selecionarPessoas,
} from "@Store/slices/comanda-slice";
import { useSpinner } from "./use-spinner";
import { SERVICE } from "@Infra-service";

export function useComanda() {
  const { comanda, pessoas } = useAppSelector((state) => state.comandaReducer);
  const { ativarSpinner, desativarSpinner } = useSpinner();
  const dispatch = useAppDispatch();

  const adicionarComanda = (comanda: ComandaDTO) => {
    dispatch(atualizarComanda(comanda));
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

  const limparPessoasMarcadas = (pessoas: PessoaDTO[]) => {
    dispatch(removerSelecionarPessoas());
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
    limparPessoasMarcadas,
    comanda,
    pessoas,
    salvarComanda,
  };
}
