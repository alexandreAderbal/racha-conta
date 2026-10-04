import * as SQLite from "expo-sqlite";

export const dbPromise = SQLite.openDatabaseAsync("racha_conta_03.db");

export async function inicializarBanco() {
  console.log("Iniciando criação do banco e tabelas.");
  const db = await dbPromise;

  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS comandas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mesa TEXT NOT NULL,
      total REAL NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'EM_ANDAMENTO',
      criado_em TEXT NOT NULL,
      finalizada_em TEXT
    );

    CREATE TABLE IF NOT EXISTS pessoas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_comanda INTEGER NOT NULL,
      nome TEXT NOT NULL,
      FOREIGN KEY (id_comanda)
        REFERENCES comandas(id)
        ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_comanda INTEGER NOT NULL,
      descricao TEXT NOT NULL,
      quantidade REAL NOT NULL DEFAULT 1,
      valor_unitario REAL NOT NULL DEFAULT 0,
      valor_total REAL NOT NULL DEFAULT 0,
      FOREIGN KEY (id_comanda)
        REFERENCES comandas(id)
        ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS item_pessoas (
      id_item INTEGER NOT NULL,
      id_pessoa INTEGER NOT NULL,
      quantidade_consumida REAL NOT NULL DEFAULT 1,
      PRIMARY KEY (id_item, id_pessoa),
      FOREIGN KEY (id_item)
        REFERENCES itens(id)
        ON DELETE CASCADE,
      FOREIGN KEY (id_pessoa)
        REFERENCES pessoas(id)
        ON DELETE CASCADE
    );
  `);

  const colunasItemPessoas = await db.getAllAsync<{ name: string }>(
    "PRAGMA table_info(item_pessoas)",
  );
  if (!colunasItemPessoas.some(({ name }) => name === "quantidade_consumida")) {
    await db.execAsync(`
      ALTER TABLE item_pessoas
      ADD COLUMN quantidade_consumida REAL NOT NULL DEFAULT 1;

      UPDATE item_pessoas
      SET quantidade_consumida = COALESCE(
        (
          SELECT itens.quantidade / COUNT(*)
          FROM itens
          INNER JOIN item_pessoas AS relacao
            ON relacao.id_item = itens.id
          WHERE itens.id = item_pessoas.id_item
        ),
        1
      );
    `);
  }
  console.log("Criação do banco e tabelas finalizadas.");
}
