import { Theme } from "@Theme";
import styled from "styled-components/native";

export const ListaVaziaContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const ListaVaziaTitulo = styled.Text`
  font-family: ${Theme.fonts.bold};
  margin-top: 16px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  text-align: center;
`;

export const ListaVaziaDescricao = styled.Text`
  font-family: ${Theme.fonts.regular};
  margin-top: 6px;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;
