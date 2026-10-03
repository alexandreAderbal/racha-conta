import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import {
  Container,
  BotaoIcon,
  Conteudo,
  Titulo,
  LadoEsquerdo,
  LadoDireito,
} from "./styles";

import { Icon } from "@Componentes/icon";

export default function Header({
  navigation,
  options,
  route,
}: NativeStackHeaderProps) {
  const titulo = options.title ?? route.name;

  return (
    <Container>
      <LadoEsquerdo>
        <BotaoIcon onPress={() => navigation.goBack()}>
          <Icon nome="arrow-left" size={28} cor="#FFFFFF" />
        </BotaoIcon>
      </LadoEsquerdo>

      <Conteudo>
        <Titulo>{titulo}</Titulo>
      </Conteudo>

      <LadoDireito>
        <BotaoIcon onPress={() => navigation.navigate("Home")}>
          <Icon nome="home-outline" size={28} cor="#FFFFFF" />
        </BotaoIcon>
      </LadoDireito>
    </Container>
  );
}
