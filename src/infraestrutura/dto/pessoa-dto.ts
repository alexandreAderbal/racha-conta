export class PessoaDTO {
  id?: number | null;
  nome!: string;
  selecionado?: boolean;

  static criar(nome: string): PessoaDTO {
    const pessoa = new PessoaDTO();
    pessoa.nome = nome;
    pessoa.selecionado = true;
    return pessoa;
  }
}
