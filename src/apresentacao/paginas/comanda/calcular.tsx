import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ContainerFooter from "@Componentes/containers/container-footer";
import { useNavigation } from "@react-navigation/native";
import Modal, { ModalRef } from "@Componentes/modal";
import { useRef, useState } from "react";
import Alerta from "@Componentes/alerta";
import {
  Input,
  Label,
  PendenciaItem,
  PendenciasLista,
  PendenciasTitulo,
} from "./styles";
import { BTN } from "@Componentes/btns";

interface IProps {
  action: (value: string) => void;
  itensSemPessoa: string[];
}

export default function Calcular({ action, itensSemPessoa }: IProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [percentual, setPerncentual] = useState<string>("0");
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const modalRef = useRef<ModalRef>(null);

  function abrirModalCalculo() {
    if (itensSemPessoa.length > 0) {
      setAlertaVisivel(true);
      return;
    }

    modalRef.current?.titulo("Serviço do garçom");
    modalRef.current?.abrir();
  }

  const abrirComandaResultado = () => {
    modalRef.current?.fechar();
    navigation.navigate("ComandaResultado");
  };

  return (
    <ContainerFooter>
      <BTN.Sucesso
        action={abrirModalCalculo}
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
          action={abrirComandaResultado}
          icon="calculator-variant-outline"
          label="Calcular"
        />
      </Modal>

      <Alerta
        visivel={alertaVisivel}
        tipo="aviso"
        titulo={
          itensSemPessoa.length === 1
            ? "Um item está sem pessoa"
            : `${itensSemPessoa.length} itens estão sem pessoa`
        }
        mensagem="Atribua pelo menos uma pessoa a cada item para continuar."
        fechar={() => setAlertaVisivel(false)}
        acaoPrincipal={{
          texto: "Voltar à comanda",
          action: () => setAlertaVisivel(false),
        }}
      >
        <PendenciasLista>
          <PendenciasTitulo>ITENS PENDENTES</PendenciasTitulo>
          {itensSemPessoa.slice(0, 5).map((descricao, indice) => (
            <PendenciaItem key={`${descricao}-${indice}`}>
              • {descricao}
            </PendenciaItem>
          ))}
          {itensSemPessoa.length > 5 ? (
            <PendenciaItem>
              • e mais {itensSemPessoa.length - 5}{" "}
              {itensSemPessoa.length - 5 === 1 ? "item" : "itens"}
            </PendenciaItem>
          ) : null}
        </PendenciasLista>
      </Alerta>
    </ContainerFooter>
  );
}
