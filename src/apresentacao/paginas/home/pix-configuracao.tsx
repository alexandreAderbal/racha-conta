import { PixDescricao, PixInput, PixLabel } from "./styles";
import { useConfiguracao } from "@Hooks/use-configuracao";
import Modal, { ModalRef } from "@Componentes/modal";
import { useEffect, useRef } from "react";
import { BTN } from "@Componentes/btns";
import { DocumentoUtil } from "src/core/utils/documento-util";

export function PixConfiguracao() {
  const modalRef = useRef<ModalRef>(null);
  const { buscarPix, chavePix, salvarPix, setChavePix } = useConfiguracao();

  useEffect(() => {
    buscarPix();
  }, []);

  function abrirConfiguracao() {
    modalRef.current?.titulo("Minha chave Pix");
    modalRef.current?.abrir();
  }

  const fecharESalvar = () => {
    modalRef.current?.fechar();
    salvarPix();
  };

  return (
    <>
      <BTN.Light
        action={abrirConfiguracao}
        icon="key-chain-variant"
        label={chavePix ? "Editar chave Pix" : "Adicionar chave Pix"}
      />

      <Modal ref={modalRef}>
        <PixLabel>Chave Pix para receber pagamentos</PixLabel>
        <PixInput
          value={chavePix}
          onChangeText={(valor) =>
            setChavePix(DocumentoUtil.formatarCpfCnpj(valor))
          }
          placeholder="CPF, CNPJ, telefone, e-mail ou chave aleatória"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
          accessibilityLabel="Chave Pix do recebedor"
        />
        <PixDescricao>
          A chave salva será exibida para quem consultar ou compartilhar a
          divisão.
        </PixDescricao>
        <BTN.Primary
          action={fecharESalvar}
          icon="key-chain-variant"
          label={"Salvar chave Pix"}
        />
      </Modal>
    </>
  );
}
