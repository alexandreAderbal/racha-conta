import { ModeloBase } from "./modelo-base";

export type StatusComanda = "EM_ANDAMENTO" | "FINALIZADA";

export class ComandaModelo extends ModeloBase {
  mesa!: string;
  total!: number;
  status!: StatusComanda;
  subtotal!: number;
  finalizadaEm!: string | null;
  criadoEm!: string | null;
}
