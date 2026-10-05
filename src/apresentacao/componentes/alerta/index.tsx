import { Modal } from "react-native";
import { ReactNode } from "react";
import { Icon, IconName } from "@Componentes/icon";
import { Theme } from "@Theme";
import {
  Acoes,
  BotaoPrincipal,
  BotaoSecundario,
  Cartao,
  Conteudo,
  Fundo,
  IconeFundo,
  Mensagem,
  TextoBotaoPrincipal,
  TextoBotaoSecundario,
  Titulo,
  ToqueFora,
} from "./styles";

export type TipoAlerta = "informacao" | "sucesso" | "aviso" | "erro";

type AcaoAlerta = {
  texto: string;
  action: () => void;
};

interface IProps {
  visivel: boolean;
  titulo: string;
  mensagem?: string;
  tipo?: TipoAlerta;
  children?: ReactNode;
  acaoPrincipal?: AcaoAlerta;
  acaoSecundaria?: AcaoAlerta;
  fechar: () => void;
}

const ESTILO_TIPO: Record<
  TipoAlerta,
  { icone: IconName; cor: string; fundo: string }
> = {
  informacao: {
    icone: "information-outline",
    cor: Theme.colors.primary,
    fundo: "#E0F2FE",
  },
  sucesso: {
    icone: "check-circle-outline",
    cor: Theme.colors.success,
    fundo: "#DCFCE7",
  },
  aviso: {
    icone: "alert-outline",
    cor: Theme.colors.warning,
    fundo: "#FEF3C7",
  },
  erro: {
    icone: "close-octagon-outline",
    cor: Theme.colors.danger,
    fundo: "#FEE2E2",
  },
};

export default function Alerta({
  visivel,
  titulo,
  mensagem,
  tipo = "informacao",
  children,
  acaoPrincipal,
  acaoSecundaria,
  fechar,
}: IProps) {
  const estilo = ESTILO_TIPO[tipo];

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={fechar}
    >
      <Fundo>
        <ToqueFora
          onPress={fechar}
          accessibilityRole="button"
          accessibilityLabel="Fechar alerta"
        />
        <Cartao>
          <IconeFundo $fundo={estilo.fundo}>
            <Icon nome={estilo.icone} size={28} cor={estilo.cor} />
          </IconeFundo>

          <Titulo>{titulo}</Titulo>
          {mensagem ? <Mensagem>{mensagem}</Mensagem> : null}
          {children ? <Conteudo>{children}</Conteudo> : null}

          {acaoPrincipal || acaoSecundaria ? (
            <Acoes>
              {acaoSecundaria ? (
                <BotaoSecundario
                  onPress={acaoSecundaria.action}
                  accessibilityRole="button"
                >
                  <TextoBotaoSecundario>
                    {acaoSecundaria.texto}
                  </TextoBotaoSecundario>
                </BotaoSecundario>
              ) : null}
              {acaoPrincipal ? (
                <BotaoPrincipal
                  $cor={
                    tipo === "erro" ? Theme.colors.danger : Theme.colors.primary
                  }
                  onPress={acaoPrincipal.action}
                  accessibilityRole="button"
                >
                  <TextoBotaoPrincipal>
                    {acaoPrincipal.texto}
                  </TextoBotaoPrincipal>
                </BotaoPrincipal>
              ) : null}
            </Acoes>
          ) : null}
        </Cartao>
      </Fundo>
    </Modal>
  );
}
