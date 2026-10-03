import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

type Props = {
  nome: IconName;
  size?: number;
  cor?: string;
  bg?: boolean;
  br?: boolean;
  outline?: boolean;
  compact?: boolean;
  width?: number;
};

type IconeProps = {
  size: number;
  cor: string;
};

type ContainerProps = {
  $containerSize: number;
  $cor: string;
  $br: boolean;
  $outline: boolean;
};

const Icone = styled(MaterialCommunityIcons)<IconeProps>`
  color: ${({ cor }) => cor};
`;

const Container = styled.View<ContainerProps>`
  width: ${({ $containerSize }) => $containerSize}px;
  height: ${({ $containerSize }) => $containerSize}px;
  border-radius: ${({ $br }) => ($br ? "100px" : "8px")};
  justify-content: center;
  align-items: center;
  background-color: ${({ $cor, $outline }) => `${$cor}${$outline ? "40" : ""}`};
  border-width: ${({ $outline }) => ($outline ? "1.5px" : "0px")};
  border-color: ${({ $cor }) => $cor};
`;

export function Icon({
  nome,
  cor,
  size = 26,
  bg = false,
  br = false,
  outline = false,
  compact = false,
  width = 42,
}: Props) {
  const corIcone = cor ?? "#FFFFFF";

  const containerSize = compact ? 28 : width;

  if (!bg) {
    return <Icone name={nome} size={size} cor={corIcone} />;
  }

  return (
    <Container
      $containerSize={containerSize}
      $cor={corIcone}
      $br={br}
      $outline={outline}
    >
      <Icone name={nome} size={size} cor={outline ? corIcone : "#FFFFFF"} />
    </Container>
  );
}
