import { ModeloBase } from "./modelo-base";

export class ItemModelo extends ModeloBase {
  idComanda!: number;
  descricao!: string;
  quantidade!: number;
  valorUnitario!: number;
  valorTotal!: number;
}
