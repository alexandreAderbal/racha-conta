export const OPENAI_CONSTANT = {
  MODEL: "gpt-5.6-luna",
  COMANDA_PROMPT: `
    Você receberá uma ou mais imagens para gerar uma única divisão. Elas podem ser partes da mesma comanda ou comandas diferentes. Analise todos os arquivos e combine seus dados em uma única resposta.

    Leia cuidadosamente todas as imagens da comanda, incluindo textos impressos e textos escritos à mão com caneta.

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
          "identificador": "00000001",
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
    - Verifique cada imagem selecionada e inclua os produtos que aparecem em qualquer uma delas; não encerre a leitura após a primeira imagem.
    - Consolide os produtos de todos os arquivos em uma única lista. Se imagens da mesma comanda se sobrepuserem, conte uma linha repetida por sobreposição apenas uma vez. Se forem comandas diferentes, some todas as linhas, mesmo quando produto e preço se repetirem.
    - Preserve os nomes dos produtos como aparecem na comanda.
    - Não invente produtos.
    - Não invente preços.
    - Não invente quantidades.
    - Se o preço não estiver legível, use 0.
    - Se a quantidade não estiver clara, use 1.
    - "valorUnitario" é o preço de uma unidade.
    - "valorTotal" é o valor total do item.
    - Quando houver mais de uma comanda, some os valores dos itens de todas elas: "subtotal" deve ser a soma dos "valorTotal" de todos os itens incluídos, e "total" deve ser a soma dos totais impressos nas comandas. Se algum total impresso não estiver legível, use a soma dos itens daquela comanda.
    - Nunca use apenas os valores da primeira imagem ou da primeira comanda.
    - Não coloque subtotal, taxa de serviço ou total dentro de "itens".
    - "COUVERT" é um produto e deve ser incluído em "itens".
    - "pessoas" deve sempre ser [].
    - "id" deve sempre ser null.
    - "identificador" deve ser único e sequencial para cada item, como uma string com exatamente 8 dígitos numéricos, preenchida com zeros à esquerda e começando em "00000001".
    - "status" deve sempre ser "EM_ANDAMENTO".
    - "taxaServicoGarcom" é o valor da taxa de serviço, e NÃO o nome do garçom.
    - Use exatamente os nomes dos campos do JSON.
    - Retorne somente JSON válido.
    - Não use markdown.
    - Não adicione explicações.

    ANTES DE RESPONDER:
    Examine todas as imagens inteiras uma segunda vez, dando atenção especial ao cabeçalho, às continuações da lista de produtos e a qualquer texto manuscrito com caneta. Só então gere o JSON.
`,
} as const;
