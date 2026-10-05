import { Theme } from "@Theme";
import styled from "styled-components/native";

export const Titulo = styled.Text`
  font-family: ${Theme.fonts.extraBold};
  font-size: 25px;
  font-weight: 800;
  color: #111827;
`;

export const Subtitulo = styled.Text`
  font-family: ${Theme.fonts.regular};
  font-size: 14px;
  color: #6b7280;
  margin-top: 5px;
`;

export const TituloSucesso = styled.Text`
  font-family: ${Theme.fonts.bold};
  font-size: 23px;
  font-weight: 700;
  color: #111827;
`;

export const Descricao = styled.Text`
  font-family: ${Theme.fonts.regular};
  font-size: 14px;
  color: #6b7280;
  margin-top: 2px;
`;
