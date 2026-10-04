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

        item.pessoas.forEach(({ nome, quantidadeConsumida }) => {
          const quantidadeDaPessoa =
            quantidadeConsumida ?? item.quantidade / item.pessoas.length;
          if (quantidadeDaPessoa <= 0) return;

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

          const valorDaPessoa =
            item.quantidade > 0
              ? item.valorTotal * (quantidadeDaPessoa / item.quantidade)
              : 0;

          pessoa.itens.push({
            id: item.id || 0,
            descricao: item.descricao,
            quantidade: quantidadeDaPessoa,
            valor: valorDaPessoa,
          });

          pessoa.subtotal += valorDaPessoa;
        });
      });

      // Calcula os 10% do garçom, caso exista
      resultado.forEach((pessoa) => {
        pessoa.taxaServicoGarcom =
          pessoa.subtotal * (comanda.taxaServicoGarcom / 100);

        pessoa.total = pessoa.subtotal + pessoa.taxaServicoGarcom;
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
        mensagem += `• ${item.quantidade} x ${item.descricao}: ${NumberUtil.formatarValor(item.valor)}\n`;
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
