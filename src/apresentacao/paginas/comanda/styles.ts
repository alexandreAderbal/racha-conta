import { Theme } from "@Theme";
import styled from "styled-components/native";

export const MesaInfo = styled.View`
  padding: 4px 20px 18px;
`;

export const MesaTitulo = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: ${Theme.colors.text};
`;

export const Resumo = styled.View`
  margin: 0 16px 18px;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ResumoItem = styled.View`
  align-items: center;
`;

export const ResumoLabel = styled.Text`
  font-size: 12px;
  color: ${Theme.colors.textSecondary};
`;

export const ResumoValor = styled.Text`
  margin-top: 4px;
  font-size: 18px;
  font-weight: 800;
  color: ${Theme.colors.text};
`;

export const ResumoDivisor = styled.View`
  width: 2px;
  height: 35px;
  background-color: ${Theme.colors.primary};
`;

export const TituloSecao = styled.Text`
  margin: 0 20px 10px;
  font-size: 17px;
  font-weight: 700;
  color: ${Theme.colors.text};
`;

export const IconeProduto = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: #e6f5f2;
  align-items: center;
  justify-content: center;
`;

export const InfoProduto = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Descricao = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${Theme.colors.text};
`;

export const Quantidade = styled.Text`
  margin-top: 4px;
  font-size: 13px;
  color: ${Theme.colors.textSecondary};
`;

export const Valor = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: ${Theme.colors.text};
`;

export const Separador = styled.View`
  height: 1px;
  margin: 14px 0;
  background-color: #edf0f2;
`;

export const LinhaPessoas = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextoPessoas = styled.Text`
  flex: 1;
  margin-left: 8px;
  font-size: 13px;
  color: ${Theme.colors.textSecondary};
`;

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.45);
  justify-content: flex-end;
`;

export const ModalContainer = styled.View`
  background-color: #ffffff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px 20px 35px 20px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ModalTitulo = styled.Text`
  font-size: 21px;
  font-weight: 700;
  color: #111827;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  height: 48px;
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 8px;
  padding: 0 16px;
  margin-bottom: 8px;
  font-size: 16px;
  color: #111827;
  background-color: #f9fafb;
`;

export const BotaoPessoa = styled.TouchableOpacity<{
  selecionada: boolean;
}>`
  flex: 1;
  min-height: 42px;
  padding: 0 14px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ selecionada }) =>
    selecionada ? "#E6F4F1" : "#F9FAFB"};
`;

export const LinhaPessoaControle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const QuantidadeLabel = styled.Text`
  margin-left: 8px;
  font-size: 13px;
  color: ${Theme.colors.textSecondary};
`;

export const QuantidadeInput = styled.TextInput`
  width: 64px;
  height: 42px;
  margin-left: 6px;
  padding: 0 6px;
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  color: ${Theme.colors.text};
  text-align: center;
  font-size: 15px;
`;

export const TextoPessoa = styled.Text`
  margin-left: 12px;
  font-size: 16px;
  font-weight: 600;
  color: ${Theme.colors.text};
`;

export const Actions = styled.View`
  flex-direction: row;
  gap: 12px;
`;
