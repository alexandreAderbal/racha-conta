import ContainerPage from "@Componentes/containers/container-page";
import { ItemDTO } from "@Infra-dto/item-dto";
import { FlatList } from "react-native";
import { Theme } from "@Theme";
import {
  Descricao,
  IconeProduto,
  InfoProduto,
  MesaInfo,
  MesaTitulo,
  Quantidade,
  Resumo,
  ResumoDivisor,
  ResumoItem,
  ResumoLabel,
  ResumoValor,
  Separador,
  TituloSecao,
  Valor,
} from "./styles";
import { Card, CardTopo } from "@Componentes/containers/container-card";
import { useComanda } from "@Hooks/use-comanda";
import ComandaPessoas from "./comanda-pessoas";
import { Icon } from "@Componentes/icon";
import Calcular from "./calcular";

export function Comanda() {
  const { comanda, atualizarTaxaGarcom } = useComanda();

  const valorTotal = comanda?.itens.reduce(
    (total, item) => total + item.quantidade * item.valorUnitario,
    0,
  );

  function renderItem({ item }: { item: ItemDTO }) {
    const valorTotalItem = item.quantidade * item.valorUnitario;

    return (
      <Card>
        <CardTopo>
          <IconeProduto>
            <Icon nome="food-outline" size={24} cor={Theme.colors.primary} />
          </IconeProduto>

          <InfoProduto>
            <Descricao>{item.descricao}</Descricao>

            <Quantidade>
              {item.quantidade} x R${" "}
              {item.valorUnitario.toFixed(2).replace(".", ",")}
            </Quantidade>
          </InfoProduto>

          <Valor>R$ {valorTotalItem.toFixed(2).replace(".", ",")}</Valor>
        </CardTopo>

        <Separador />
        <ComandaPessoas item={item} />
      </Card>
    );
  }

  return (
    <ContainerPage>
      <MesaInfo>
        <MesaTitulo>Mesa: {comanda?.mesa}</MesaTitulo>
      </MesaInfo>

      <Resumo>
        <ResumoItem>
          <ResumoLabel>Itens</ResumoLabel>
          <ResumoValor>{comanda?.itens.length}</ResumoValor>
        </ResumoItem>

        <ResumoDivisor />

        <ResumoItem>
          <ResumoLabel>Total</ResumoLabel>
          <ResumoValor>
            R$ {valorTotal ? valorTotal.toFixed(2).replace(".", ",") : "0,00"}
          </ResumoValor>
        </ResumoItem>
      </Resumo>

      <TituloSecao>Produtos consumidos</TituloSecao>

      <FlatList
        data={comanda?.itens}
        keyExtractor={(item, index) => `${item.id ?? item.descricao}_${index}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 120,
        }}
      />

      <Calcular action={atualizarTaxaGarcom} />
    </ContainerPage>
  );
}
