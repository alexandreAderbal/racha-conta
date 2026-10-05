import { DocumentoUtil } from "src/core/utils/documento-util";
import { CONFIGURACAO_CONSTANT } from "@Constant";
import { useSpinner } from "./use-spinner";
import { SERVICE } from "@Infra-service";
import { useState } from "react";

export function useConfiguracao() {
  const { ativarSpinner, desativarSpinner } = useSpinner();
  const [chavePix, setChavePix] = useState("");

  const salvarPix = async () => {
    ativarSpinner();
    await SERVICE.configuracao.salvar(
      CONFIGURACAO_CONSTANT.CHAVE_PIX,
      chavePix,
    );
    desativarSpinner();
  };

  const buscarPix = async () => {
    try {
      ativarSpinner();
      var pix = await SERVICE.configuracao.buscarValorPorChave(
        CONFIGURACAO_CONSTANT.CHAVE_PIX,
      );
      pix = DocumentoUtil.formatarCpfCnpj(pix);
      setChavePix(pix);
      return pix;
    } finally {
      desativarSpinner();
    }
  };

  return { chavePix, setChavePix, salvarPix, buscarPix };
}
