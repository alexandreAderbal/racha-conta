export class DocumentoUtil {
  static formatarCpfCnpj(valor: string): string {
    if (!valor || !/^[A-Za-z0-9.\/\-\s]+$/.test(valor)) return valor;

    const documento = valor.replace(/[.\/\-\s]/g, "").toUpperCase();

    if (this.cpfValido(documento)) {
      return documento.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4",
      );
    }

    if (this.cnpjValido(documento)) {
      return documento.replace(
        /^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})(\d{2})$/,
        "$1.$2.$3/$4-$5",
      );
    }

    // Remove a máscara anterior caso a pessoa ultrapasse o tamanho de CPF/CNPJ.
    const passouDoCpfMascarado =
      documento.length > 11 && /^\d{3}\.\d{3}\.\d{3}-/.test(valor);
    const passouDoCnpjMascarado =
      documento.length > 14 &&
      /^[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-/i.test(valor);

    return passouDoCpfMascarado || passouDoCnpjMascarado
      ? documento
      : valor;
  }

  private static cpfValido(cpf: string): boolean {
    if (!/^\d{11}$/.test(cpf) || /^([0-9])\1{10}$/.test(cpf)) return false;

    const calcularDigito = (base: string) => {
      const soma = [...base].reduce(
        (total, digito, indice) =>
          total + Number(digito) * (base.length + 1 - indice),
        0,
      );
      const resto = (soma * 10) % 11;
      return String(resto === 10 ? 0 : resto);
    };

    return (
      cpf[9] === calcularDigito(cpf.slice(0, 9)) &&
      cpf[10] === calcularDigito(cpf.slice(0, 10))
    );
  }

  private static cnpjValido(cnpj: string): boolean {
    if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpj) || /^0{14}$/.test(cnpj)) {
      return false;
    }

    const primeiroDigito = this.calcularDigitoCnpj(cnpj.slice(0, 12));
    const segundoDigito = this.calcularDigitoCnpj(
      `${cnpj.slice(0, 12)}${primeiroDigito}`,
    );

    return cnpj.slice(12) === `${primeiroDigito}${segundoDigito}`;
  }

  private static calcularDigitoCnpj(base: string): string {
    const pesos = [2, 3, 4, 5, 6, 7, 8, 9];
    const soma = [...base].reverse().reduce(
      (total, caractere, indice) =>
        total + (caractere.charCodeAt(0) - 48) * pesos[indice % pesos.length],
      0,
    );
    const resto = soma % 11;

    return String(resto < 2 ? 0 : 11 - resto);
  }
}
