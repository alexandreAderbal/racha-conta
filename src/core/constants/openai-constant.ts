export const OPENAI_CONSTANT = {
  MODEL: "gpt-5.6-luna",
  COMANDA_PROMPT: `
    Analise esta foto de uma comanda de restaurante ou bar.
    Identifique TODOS os produtos encontrados.
    Para cada produto informe:
    - id
    - descrição
    - quantidade
    - valor unitário
    - valor total
    - pessoas
    Também identifique:
    - subtotal
    - taxa de serviço/garçom
    - total
    REGRAS IMPORTANTES:
    1. Não invente produtos.
    2. Não invente preços.
    3. Se um valor não estiver legível, use 0.
    4. Se a quantidade não estiver clara, considere 1.
    5. Não inclua o subtotal como produto.
    6. Não inclua a taxa de serviço como produto.
    7. Não inclua o total como produto.
    8. Preserve os nomes dos produtos como aparecem na comanda.
    9. Cada item deve receber um ID único.
    10. O campo pessoas deve começar como array vazio.
    11. Retorne somente JSON válido.
`,
} as const;
