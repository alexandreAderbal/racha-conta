import { dbPromise } from "@Infra-data-base/index";
import { SQLiteBindValue } from "expo-sqlite";

export abstract class RepositorioBase<T extends { id?: number }> {
  protected abstract tabela: string;

  protected async getDb() {
    return await dbPromise;
  }

  // =========================
  // INCLUIR
  // =========================

  async inserir<T extends object>(dados: T): Promise<number> {
    const db = await this.getDb();
    const object = this.removerId(dados);
    const campos = this.camelParaSnake(object);
    const valores = Object.values(object);

    const colunas = campos.join(", ");
    const parametros = campos.map(() => "?").join(", ");

    const sql = `
    INSERT INTO ${this.tabela}
    (${colunas})
    VALUES (${parametros})
  `;
    this.logSQL(sql, valores.toString());
    const resultado = await db.runAsync(sql, ...(valores as SQLiteBindValue[]));

    return resultado.lastInsertRowId;
  }

  // =========================
  // BUSCAR POR ID
  // =========================

  async buscarPorId(id: number): Promise<T | null> {
    const db = await dbPromise;

    const sql = `
      SELECT *
      FROM ${this.tabela}
      WHERE id = ?
      LIMIT 1
    `;
    this.logSQL(sql);
    const resultado = await db.getFirstAsync<T>(sql, id);

    return this.resolveResultado(resultado) ?? null;
  }

  // =========================
  // BUSCAR POR CAMPOS
  // =========================

  async buscarPorCampos(filtros: Partial<T>): Promise<T | null> {
    const db = await dbPromise;
    const campos = Object.keys(filtros);

    const where = campos
      .map((campo) => `${this.camelParaSnakeCampo(campo)} = ?`)
      .join(" AND ");

    const valores = campos.map(
      (campo) => filtros[campo as keyof T] as SQLiteBindValue,
    );

    const sql = `
        SELECT *
        FROM ${this.tabela}
        WHERE ${where}
        LIMIT 1
      `;
    this.logSQL(sql);
    const resultado = await db.getFirstAsync<T>(sql, ...valores);
    return this.resolveResultado(resultado) ?? null;
  }

  // =========================
  // BUSCAR VÁRIOS POR CAMPO
  // =========================

  async buscarTodosPorCampo<K extends keyof T>(
    campo: K,
    valor: T[K],
  ): Promise<T[]> {
    const db = await dbPromise;

    const sql = `
      SELECT *
      FROM ${this.tabela}
      WHERE ${this.camelParaSnakeCampo(campo.toString())} = ?
      ORDER BY id DESC
    `;
    this.logSQL(sql);
    var resultado = await db.getAllAsync<T>(sql, valor as SQLiteBindValue);
    return this.resolveResultados(resultado);
  }

  // =========================
  // LISTAR
  // =========================

  async listar(): Promise<T[]> {
    const db = await dbPromise;

    const sql = `
      SELECT *
      FROM ${this.tabela}
      ORDER BY id DESC
    `;
    this.logSQL(sql);
    var resultado = await db.getAllAsync<T>(sql);
    return this.resolveResultados(resultado);
  }

  // =========================
  // ATUALIZAR
  // =========================

  protected async atualizar(
    id: number,
    dados: Record<string, unknown>,
  ): Promise<void> {
    const db = await dbPromise;

    const campos = Object.keys(dados);
    const valores = Object.values(dados);

    const set = campos.map((campo) => `${campo} = ?`).join(", ");

    const sql = `
      UPDATE ${this.tabela}
      SET ${set}
      WHERE id = ?
    `;
    this.logSQL(sql);
    await db.runAsync(sql, ...(valores as SQLiteBindValue[]), id);
  }

  // =========================
  // EXCLUIR
  // =========================

  async excluir(id: number): Promise<void> {
    const db = await dbPromise;

    const sql = `
      DELETE FROM ${this.tabela}
      WHERE id = ?
    `;
    this.logSQL(sql);

    await db.runAsync(sql, id);
  }

  protected resolveResultado<TResultado extends Record<string, any>>(
    resultado: TResultado | null,
  ): TResultado | null {
    if (!resultado) {
      return null;
    }
    const novoResultado: Record<string, any> = {};
    Object.entries(resultado).forEach(([campo, valor]) => {
      novoResultado[this.snakeToCamel(campo)] = valor;
    });
    return novoResultado as TResultado;
  }

  protected resolveResultados<R extends Record<string, any>>(
    resultado: R[],
  ): R[] {
    return resultado.map((item) => {
      const novoItem: Record<string, any> = {};
      Object.entries(item).forEach(([campo, valor]) => {
        novoItem[this.snakeToCamel(campo)] = valor;
      });
      return novoItem as R;
    });
  }

  private snakeToCamel(campo: string): string {
    return campo.replace(/_([a-z])/g, (_, letra) => letra.toUpperCase());
  }

  private camelParaSnake<T extends object>(dados: T): string[] {
    const campos = Object.keys(dados).filter((campo) => campo !== "id");
    return campos.map((campo) => this.camelParaSnakeCampo(campo));
  }

  private camelParaSnakeCampo(campo: string): string {
    return campo.replace(/[A-Z]/g, (letra) => `_${letra.toLowerCase()}`);
  }

  private logSQL(sql: string, valores?: string) {
    if (__DEV__) {
      console.log("LOG SQL: ", sql);
      if (valores) console.log("LOG VALUES: ", valores);
    }
  }

  private removerId<T extends object>(dados: T): Omit<T, "id"> {
    const { id, ...novoObjeto } = dados as T & { id?: unknown };
    return novoObjeto as Omit<T, "id">;
  }
}
