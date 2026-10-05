export class NumberUtil {
  public static formatarValor(valor: number = 0) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  public static formatarQuantidade(quantidade: number, size?: number) {
    return quantidade.toLocaleString("pt-BR", {
      maximumFractionDigits: size ? size : 2,
    });
  }
}
