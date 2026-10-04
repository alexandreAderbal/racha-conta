import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ContainerFooter from "@Componentes/containers/container-footer";
import { useNavigation } from "@react-navigation/native";
import Modal, { ModalRef } from "@Componentes/modal";
import { useRef, useState } from "react";
import { Input, Label } from "./styles";
import { BTN } from "@Componentes/btns";

interface IProps {
  action: (value: string) => void;
}

export default function Calcular({ action }: IProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const modalRef = useRef<ModalRef>(null);

  const [percentual, setPerncentual] = useState<string>("0");

  modalRef.current?.titulo("Serviço garçom");

  return (
    <ContainerFooter>
      <BTN.Sucesso
        action={modalRef.current?.abrir}
        icon="calculator-variant"
        label="Dividir comanda"
      />

      <Modal ref={modalRef}>
        <Label>Deseja adicionar a taxa de serviço do garçom?</Label>

        <Input
          value={percentual}
          onChangeText={setPerncentual}
          placeholder="Percentual"
          placeholderTextColor="#9CA3AF"
          keyboardType="decimal-pad"
          inputMode="numeric"
          maxLength={2}
          returnKeyType="done"
          onBlur={() => action(percentual)}
        />

        <BTN.Sucesso
          action={() => navigation.navigate("ComandaResultado")}
          icon="calculator-variant-outline"
          label="Calcular"
        />
      </Modal>
    </ContainerFooter>
  );
}
