import { PessoaModelo } from "@Infra-modelo/pessoa-modelo";
import { RepositorioBase } from "./repositorio-base";
import { PessoaDTO } from "@Infra-dto/pessoa-dto";

export class PessoaRepository extends RepositorioBase<PessoaModelo> {
  protected tabela = "pessoas";

  async buscarPorItemComanda(
    idItem: number,
    idComanda: number,
  ): Promise<PessoaDTO[] | []> {
    const db = await this.getDb();

    const sql = `
    SELECT p.id, p.nome, ip.quantidade_consumida AS quantidadeConsumida
    FROM pessoas p
    INNER JOIN item_pessoas ip
      ON ip.id_pessoa = p.id
    WHERE ip.id_item = ?
      AND p.id_comanda = ?
    ORDER BY p.id DESC
  `;

    return await db.getAllAsync<PessoaDTO>(sql, idItem, idComanda);
  }
}
