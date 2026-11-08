import { ModeloBase } from "./modelo-base";

export class ItemModelo extends ModeloBase {
  idComanda!: number;
  identificador!: string;
  descricao!: string;
  quantidade!: number;
  valorUnitario!: number;
  valorTotal!: number;
}
