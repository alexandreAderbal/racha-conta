import {
  BotaoPessoa,
  Input,
  Label,
  LinhaPessoaControle,
  LinhaPessoas,
  QuantidadeInput,
  QuantidadeLabel,
  TextoPessoa,
  TextoPessoas,
} from "./styles";
import { useComandaPessoas } from "@Hooks/use-comanda-pessoas";
import { NumberUtil } from "src/core/utils/number-util";
import { ScrollView, View } from "react-native";
import { ItemDTO } from "@Infra-dto/item-dto";
import Alerta from "@Componentes/alerta";
import { Icon } from "@Componentes/icon";
import { BTN } from "@Componentes/btns";
import Modal from "@Componentes/modal";
import { Theme } from "@Theme";

interface IProps {
  item: ItemDTO;
}

export default function ComandaPessoas({ item }: IProps) {
  const {
    abrirModal,
    modalRef,
    pessoas,
    selecionarPessoa,
    todasPessoasSelecionadas,
    alternarTodasPessoas,
    confirmarRemocaoPessoa,
    quantidadesDigitadas,
    nome,
    setNome,
    addPessoa,
    pessoaParaRemover,
    cancelarRemocaoPessoa,
    removerPessoaConfirmada,
    setQuantidadesDigitadas,
    salvarQuantidade,
  } = useComandaPessoas(item);

  return (
    <View>
      <LinhaPessoas>
        <Icon
          nome="account-group-outline"
          cor={Theme.colors.textSecondary}
          size={20}
        />

        <TextoPessoas>
          {item.pessoas.length === 0
            ? "Nenhuma pessoa atribuída"
            : `${item.pessoas.length} ${
                item.pessoas.length === 1 ? "pessoa" : "pessoas"
              } consumiram`}
        </TextoPessoas>
      </LinhaPessoas>

      <BTN.Light
        action={abrirModal}
        icon="account-plus-outline"
        label={
          item.pessoas.length === 0 ? "Atribuir pessoa" : "Alterar pessoas"
        }
      />

      <Alerta
        visivel={pessoaParaRemover !== null}
        tipo="erro"
        titulo={
          pessoaParaRemover
            ? `Remover ${pessoaParaRemover.nome}?`
            : "Remover pessoa?"
        }
        mensagem="Essa pessoa será removida da lista e de todos os itens da comanda."
        fechar={cancelarRemocaoPessoa}
        acaoSecundaria={{
          texto: "Cancelar",
          action: cancelarRemocaoPessoa,
        }}
        acaoPrincipal={{
          texto: "Remover pessoa",
          action: removerPessoaConfirmada,
        }}
      />

      <Modal ref={modalRef}>
        <ScrollView
          style={{ maxHeight: 260 }}
          keyboardShouldPersistTaps="always"
        >
          {pessoas.length > 0 && (
            <>
              <Label>Pessoas da mesa</Label>
              <BotaoPessoa
                selecionada={todasPessoasSelecionadas}
                onPress={alternarTodasPessoas}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: todasPessoasSelecionadas }}
              >
                <Icon
                  nome={
                    todasPessoasSelecionadas
                      ? "checkbox-marked"
                      : "checkbox-blank-outline"
                  }
                  cor={
                    todasPessoasSelecionadas
                      ? Theme.colors.primary
                      : Theme.colors.textSecondary
                  }
                  size={24}
                />
                <TextoPessoa>Selecionar todas</TextoPessoa>
              </BotaoPessoa>
            </>
          )}

          {pessoas.map((pessoa) => {
            const pessoaDoItem = item.pessoas.find(
              (pessoaItem) => pessoaItem.nome === pessoa.nome,
            );
            const selecionada = Boolean(pessoaDoItem);

            return (
              <LinhaPessoaControle key={pessoa.nome}>
                <BotaoPessoa
                  selecionada={selecionada}
                  onPress={() => selecionarPessoa(pessoa)}
                  onLongPress={() => confirmarRemocaoPessoa(pessoa)}
                  accessibilityHint="Toque longo para remover esta pessoa da comanda"
                >
                  <Icon
                    nome={
                      selecionada ? "checkbox-marked" : "checkbox-blank-outline"
                    }
                    cor={
                      selecionada
                        ? Theme.colors.primary
                        : Theme.colors.textSecondary
                    }
                    size={24}
                  />

                  <TextoPessoa>{pessoa.nome}</TextoPessoa>
                </BotaoPessoa>

                {selecionada && pessoaDoItem && (
                  <>
                    <QuantidadeLabel>Qtd.</QuantidadeLabel>
                    <QuantidadeInput
                      value={
                        quantidadesDigitadas[pessoa.nome] ??
                        NumberUtil.formatarQuantidade(
                          pessoaDoItem.quantidadeConsumida ?? 0,
                        )
                      }
                      onChangeText={(valor) =>
                        setQuantidadesDigitadas((valores) => ({
                          ...valores,
                          [pessoa.nome]: valor,
                        }))
                      }
                      onEndEditing={({ nativeEvent }) =>
                        salvarQuantidade(pessoa, nativeEvent.text)
                      }
                      keyboardType="decimal-pad"
                      accessibilityLabel={`Quantidade consumida por ${pessoa.nome}`}
                    />
                  </>
                )}
              </LinhaPessoaControle>
            );
          })}
        </ScrollView>

        <Label>Adicionar nova pessoa</Label>

        <Input
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome"
          placeholderTextColor="#9CA3AF"
        />

        <BTN.Primary action={addPessoa} icon="plus" label="Adicionar" />
      </Modal>
    </View>
  );
}
