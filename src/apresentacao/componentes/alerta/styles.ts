import styled from "styled-components/native";
import { Theme } from "@Theme";

export const Fundo = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgba(15, 23, 42, 0.48);
`;

export const ToqueFora = styled.Pressable`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Cartao = styled.View`
  width: 100%;
  max-width: 420px;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  background-color: ${Theme.colors.surface};
`;

type IconeFundoProps = {
  $fundo: string;
};

export const IconeFundo = styled.View<IconeFundoProps>`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  background-color: ${({ $fundo }) => $fundo};
  margin-bottom: 14px;
`;

export const Titulo = styled.Text`
  color: ${Theme.colors.text};
  font-size: 20px;
  font-weight: 800;
  text-align: center;
`;

export const Mensagem = styled.Text`
  margin-top: 8px;
  color: ${Theme.colors.textSecondary};
  font-size: 15px;
  line-height: 22px;
  text-align: center;
`;

export const Conteudo = styled.View`
  width: 100%;
  margin-top: 16px;
`;

export const Acoes = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
`;

type BotaoPrincipalProps = {
  $cor: string;
};

export const BotaoPrincipal = styled.Pressable<BotaoPrincipalProps>`
  min-height: 48px;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: 8px;
  background-color: ${({ $cor }) => $cor};
`;

export const TextoBotaoPrincipal = styled.Text`
  color: ${Theme.colors.white};
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

export const BotaoSecundario = styled.Pressable`
  min-height: 48px;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-radius: 8px;
  background-color: ${Theme.colors.background};
`;

export const TextoBotaoSecundario = styled.Text`
  color: ${Theme.colors.text};
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;
