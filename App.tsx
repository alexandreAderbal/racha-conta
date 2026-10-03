import { Rotas } from "@Rotas";
import { Theme } from "@Theme";
import { Store } from "@Store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { inicializarBanco } from "@Infra-data-base/index";
import { Spinner } from "@Componentes/spinner";

export default function App() {
  useEffect(() => {
    inicializarBanco();
  }, []);

  return (
    <Provider store={Store}>
      <ThemeProvider theme={Theme}>
        <Rotas />
        <Spinner />
      </ThemeProvider>
    </Provider>
  );
}
