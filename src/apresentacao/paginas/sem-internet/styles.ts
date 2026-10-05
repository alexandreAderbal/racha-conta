import { Theme } from "@Theme";
import styled from "styled-components/native";

export const IconCenter = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
`;

export const IconContainer = styled.View`
  width: 112px;
  height: 112px;
  border-radius: 56px;
  background-color: #dff3f0;
  align-items: center;
  justify-content: center;
`;

export const Titulo = styled.Text`
  font-family: ${Theme.fonts.bold};
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 12px;
`;

export const Descricao = styled.Text`
  font-family: ${Theme.fonts.regular};
  font-size: 16px;
  line-height: 24px;
  color: #64748b;
  text-align: center;
  max-width: 340px;
  margin-bottom: 32px;
`;

export const Ajuda = styled.Text`
  font-family: ${Theme.fonts.regular};
  font-size: 13px;
  line-height: 20px;
  color: #94a3b8;
  text-align: center;
  max-width: 330px;
  margin-top: 20px;
`;

export const Rodape = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-bottom: 8px;
`;

export const TextoRodape = styled.Text`
  font-family: ${Theme.fonts.semiBold};
  font-size: 13px;
  color: #94a3b8;
  font-weight: 600;
`;
