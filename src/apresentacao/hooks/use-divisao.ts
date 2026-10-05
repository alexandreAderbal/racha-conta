import { PessoaDivisaoDTO } from "@Infra-dto/pessoa-divisao-dto";
import { NumberUtil } from "src/core/utils/number-util";
import { useConfiguracao } from "./use-configuracao";
import { ComandaDTO } from "@Infra-dto/comanda-dto";
import { useComanda } from "./use-comanda";
import { useSpinner } from "./use-spinner";
import { Share } from "react-native";
import { useState } from "react";

export function useDivisao() {
  const [divisao, setDivisao] = useState<PessoaDivisaoDTO[]>([]);
  const [totalComanda, setTotalComanda] = useState<number>(0);
  const { ativarSpinner, desativarSpinner } = useSpinner();
  const { salvarComanda, comanda } = useComanda();

  const { buscarPix } = useConfiguracao();

  const dividirConta = (comanda: ComandaDTO) => {
    try {
      ativarSpinner("Dividindo a comanda");
      const resultado: PessoaDivisaoDTO[] = [];
      if (!comanda) return [];
      var totalAux = comanda.subtotal;

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
        totalAux = pessoa.taxaServicoGarcom + totalAux;
      });

      setTotalComanda(totalAux);
      setDivisao(resultado);
    } finally {
      desativarSpinner();
    }
  };

  const compartilharResultado = async (comanda: ComandaDTO) => {
    if (!comanda || divisao.length === 0) {
      return;
    }

    const separador = "────────────────────────";
    const resumoPorPessoa = divisao
      .map((pessoa) =>
        formatarPessoaParaCompartilhar(pessoa, comanda.taxaServicoGarcom),
      )
      .join(`\n\n${separador}\n\n`);
    const linhas = [
      "RACHA CONTA",
      `Mesa: ${comanda.mesa}`,
      `Total geral: ${NumberUtil.formatarValor(totalComanda)}`,
      "",
      "DIVISÃO POR PESSOA",
      separador,
      resumoPorPessoa,
    ];

    try {
      const chavePix = await buscarPix();
      if (chavePix) {
        linhas.push("", "PAGAMENTO VIA PIX", `Chave do recebedor: ${chavePix}`);
      }

      await Share.share({ message: linhas.join("\n") });
    } catch (error) {
      console.error("Erro ao compartilhar resultado:", error);
    }
  };

  const formatarPessoaParaCompartilhar = (
    pessoa: PessoaDivisaoDTO,
    taxaServicoGarcom: number,
  ) => {
    const linhas = [`Pessoa: ${pessoa.nome}`];

    pessoa.itens
      .filter((item) => item.id !== -1)
      .forEach((item) => {
        const quantidade = item.quantidade.toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
        });
        linhas.push(
          `  • ${quantidade} × ${item.descricao} — ${NumberUtil.formatarValor(
            item.valor,
          )}`,
        );
      });

    if (taxaServicoGarcom > 0) {
      linhas.push(
        ` • Taxa do garçom (${taxaServicoGarcom}%): ${NumberUtil.formatarValor(pessoa.taxaServicoGarcom)}`,
      );
    }

    linhas.push(`  TOTAL A PAGAR: ${NumberUtil.formatarValor(pessoa.total)}`);
    return linhas.join("\n");
  };

  const salvarComandaCalculada = () => {
    if (comanda) salvarComanda({ ...comanda, total: totalComanda });
  };

  return {
    compartilharResultado,
    dividirConta,
    divisao,
    totalComanda,
    salvarComandaCalculada,
    comanda,
  };
}
