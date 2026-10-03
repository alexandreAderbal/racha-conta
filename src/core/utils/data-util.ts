export class DataUtil {
  static formatar(
    data: Date | string | null | undefined,
    formato: string = "dd/MM/yyyy HH:mm",
  ): string | null {
    if (!data) {
      return null;
    }
    const dataObj = typeof data === "string" ? new Date(data) : data;
    const valores: Record<string, string> = {
      dd: String(dataObj.getDate()).padStart(2, "0"),
      MM: String(dataObj.getMonth() + 1).padStart(2, "0"),
      yyyy: String(dataObj.getFullYear()),
      HH: String(dataObj.getHours()).padStart(2, "0"),
      mm: String(dataObj.getMinutes()).padStart(2, "0"),
      ss: String(dataObj.getSeconds()).padStart(2, "0"),
    };
    return formato.replace(/yyyy|MM|dd|HH|mm|ss/g, (valor) => valores[valor]);
  }
}
