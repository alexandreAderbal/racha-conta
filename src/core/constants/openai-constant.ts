export const OPENAI_CONSTANT = {
  MODEL: "gpt-5.6-luna",
  COMANDA_PROMPT: `
    Leia cuidadosamente toda a imagem da comanda, incluindo textos impressos e textos escritos à mão com caneta.

    PRIORIDADE:
    1. Leia o NOME DO RESTAURANTE no cabeçalho, logotipo ou parte superior da comanda.
    2. Leia a MESA.
    3. Leia o NOME DO GARÇOM, mesmo que esteja escrito À MÃO com caneta.
    4. Depois identifique os produtos e valores.

    Retorne SOMENTE este JSON:

    {
      "id": null,
      "restaurante": "",
      "mesa": "",
      "garcom": "",
      "subtotal": 0,
      "taxaServicoGarcom": 0,
      "total": 0,
      "status": "EM_ANDAMENTO",
      "itens": [
        {
          "id": null,
          "descricao": "",
          "quantidade": 1,
          "valorUnitario": 0,
          "valorTotal": 0,
          "pessoas": []
        }
      ]
    }

    REGRAS:

    - O campo "restaurante" deve conter o nome do estabelecimento encontrado na imagem.
    - Procure o restaurante principalmente no topo, cabeçalho, logotipo e rodapé da comanda.
    - O campo "mesa" deve conter o número ou nome da mesa.
    - O campo "garcom" deve conter o nome escrito ou impresso do garçom.
    - O garçom pode estar escrito à mão com caneta. Leia cuidadosamente a escrita manuscrita.
    - Não ignore textos escritos à mão.
    - Diferencie escrita à mão de riscos, rabiscos ou números.
    - Se uma palavra manuscrita estiver parcialmente legível, tente identificar o nome mais provável somente com base no que realmente está visível.
    - Nunca invente um nome.
    - Se não for possível ler o nome, use "".
    - Identifique TODOS os produtos.
    - Preserve os nomes dos produtos como aparecem na comanda.
    - Não invente produtos.
    - Não invente preços.
    - Não invente quantidades.
    - Se o preço não estiver legível, use 0.
    - Se a quantidade não estiver clara, use 1.
    - "valorUnitario" é o preço de uma unidade.
    - "valorTotal" é o valor total do item.
    - Não coloque subtotal, taxa de serviço ou total dentro de "itens".
    - "COUVERT" é um produto e deve ser incluído em "itens".
    - "pessoas" deve sempre ser [].
    - "id" deve sempre ser null.
    - "status" deve sempre ser "EM_ANDAMENTO".
    - "taxaServicoGarcom" é o valor da taxa de serviço, e NÃO o nome do garçom.
    - Use exatamente os nomes dos campos do JSON.
    - Retorne somente JSON válido.
    - Não use markdown.
    - Não adicione explicações.

    ANTES DE RESPONDER:
    Examine visualmente a imagem inteira uma segunda vez, dando atenção especial ao cabeçalho e a qualquer texto manuscrito com caneta. Só então gere o JSON.
`,
} as const;
