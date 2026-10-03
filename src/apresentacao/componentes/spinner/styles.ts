import styled from "styled-components/native";
import { Theme } from "@Theme";

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  background-color: rgba(15, 23, 42, 0.88);
`;

export const Loader = styled.View`
  width: 110px;
  height: 110px;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
`;

export const Anel = styled.View`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  border-width: 3px;
  border-color: rgba(255, 255, 255, 0.12);
  border-top-color: ${Theme.colors.primary};
  border-right-color: ${Theme.colors.primary};
`;

export const IconArea = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  align-items: center;
  justify-content: center;
  background-color: rgba(15, 118, 110, 0.2);
`;

export const Mensagem = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
`;

export const Pontos = styled.Text`
  color: ${Theme.colors.primary};
  font-weight: 800;
`;

export const SubMensagem = styled.Text`
  margin-top: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
`;
