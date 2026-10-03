import { BTN, BTNTexto } from "./styled";
import { Icon, IconName } from "@Componentes/icon";

interface IProps {
  icon?: IconName;
  action?: () => void;
  label?: string;
  cor?: string;
  bg: string;
  bc?: string;
}

export default function BtnDefault({
  action,
  icon = "plus",
  label,
  cor = "#FFFFFF",
  bg,
  bc,
}: IProps) {
  return (
    <BTN activeOpacity={0.8} onPress={action} bg={bg} bc={bc}>
      <Icon nome={icon} size={23} cor={cor} />
      <BTNTexto cor={cor}>{label}</BTNTexto>
    </BTN>
  );
}
