import { ItemDTO } from "@Infra-dto/item-dto";
import { FlatList, View } from "react-native";
import { useRef, useState } from "react";
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
  BotaoEditarMesa,
  ErroNomeMesa,
  Input,
  Label,
} from "./styles";
import { Card, CardTopo } from "@Componentes/containers/container-card";
import { useComanda } from "@Hooks/use-comanda";
import ComandaPessoas from "./comanda-pessoas";
import { Icon } from "@Componentes/icon";
import Calcular from "./calcular";
import Modal, { ModalRef } from "@Componentes/modal";
import { BTN } from "@Componentes/btns";

export function Comanda() {
  const { comanda, atualizarTaxaGarcom, atualizarNomeMesa } = useComanda();
  const modalEditarMesaRef = useRef<ModalRef>(null);
  const [nomeMesaEditado, setNomeMesaEditado] = useState("");
  const [erroNomeMesa, setErroNomeMesa] = useState(false);
  const itensSemPessoa =
    comanda?.itens
      .filter((item) => !item.pessoas?.length)
      .map((item) => item.descricao) ?? [];

  const valorTotal = comanda?.itens.reduce(
    (total, item) => total + item.quantidade * item.valorUnitario,
    0,
  );

  function abrirEdicaoNomeMesa() {
    setNomeMesaEditado(comanda?.mesa ?? "");
    setErroNomeMesa(false);
    modalEditarMesaRef.current?.titulo("Editar nome da mesa");
    modalEditarMesaRef.current?.abrir();
  }

  function salvarNomeMesa() {
    const nome = nomeMesaEditado.trim();
    if (!nome) {
      setErroNomeMesa(true);
      return;
    }

    atualizarNomeMesa(nome);
    modalEditarMesaRef.current?.fechar();
  }

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
    <View style={{ flex: 1 }}>
      <MesaInfo>
        <MesaTitulo numberOfLines={1}>Mesa: {comanda?.mesa}</MesaTitulo>
        <BotaoEditarMesa
          onPress={abrirEdicaoNomeMesa}
          accessibilityRole="button"
          accessibilityLabel="Editar nome da mesa"
        >
          <Icon nome="pencil-outline" size={20} cor={Theme.colors.primary} />
        </BotaoEditarMesa>
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
        style={{ flex: 1 }}
        data={comanda?.itens}
        keyExtractor={(item, index) => `${item.id ?? item.descricao}_${index}`}
        renderItem={renderItem}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 120,
        }}
      />

      <Calcular action={atualizarTaxaGarcom} itensSemPessoa={itensSemPessoa} />

      <Modal ref={modalEditarMesaRef}>
        <Label>Nome da mesa</Label>
        <Input
          value={nomeMesaEditado}
          onChangeText={(valor) => {
            setNomeMesaEditado(valor);
            if (valor.trim()) setErroNomeMesa(false);
          }}
          placeholder="Ex.: Mesa 12"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="words"
          returnKeyType="done"
          maxLength={50}
        />
        {erroNomeMesa ? (
          <ErroNomeMesa>Informe o nome da mesa para continuar.</ErroNomeMesa>
        ) : null}
        <BTN.Primary
          action={salvarNomeMesa}
          icon="content-save-outline"
          label="Salvar nome"
        />
      </Modal>
    </View>
  );
}
