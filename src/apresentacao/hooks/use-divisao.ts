import { PessoaDivisaoDTO } from "@Infra-dto/pessoa-divisao-dto";
import { NumberUtil } from "src/core/utils/number-util";
import { ComandaDTO } from "@Infra-dto/comanda-dto";
import { useSpinner } from "./use-spinner";
import { Share } from "react-native";
import { useState } from "react";

export function useDivisao() {
  const [divisao, setDivisao] = useState<PessoaDivisaoDTO[]>([]);
  const { ativarSpinner, desativarSpinner } = useSpinner();

  const dividirConta = (comanda: ComandaDTO) => {
    try {
      ativarSpinner("Dividindo a comanda");
      const resultado: PessoaDivisaoDTO[] = [];

      if (!comanda) return [];

      comanda.itens.forEach((item) => {
        // Item ainda não foi atribuído a ninguém
        if (!item.pessoas || item.pessoas.length === 0) {
          return [];
        }

        const quantidadePessoas = item.pessoas.length;

        // Divide o valor do item entre as pessoas
        const valorPorPessoa = item.valorTotal / quantidadePessoas;

        item.pessoas.forEach(({ nome }) => {
          let pessoa = resultado.find((p) => p.nome === nome);

          if (!pessoa) {
            pessoa = {
              nome,
              itens: [],
              subtotal: 0,
              taxaServicoGarcom: 0,
              total: 0,
            };

            resultado.push(pessoa);
          }

          pessoa.itens.push({
            id: item.id || 0,
            descricao: item.descricao,
            quantidade: item.quantidade,
            valor: valorPorPessoa,
          });

          pessoa.subtotal += valorPorPessoa;
        });
      });

      // Calcula os 10% do garçom, caso exista
      resultado.forEach((pessoa) => {
        pessoa.taxaServicoGarcom =
          pessoa.subtotal * (comanda.taxaServicoGarcom / 100);

        pessoa.total = pessoa.subtotal + comanda.taxaServicoGarcom;
      });

      setDivisao(resultado);
    } finally {
      desativarSpinner();
    }
  };

  const compartilharResultado = async (comanda: ComandaDTO) => {
    if (!comanda || divisao.length === 0) {
      return;
    }

    let mensagem = `🍽️ Racha Conta\n`;
    mensagem += `Mesa: ${comanda.mesa}\n`;
    mensagem += `Total da mesa: ${NumberUtil.formatarValor(comanda.total)}\n\n`;

    mensagem += `👥 DIVISÃO DA CONTA\n`;
    mensagem += `────────────────────\n\n`;

    divisao.forEach((pessoa) => {
      mensagem += `👤 ${pessoa.nome}\n`;

      pessoa.itens.forEach((item) => {
        mensagem += `• ${item.descricao}: ${NumberUtil.formatarValor(item.valor)}\n`;
      });

      mensagem += `\n`;
      mensagem += `💰 Total: ${NumberUtil.formatarValor(pessoa.total)}\n`;
      mensagem += `\n────────────────────\n\n`;
    });

    mensagem += `Total da mesa: ${NumberUtil.formatarValor(comanda.total)}`;

    try {
      await Share.share({
        message: mensagem,
      });
    } catch (error) {
      console.error("Erro ao compartilhar resultado:", error);
    }
  };

  return {
    compartilharResultado,
    dividirConta,
    divisao,
  };
}
