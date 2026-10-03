import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComandaDTO } from "@Infra-dto/comanda-dto";
import { PessoaDTO } from "@Infra-dto/pessoa-dto";

type ComandaState = {
  comanda: ComandaDTO | null;
  pessoas: PessoaDTO[];
};

const estadoInicial: ComandaState = {
  comanda: null,
  pessoas: [],
};

const ComandaSlice = createSlice({
  name: "comandaSlice",
  initialState: estadoInicial,

  reducers: {
    atualizarComanda(state, action: PayloadAction<ComandaDTO>) {
      state.comanda = action.payload;
    },
    limparLimpar(state, _) {
      state.comanda = null;
    },
    atualizarPessoas(state, action: PayloadAction<PessoaDTO>) {
      state.pessoas.push(action.payload);
    },
    selecionarPessoa(state, action: PayloadAction<PessoaDTO>) {
      state.pessoas = state.pessoas.map((p) =>
        p.nome === action.payload.nome
          ? {
              ...p,
              selecionado: !p.selecionado,
            }
          : p,
      );
    },
    atualizaComandaItemPessoas(
      state,
      action: PayloadAction<{ pessoa: PessoaDTO; descricao: string }>,
    ) {
      const { descricao, pessoa } = action.payload;
      const item = state.comanda?.itens.find(
        (item) => item.descricao === descricao,
      );
      if (!item) return;
      const pessoaJaExiste = item.pessoas.some((p) => p.nome === pessoa.nome);
      if (pessoaJaExiste) {
        item.pessoas = item.pessoas.filter((p) => p.nome !== pessoa.nome);
      } else {
        item.pessoas.push(pessoa);
      }
    },
    removerSelecionarPessoas(state) {
      state.pessoas = state.pessoas.map((p) => ({
        ...p,
        selecionado: !p.selecionado,
      }));
    },
    selecionarPessoas(state, action: PayloadAction<PessoaDTO[]>) {
      state.pessoas = state.pessoas.map((p) => {
        const existe = action.payload.some((s) => s.nome === p.nome);
        return { ...p, selecionado: existe };
      });
    },
  },
});

export const {
  atualizarComanda,
  selecionarPessoa,
  removerSelecionarPessoas,
  selecionarPessoas,
  atualizaComandaItemPessoas,
  limparLimpar,
  atualizarPessoas,
} = ComandaSlice.actions;

export default ComandaSlice.reducer;
