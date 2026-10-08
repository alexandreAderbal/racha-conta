import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import Alerta from "@Componentes/alerta";
import type { TipoAlerta } from "@Componentes/alerta";

type AcaoAlerta = {
  texto: string;
  action: () => void;
};

export type OpcoesAlerta = {
  titulo: string;
  mensagem?: string;
  tipo?: TipoAlerta;
  children?: ReactNode;
  acaoPrincipal?: AcaoAlerta;
  acaoSecundaria?: AcaoAlerta;
};

type AlertaContextValue = {
  mostrarAlerta: (opcoes: OpcoesAlerta) => void;
  fecharAlerta: () => void;
};

const AlertaContext = createContext<AlertaContextValue | null>(null);

export function AlertaProvider({ children }: { children: ReactNode }) {
  const [opcoes, setOpcoes] = useState<OpcoesAlerta | null>(null);
  const fecharAlerta = useCallback(() => setOpcoes(null), []);
  const mostrarAlerta = useCallback(
    (novasOpcoes: OpcoesAlerta) => setOpcoes(novasOpcoes),
    [],
  );
  const contexto = useMemo(
    () => ({ mostrarAlerta, fecharAlerta }),
    [mostrarAlerta, fecharAlerta],
  );

  function criarAcao(acao?: AcaoAlerta): AcaoAlerta | undefined {
    if (!acao) return undefined;

    return {
      texto: acao.texto,
      action: () => {
        fecharAlerta();
        acao.action();
      },
    };
  }

  return (
    <AlertaContext.Provider value={contexto}>
      {children}
      <Alerta
        visivel={opcoes !== null}
        titulo={opcoes?.titulo ?? ""}
        mensagem={opcoes?.mensagem}
        tipo={opcoes?.tipo}
        acaoPrincipal={criarAcao(opcoes?.acaoPrincipal)}
        acaoSecundaria={criarAcao(opcoes?.acaoSecundaria)}
        fechar={fecharAlerta}
      >
        {opcoes?.children}
      </Alerta>
    </AlertaContext.Provider>
  );
}

export function useAlerta() {
  const contexto = useContext(AlertaContext);

  if (!contexto) {
    throw new Error("useAlerta deve ser usado dentro de AlertaProvider.");
  }

  return contexto;
}
