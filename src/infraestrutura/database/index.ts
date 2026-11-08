import * as SQLite from "expo-sqlite";

export const dbPromise = SQLite.openDatabaseAsync("racha_conta_07.db");

export async function inicializarBanco() {
  console.log("Iniciando criação do banco e tabelas.");
  const db = await dbPromise;

  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS comandas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mesa TEXT NOT NULL,
      total REAL NOT NULL DEFAULT 0,
      subtotal REAL NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'EM_ANDAMENTO',
      criado_em TEXT NOT NULL,
      finalizada_em TEXT
    );

    CREATE TABLE IF NOT EXISTS configuracoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chave TEXT NOT NULL UNIQUE,
      valor TEXT NOT NULL
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
      identificador TEXT NOT NULL,
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

  const colunasItens = await db.getAllAsync<{ name: string }>(
    "PRAGMA table_info(itens)",
  );
  const possuiIdentificador = colunasItens.some(
    (coluna) => coluna.name === "identificador",
  );

  if (!possuiIdentificador) {
    await db.execAsync("ALTER TABLE itens ADD COLUMN identificador TEXT");
  }

  await db.execAsync(`
    UPDATE itens
    SET identificador = printf('%08d', id)
    WHERE identificador IS NULL OR TRIM(identificador) = '';

    CREATE UNIQUE INDEX IF NOT EXISTS idx_itens_comanda_identificador
    ON itens (id_comanda, identificador);
  `);

  console.log("Criação do banco e tabelas finalizadas.");
}
