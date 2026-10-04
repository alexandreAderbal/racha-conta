import ContainerPage from "@Componentes/containers/container-page";
import { Centralizado, Space } from "@Componentes/containers/containers";
import { Descricao, Titulo } from "@Componentes/texto";
import { Icon } from "@Componentes/icon";
import { BTN } from "@Componentes/btns";
import {
  Ajuda,
  IconCenter,
  IconContainer,
  Rodape,
  TextoRodape,
} from "./styles";
import { Theme } from "@Theme";

interface Props {
  verificarConexao: () => void;
}

export function SemInternet({ verificarConexao }: Props) {
  return (
    <ContainerPage>
      <Centralizado>
        <IconCenter>
          <IconContainer>
            <Icon
              nome="cloud-off-outline"
              size={58}
              cor={Theme.colors.primary}
            />
          </IconContainer>
        </IconCenter>

        <Titulo>Você está sem internet</Titulo>

        <Descricao>
          Não foi possível conectar à internet. Verifique sua conexão e tente
          novamente.
        </Descricao>
        <Space />
        <BTN.Sucesso
          action={verificarConexao}
          label="Verificar"
          icon="wifi-alert"
        />

        <Ajuda>
          Você poderá continuar usando o Racha Conta assim que a conexão for
          restabelecida.
        </Ajuda>
      </Centralizado>

      <Rodape>
        <Icon nome="glass-mug-variant" size={18} cor={Theme.colors.gray} />
        <Icon nome="glass-mug-variant" size={18} cor={Theme.colors.gray} />
        <TextoRodape>Racha Conta</TextoRodape>
      </Rodape>
    </ContainerPage>
  );
}
