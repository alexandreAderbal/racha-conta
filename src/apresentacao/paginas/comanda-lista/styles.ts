import { Theme } from "@Theme";
import styled from "styled-components/native";

export const MesaContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MesaIcon = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #dff5f1;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const MesaInfo = styled.View``;

export const NomeMesa = styled.Text`
  font-family: ${Theme.fonts.bold};
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

export const Data = styled.Text`
  font-family: ${Theme.fonts.regular};
  font-size: 12px;
  color: #9ca3af;
  margin-top: 3px;
`;

export const Separador = styled.View`
  height: 1px;
  background-color: #e5e7eb;
  margin: 8px 0;
`;

export const Pessoas = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextoPessoas = styled.Text`
  font-family: ${Theme.fonts.regular};
  font-size: 14px;
  color: #6b7280;
  margin-left: 5px;
`;

export const Valor = styled.Text`
  font-family: ${Theme.fonts.extraBold};
  font-size: 18px;
  font-weight: 800;
  color: #111827;
`;

export const StatusContainer = styled.View<{
  finalizada: boolean;
}>`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  padding: 5px 9px;
  border-radius: 8px;
  background-color: ${({ finalizada }) => (finalizada ? "#DCFCE7" : "#FEF3C7")};
`;

export const StatusIcon = styled.View<{
  finalizada: boolean;
}>`
  margin-right: 4px;
`;

export const StatusTexto = styled.Text<{
  finalizada: boolean;
}>`
  font-family: ${Theme.fonts.bold};
  font-size: 12px;
  font-weight: 700;
  color: ${({ finalizada }) => (finalizada ? "#15803D" : "#B45309")};
`;
