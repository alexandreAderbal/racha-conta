import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { atualizarComanda } from "@Store/slices/comanda-slice";
import { useNavigation } from "@react-navigation/native";
import { ComandaDTO } from "@Infra-dto/comanda-dto";
import { useAppDispatch } from "@Store/hooks";
import { SERVICE } from "@Infra-service";
import { useState } from "react";

export function useComandaLista() {
  const [listaComanda, setListaComanda] = useState<ComandaDTO[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const buscarComandas = async () => {
    const resultado = await SERVICE.comanda.buscarTodas();
    setListaComanda(resultado);
  };

  const buscarComanda = async (idComanda?: number | null) => {
    var resultado = null;
    if (idComanda) {
      resultado = await SERVICE.comanda.buscarComanda(idComanda);
    }
    if (resultado) {
      dispatch(atualizarComanda(resultado));
      navigation.navigate("ComandaResultado");
    }
  };

  return { listaComanda, buscarComandas, buscarComanda };
}
