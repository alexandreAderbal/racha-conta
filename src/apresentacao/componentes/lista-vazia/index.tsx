import { Icon } from "@Componentes/icon";
import {
  ListaVaziaContainer,
  ListaVaziaDescricao,
  ListaVaziaTitulo,
} from "./styles";

type IPorps = {
  titulo: string;
  subTitulo: string;
};

export const ListaVazia = ({ subTitulo, titulo }: IPorps) => {
  return (
    <ListaVaziaContainer>
      <Icon
        nome="receipt-text-outline"
        size={32}
        cor="#0F766E"
        bg
        br
        width={64}
      />
      <ListaVaziaTitulo>{titulo}</ListaVaziaTitulo>
      <ListaVaziaDescricao>{subTitulo}</ListaVaziaDescricao>
    </ListaVaziaContainer>
  );
};
