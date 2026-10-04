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
      const quantidadeAtribuida = item.pessoas.reduce(
        (total, p) => total + (p.quantidadeConsumida ?? 0),
        0,
      );
      const primeiraQuantidade = item.pessoas[0]?.quantidadeConsumida ?? 0;
      const quantidadesIguais =
        item.pessoas.length === 0 ||
        (Math.abs(quantidadeAtribuida - item.quantidade) < 0.00001 &&
          item.pessoas.every(
            (p) =>
              Math.abs(
                (p.quantidadeConsumida ?? 0) - primeiraQuantidade,
              ) < 0.00001,
          ));

      if (pessoaJaExiste) {
        item.pessoas = item.pessoas.filter((p) => p.nome !== pessoa.nome);
      } else {
        item.pessoas.push({
          ...pessoa,
          quantidadeConsumida: Math.max(
            0,
            item.quantidade - quantidadeAtribuida,
          ),
        });
      }

      if (quantidadesIguais) {
        const quantidadePorPessoa = item.pessoas.length
          ? item.quantidade / item.pessoas.length
          : 0;
        item.pessoas = item.pessoas.map((p) => ({
          ...p,
          quantidadeConsumida: quantidadePorPessoa,
        }));
      }

      state.pessoas = state.pessoas.map((p) =>
        p.nome === pessoa.nome
          ? { ...p, selecionado: !pessoaJaExiste }
          : p,
      );
    },
    atualizarQuantidadePessoaItem(
      state,
      action: PayloadAction<{
        descricao: string;
        nome: string;
        quantidadeConsumida: number;
      }>,
    ) {
      const { descricao, nome, quantidadeConsumida } = action.payload;
      const item = state.comanda?.itens.find(
        (item) => item.descricao === descricao,
      );
      const pessoa = item?.pessoas.find((p) => p.nome === nome);
      if (!item || !pessoa) return;

      const quantidadeDeOutrasPessoas = item.pessoas.reduce(
        (total, p) =>
          total + (p.nome === nome ? 0 : p.quantidadeConsumida || 0),
        0,
      );
      const quantidadeAtualizada = Math.min(
        Math.max(0, quantidadeConsumida),
        item.quantidade,
      );
      const quantidadeMaximaDasOutras = Math.max(
        0,
        item.quantidade - quantidadeAtualizada,
      );

      if (
        quantidadeDeOutrasPessoas > quantidadeMaximaDasOutras &&
        quantidadeDeOutrasPessoas > 0
      ) {
        const fatorReducao =
          quantidadeMaximaDasOutras / quantidadeDeOutrasPessoas;
        item.pessoas = item.pessoas.map((p) =>
          p.nome === nome
            ? { ...p, quantidadeConsumida: quantidadeAtualizada }
            : {
                ...p,
                quantidadeConsumida:
                  (p.quantidadeConsumida ?? 0) * fatorReducao,
              },
        );
      } else {
        pessoa.quantidadeConsumida = quantidadeAtualizada;
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
  atualizarQuantidadePessoaItem,
  limparLimpar,
  atualizarPessoas,
} = ComandaSlice.actions;

export default ComandaSlice.reducer;
