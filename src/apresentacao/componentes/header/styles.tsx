import { Theme } from "@Theme";
import styled from "styled-components/native";

export const Container = styled.View`
  height: 70px;
  width: 100%;
  background-color: ${Theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

export const LadoEsquerdo = styled.View`
  position: absolute;
  left: 12px;
  top: 10px;
  bottom: 0;
  width: 50px;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const LadoDireito = styled.View`
  position: absolute;
  right: 12px;
  top: 10px;
  bottom: 0;
  width: 50px;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const BotaoIcon = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
`;

export const Conteudo = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
`;

export const Titulo = styled.Text`
  font-family: ${Theme.fonts.bold};
  top: 6px;
  font-size: 19px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
`;
