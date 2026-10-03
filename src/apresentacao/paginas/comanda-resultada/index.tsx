import ContainerPage from "@Componentes/containers/container-page";
import { NumberUtil } from "src/core/utils/number-util";
import { FlatList } from "react-native";
import { useEffect } from "react";
import {
  Avatar,
  LabelTotal,
  Linha,
  LinhaValor,
  NomePessoa,
  PessoaIdentificacao,
  ResumoTotal,
  Rodape,
  SucessoContainer,
  TextoLinha,
  TituloSecao,
  TotalPessoa,
  ValorLinha,
  ValorTotal,
} from "./styles";
import { Card, CardTopo } from "@Componentes/containers/container-card";
import { Descricao, TituloSucesso } from "@Componentes/texto";
import { Conteudo } from "@Componentes/containers/containers";
import { useDivisao } from "@Hooks/use-divisao";
import { useComanda } from "@Hooks/use-comanda";
import { Icon } from "@Componentes/icon";
import { BTN } from "@Componentes/btns";

export default function ComandaResultado() {
  const { dividirConta, compartilharResultado, divisao } = useDivisao();
  const { salvarComanda, comanda } = useComanda();

  useEffect(() => {
    if (comanda) dividirConta(comanda);
  }, []);

  return (
    <ContainerPage>
      <Conteudo>
        <SucessoContainer>
          <TituloSucesso>Conta dividida!</TituloSucesso>
          <Descricao>Veja quanto cada pessoa deve pagar.</Descricao>
        </SucessoContainer>
        <ResumoTotal>
          <LabelTotal>Total da conta</LabelTotal>
          <ValorTotal>{NumberUtil.formatarValor(comanda?.total)}</ValorTotal>
        </ResumoTotal>

        <TituloSecao>Divisão por pessoa</TituloSecao>

        <FlatList
          data={divisao}
          keyExtractor={(item) => item.nome}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          renderItem={({ item }) => (
            <Card>
              <CardTopo>
                <PessoaIdentificacao>
                  <Avatar>
                    <Icon nome="account" size={22} cor="#0F766E" />
                  </Avatar>
                  <NomePessoa>{item.nome}</NomePessoa>
                </PessoaIdentificacao>
                <TotalPessoa>
                  {NumberUtil.formatarValor(item.total)}
                </TotalPessoa>
              </CardTopo>
              <Linha />
              {item.itens.map((produto) => (
                <LinhaValor key={produto.id}>
                  <TextoLinha>{produto.descricao}</TextoLinha>
                  <ValorLinha>
                    {NumberUtil.formatarValor(produto.valor)}
                  </ValorLinha>
                </LinhaValor>
              ))}
            </Card>
          )}
        />
      </Conteudo>
      <Rodape>
        {!comanda?.id ? (
          <BTN.Sucesso
            icon="check"
            label="Salvar comanda"
            action={salvarComanda}
          />
        ) : (
          <BTN.Sucesso
            icon="share-variant"
            label="Compartilhar"
            action={() => compartilharResultado(comanda)}
          />
        )}
      </Rodape>
    </ContainerPage>
  );
}
