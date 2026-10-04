import NetInfo from "@react-native-community/netinfo";
import { useCallback, useEffect, useState } from "react";

export function useInternet() {
  const [conectado, setConectado] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConectado(state.isConnected ?? false);
    });

    return unsubscribe;
  }, []);

  const verificarConexao = useCallback(async () => {
    const state = await NetInfo.fetch();
    setConectado(state.isConnected ?? false);
  }, []);

  return { conectado, verificarConexao };
}
