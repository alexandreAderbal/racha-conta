import { IconName } from "@Componentes/icon";
import BtnDefault from "./default";
import { Theme } from "@Theme";

interface IProps {
  icon?: IconName;
  action?: () => void;
  label?: string;
}

export default function Light({ action, icon, label }: IProps) {
  return (
    <BtnDefault
      action={action}
      label={label}
      icon={icon}
      cor={Theme.colors.primary}
      bg="#effaf8"
    />
  );
}
