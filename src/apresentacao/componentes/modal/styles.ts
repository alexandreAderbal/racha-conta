import { Theme } from "@Theme";
import styled from "styled-components/native";

export const Overlay = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const ModalBackdrop = styled.Pressable`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const ModalContainer = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 24px 20px 35px 20px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ModalTitulo = styled.Text`
  font-family: ${Theme.fonts.bold};
  font-size: 21px;
  font-weight: 700;
  color: #111827;
`;
