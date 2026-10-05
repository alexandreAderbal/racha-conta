import { useSelecionarArquivos } from "@Hooks/use-selecionar-arquivos";
import { BTN } from "@Componentes/btns";

export function SelecionarArquivos() {
  const { selecionarArquivos } = useSelecionarArquivos();

  return (
    <BTN.Primary
      icon="upload-box-outline"
      action={selecionarArquivos}
      label="Selecione arquivo(s)"
    />
  );
}
