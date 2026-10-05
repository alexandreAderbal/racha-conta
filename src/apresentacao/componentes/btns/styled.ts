import styled from "styled-components/native";
import { Theme } from "@Theme";

type BtnProps = {
  bg: string;
  bc?: string;
};

export const BTN = styled.TouchableOpacity<BtnProps>`
  height: 48px;
  border-radius: 8px;
  background-color: ${({ bg }) => bg};
  border-color: ${({ bg, bc }) => (bc ? bc : bg)};
  border-width: 1.5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

type TxtProps = {
  cor?: string;
};

export const BTNTexto = styled.Text<TxtProps>`
  font-family: ${Theme.fonts.bold};
  color: ${({ cor }) => cor};
  font-size: 16px;
  font-weight: 700;
`;
