import ContainerPage from "@Componentes/containers/container-page";
import { FlatList } from "react-native";
import { useEffect } from "react";
import {
  Data,
  MesaContainer,
  MesaIcon,
  MesaInfo,
  NomeMesa,
  Pessoas,
  Separador,
  StatusContainer,
  StatusIcon,
  StatusTexto,
  TextoPessoas,
  Valor,
} from "./styles";
import { Subtitulo, Titulo } from "@Componentes/texto";
import { Conteudo } from "@Componentes/containers/containers";
import {
  Card,
  CardRodape,
  CardTopo,
} from "@Componentes/containers/container-card";
import { Icon } from "@Componentes/icon";
import { DataUtil } from "src/core/utils/data-util";
import { useComandaLista } from "@Hooks/use-comanda-lista";

export default function ComandaLista() {
  const { buscarComandas, listaComanda, buscarComanda } = useComandaLista();

  useEffect(() => {
    buscarComandas();
  }, []);

  function formatarValor(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <ContainerPage>
      <Conteudo>
        <Titulo>Minhas comandas</Titulo>
        <Subtitulo>Acompanhe suas contas e divisões.</Subtitulo>

        <FlatList
          data={listaComanda}
          keyExtractor={(item, index) => `${item.mesa}_${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item }) => (
            <Card activeOpacity={0.85} onPress={() => buscarComanda(item.id)}>
              <CardTopo>
                <MesaContainer>
                  <MesaIcon>
                    <Icon nome="table-furniture" size={22} cor="#0F766E" />
                  </MesaIcon>

                  <MesaInfo>
                    <NomeMesa>{item.mesa}</NomeMesa>

                    <Data>{DataUtil.formatar(item.criadoEm)}</Data>
                  </MesaInfo>
                </MesaContainer>

                <Icon nome="chevron-right" size={25} cor="#9CA3AF" />
              </CardTopo>

              <Separador />

              <CardRodape>
                <Pessoas>
                  <Icon nome="account-group-outline" size={20} cor="#6B7280" />
                  <TextoPessoas>
                    {item.quantidadePessoas}{" "}
                    {item.quantidadePessoas && item.quantidadePessoas > 1
                      ? "pessoa"
                      : "pessoas"}
                  </TextoPessoas>
                </Pessoas>

                <Valor>{formatarValor(item.total)}</Valor>
              </CardRodape>

              <StatusContainer finalizada={item.status === "FINALIZADA"}>
                <StatusIcon finalizada={item.status === "FINALIZADA"}>
                  <Icon
                    nome={
                      item.status === "FINALIZADA" ? "check" : "clock-outline"
                    }
                    size={15}
                    cor={item.status === "FINALIZADA" ? "#15803D" : "#B45309"}
                  />
                </StatusIcon>

                <StatusTexto finalizada={item.status === "FINALIZADA"}>
                  {item.status === "FINALIZADA" ? "Finalizada" : "Em andamento"}
                </StatusTexto>
              </StatusContainer>
            </Card>
          )}
        />
      </Conteudo>
    </ContainerPage>
  );
}
