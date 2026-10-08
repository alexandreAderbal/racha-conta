import { BTN } from "@Componentes/btns";
import {
  LogoArea,
  LogoIcon,
  LogoText,
  LogoTextHighlight,
  Subtitle,
  Features,
  Feature,
  FeatureIcon,
  FeatureText,
  Actions,
  Footer,
  FooterText,
} from "./styles";
import { Icon } from "@Componentes/icon";
import ContainerPage from "@Componentes/containers/container-page";
import { Centralizado } from "@Componentes/containers/containers";
import { SelecionarArquivos } from "./selecionar-arquivos";
import { PixConfiguracao } from "./pix-configuracao";

type Props = {
  navigation: any;
};

export function Home({ navigation }: Props) {
  function handleOpenCamera() {
    navigation.navigate("Camera");
  }

  function handleMyAccounts() {
    navigation.navigate("ComandaLista");
  }

  return (
    <ContainerPage bg="#003d3b">
      <Centralizado>
        <LogoArea>
          <LogoIcon>
            <Icon nome="glass-mug-variant" size={54} cor="#00D4B4" />
            <Icon nome="glass-mug-variant" size={54} cor="#00D4B4" />
          </LogoIcon>

          <LogoText>
            Racha
            {"\n"}
            <LogoTextHighlight>Conta</LogoTextHighlight>
          </LogoText>

          <Subtitle>
            Divida a conta de forma
            {"\n"}
            simples e sem dor de cabeça.
          </Subtitle>
        </LogoArea>

        <Features>
          <Feature>
            <FeatureIcon>
              <Icon nome="file-upload-outline" size={28} cor="#00D4B4" />
            </FeatureIcon>

            <FeatureText>Envie foto ou arquivo</FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon>
              <Icon
                nome="text-box-search-outline"
                size={28}
                cor="#00D4B4"
              />
            </FeatureIcon>

            <FeatureText>Extração automática dos itens</FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon>
              <Icon nome="account-group-outline" size={28} cor="#00D4B4" />
            </FeatureIcon>

            <FeatureText>Associe pessoas aos itens</FeatureText>
          </Feature>
        </Features>

        <Actions>
          <BTN.Primary
            action={handleOpenCamera}
            label="Ler comanda"
            icon="camera-outline"
          />
          <SelecionarArquivos />
          <BTN.Secondary
            action={handleMyAccounts}
            label="Minhas comandas"
            icon="clipboard-text-outline"
          />
          <PixConfiguracao />
        </Actions>
      </Centralizado>

      <Footer>
        <Icon nome="calculator-variant" size={18} cor="#00A994" />
        <FooterText>Divida a conta. Aproveite o momento.</FooterText>
      </Footer>
    </ContainerPage>
  );
}
