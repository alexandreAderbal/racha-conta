import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";

import {
  Modal as MR,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  ModalTitulo,
  Overlay,
} from "./styles";
import { Icon } from "@Componentes/icon";

export type ModalRef = {
  abrir: () => void;
  fechar: () => void;
  titulo: (titulo: string) => void;
};

type ModalProps = {
  children: ReactNode;
};

const Modal = forwardRef<ModalRef, ModalProps>(({ children }, ref) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [titulo, setTitulo] = useState("Adicionar pessoa");
  const fechar = () => setModalVisible(false);

  useImperativeHandle(ref, () => ({
    abrir() {
      setModalVisible(true);
    },

    fechar() {
      setModalVisible(false);
    },

    titulo(novoTitulo: string) {
      setTitulo(novoTitulo);
    },
  }));

  return (
    <MR
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={fechar}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Overlay>
          <ModalBackdrop
            onPress={fechar}
            accessibilityRole="button"
            accessibilityLabel="Fechar modal"
          />
          <ModalContainer>
            <ModalHeader>
              <ModalTitulo>{titulo}</ModalTitulo>

              <TouchableOpacity onPress={fechar}>
                <Icon nome="close" size={26} cor="#374151" />
              </TouchableOpacity>
            </ModalHeader>

            {children}
          </ModalContainer>
        </Overlay>
      </KeyboardAvoidingView>
    </MR>
  );
});

Modal.displayName = "Modal";

export default Modal;
