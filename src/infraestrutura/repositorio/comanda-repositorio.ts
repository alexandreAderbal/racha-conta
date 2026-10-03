import { ComandaModelo } from "@Infra-modelo/comanda-modelo";
import { RepositorioBase } from "./repositorio-base";
import { ComandaDTO } from "@Infra-dto/comanda-dto";

export class ComandaRepository extends RepositorioBase<ComandaModelo> {
  protected tabela = "comandas";

  async buscarTodos(): Promise<ComandaDTO[]> {
    const db = await this.getDb();

    const query = `
      SELECT
        c.id,
        c.mesa,
        c.total,
        c.status,
        c.criado_em criadoEm,
        COUNT(DISTINCT p.id) AS quantidadePessoas
      FROM comandas c
      LEFT JOIN pessoas p
        ON p.id_comanda = c.id
      GROUP BY
        c.id,
        c.mesa,
        c.total,
        c.status
      ORDER BY c.id DESC
    `;

    return await db.getAllAsync<ComandaDTO>(query);
  }
}
