import { IconName } from "@Componentes/icon";
import BtnDefault from "./default";

interface IProps {
  icon?: IconName;
  action?: () => void;
  label?: string;
}

export default function Sucesso({ action, icon, label }: IProps) {
  return <BtnDefault action={action} label={label} icon={icon} bg="#0f766e" />;
}
