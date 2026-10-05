import styled from "styled-components/native";

export const LogoArea = styled.View`
  align-items: center;
  margin-bottom: 48px;
`;

export const LogoIcon = styled.View`
  flex-direction: row;
  gap: 4px;
  margin-bottom: 18px;
`;

export const LogoText = styled.Text`
  color: #ffffff;
  font-size: 48px;
  line-height: 48px;
  font-weight: 800;
  text-align: center;
`;

export const LogoTextHighlight = styled.Text`
  color: #00d4b4;
`;

export const Subtitle = styled.Text`
  color: #d7eeee;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  margin-top: 16px;
`;

export const Features = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 48px;
`;

export const Feature = styled.View`
  flex: 1;
  align-items: center;
`;

export const FeatureIcon = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  border-width: 1px;
  border-color: #08756f;
  background-color: #064a47;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const FeatureText = styled.Text`
  color: #d7eeee;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

export const Actions = styled.View`
  gap: 12px;
`;

export const Footer = styled.View`
  height: 64px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  background-color: #003735;
`;

export const FooterText = styled.Text`
  color: #79aaa7;
  font-size: 12px;
`;

export const PixLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

export const PixInput = styled.TextInput`
  min-height: 48px;
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 8px;
  padding: 0 16px;
  margin-bottom: 8px;
  font-size: 16px;
  color: #111827;
  background-color: #f9fafb;
`;

export const PixDescricao = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: #6b7280;
  margin-bottom: 14px;
`;
