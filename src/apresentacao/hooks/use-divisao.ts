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

      // Calcula a taxa configurada do garcom, caso exista
      resultado.forEach((pessoa) => {
        pessoa.taxaServicoGarcom =
          pessoa.subtotal * (comanda.taxaServicoGarcom / 100);

        if (comanda.taxaServicoGarcom > 0) {
          pessoa.itens.push({
            id: -1,
            descricao: `Taxa de serviço do garçom (${comanda.taxaServicoGarcom}%)`,
            quantidade: 1,
            valor: pessoa.taxaServicoGarcom,
          });
        }

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

    const separador = "────────────────────";
    const linhas = [
      "🍽️ RACHA CONTA",
      `Mesa: ${comanda.mesa}`,
      `Total da conta: ${NumberUtil.formatarValor(comanda.total)}`,
      "",
      "👥 DIVISÃO POR PESSOA",
      separador,
    ];

    divisao.forEach((pessoa) => {
      linhas.push(`👤 ${pessoa.nome}`);

      pessoa.itens
        .filter((item) => item.id !== -1)
        .forEach((item) => {
          const quantidade = item.quantidade.toLocaleString("pt-BR", {
            maximumFractionDigits: 4,
          });
          linhas.push(
            `  • ${quantidade} × ${item.descricao} — ${NumberUtil.formatarValor(item.valor)}`,
          );
        });

      linhas.push(`Subtotal: ${NumberUtil.formatarValor(pessoa.subtotal)}`);

      if (comanda.taxaServicoGarcom > 0) {
        linhas.push(
          `Taxa do garçom (${comanda.taxaServicoGarcom}%): ${NumberUtil.formatarValor(pessoa.taxaServicoGarcom)}`,
        );
      }

      linhas.push(`✅ Total a pagar: ${NumberUtil.formatarValor(pessoa.total)}`);
      linhas.push(separador);
    });

    const mensagem = linhas.join("\n");

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
