import { IconName } from "@Componentes/icon";
import BtnDefault from "./default";

interface IProps {
  icon?: IconName;
  action?: () => void;
  label?: string;
}

export default function Secondary({ action, icon, label }: IProps) {
  return (
    <BtnDefault
      action={action}
      label={label}
      icon={icon}
      cor="#00D4B4"
      bg="transparent"
      bc="#00D4B4"
    />
  );
}
