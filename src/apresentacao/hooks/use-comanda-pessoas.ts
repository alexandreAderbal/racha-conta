import { PessoaDTO } from "@Infra-dto/pessoa-dto";
import { ModalRef } from "@Componentes/modal";
import { ItemDTO } from "@Infra-dto/item-dto";
import { useComanda } from "./use-comanda";
import { useRef, useState } from "react";

export function useComandaPessoas(item: ItemDTO) {
  const modalRef = useRef<ModalRef>(null);
  const {
    pessoas,
    adicionarPessoa,
    marcarPessoa,
    marcarPessoas,
    removerPessoa,
    atualizarQuantidadeConsumida,
  } = useComanda();
  const [nome, setNome] = useState("");
  const [pessoaParaRemover, setPessoaParaRemover] = useState<PessoaDTO | null>(
    null,
  );
  const [quantidadesDigitadas, setQuantidadesDigitadas] = useState<
    Record<string, string>
  >({});

  function abrirModal() {
    setQuantidadesDigitadas({});
    modalRef.current?.titulo(`${item.quantidade} - ${item.descricao}`);
    modalRef.current?.abrir();
    marcarPessoas(item.pessoas);
  }

  function addPessoa() {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) return;
    adicionarPessoa(PessoaDTO.criar(nomeLimpo), item.descricao);
    setNome("");
  }

  function selecionarPessoa(pessoa: PessoaDTO) {
    marcarPessoa(pessoa, item.descricao);
  }

  const todasPessoasSelecionadas =
    pessoas.length > 0 &&
    pessoas.every((pessoa) =>
      item.pessoas.some((pessoaDoItem) => pessoaDoItem.nome === pessoa.nome),
  );

  function alternarTodasPessoas() {
    const nomesSelecionados = new Set(
      item.pessoas.map((pessoa) => pessoa.nome),
    );
    const pessoasParaAlternar = todasPessoasSelecionadas
      ? item.pessoas
      : pessoas.filter((pessoa) => !nomesSelecionados.has(pessoa.nome));

    pessoasParaAlternar.forEach((pessoa) =>
      marcarPessoa(pessoa, item.descricao),
    );
  }

  function confirmarRemocaoPessoa(pessoa: PessoaDTO) {
    setPessoaParaRemover(pessoa);
  }

  function cancelarRemocaoPessoa() {
    setPessoaParaRemover(null);
  }

  function removerPessoaConfirmada() {
    if (!pessoaParaRemover) return;

    removerPessoa(pessoaParaRemover.nome);
    setQuantidadesDigitadas((valores) => {
      const atualizados = { ...valores };
      delete atualizados[pessoaParaRemover.nome];
      return atualizados;
    });
    cancelarRemocaoPessoa();
  }

  function salvarQuantidade(pessoa: PessoaDTO, valorDigitado: string) {
    const quantidade = Number(valorDigitado.replace(",", "."));
    if (valorDigitado.trim() && Number.isFinite(quantidade)) {
      atualizarQuantidadeConsumida(item.descricao, pessoa.nome, quantidade);
    }
    setQuantidadesDigitadas((valores) => {
      const atualizados = { ...valores };
      delete atualizados[pessoa.nome];
      return atualizados;
    });
  }
  return {
    abrirModal,
    addPessoa,
    selecionarPessoa,
    todasPessoasSelecionadas,
    alternarTodasPessoas,
    confirmarRemocaoPessoa,
    removerPessoaConfirmada,
    salvarQuantidade,
    pessoas,
    quantidadesDigitadas,
    setQuantidadesDigitadas,
    nome,
    setNome,
    cancelarRemocaoPessoa,
    pessoaParaRemover,
    modalRef,
  };
}
