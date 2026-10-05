import { Theme } from "@Theme";
import styled from "styled-components/native";

export const SucessoContainer = styled.View`
  align-items: center;
  margin-bottom: 6px;
`;

export const ResumoTotal = styled.View`
  background-color: #0f766e;
  border-radius: 8px;
  padding: 4px 12px;
  margin-bottom: 8px;
`;

export const LabelTotal = styled.Text`
  font-family: ${Theme.fonts.regular};
  color: #dff5f1;
  font-size: 14px;
`;

export const ValorTotal = styled.Text`
  font-family: ${Theme.fonts.extraBold};
  color: #ffffff;
  font-size: 29px;
  font-weight: 800;
  margin-top: 4px;
`;

export const TituloSecao = styled.Text`
  font-family: ${Theme.fonts.bold};
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const PessoaIdentificacao = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-color: #dff5f1;
  align-items: center;
  justify-content: center;
  margin-right: 11px;
`;

export const NomePessoa = styled.Text`
  font-family: ${Theme.fonts.bold};
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
`;

export const TotalPessoa = styled.Text`
  font-family: ${Theme.fonts.extraBold};
  font-size: 17px;
  font-weight: 800;
  color: #0f766e;
`;

export const ProdutoResultado = styled.View`
  padding: 2px 0;
  margin-top: 4px;
  border-top-width: 1px;
  border-top-color: #e5e7eb;
`;

export const NomeProduto = styled.Text`
  font-family: ${Theme.fonts.semiBold};
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
`;

export const DetalhesProduto = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
`;

export const QuantidadeProduto = styled.Text`
  font-family: ${Theme.fonts.regular};
  color: #6b7280;
  font-size: 13px;
`;

export const ValorLinha = styled.Text`
  font-family: ${Theme.fonts.regular};
  color: #374151;
  font-size: 14px;
`;

export const TextoTotal = styled.Text`
  font-family: ${Theme.fonts.bold};
  color: #111827;
  font-size: 15px;
  font-weight: 700;
`;

export const ValorDestaque = styled.Text`
  font-family: ${Theme.fonts.extraBold};
  color: #0f766e;
  font-size: 17px;
  font-weight: 800;
`;

export const Rodape = styled.View`
  background-color: #ffffff;
  padding: 12px 20px 20px;
`;
