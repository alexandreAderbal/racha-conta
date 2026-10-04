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
import Modal, { ModalRef } from "@Componentes/modal";
import { PessoaDTO } from "@Infra-dto/pessoa-dto";
import { Alert, ScrollView, View } from "react-native";
import { ItemDTO } from "@Infra-dto/item-dto";
import { useRef, useState } from "react";
import { BTN } from "@Componentes/btns";
import { Icon } from "@Componentes/icon";
import { Theme } from "@Theme";
import { useComanda } from "@Hooks/use-comanda";

interface IProps {
  item: ItemDTO;
}

export default function ComandaPessoas({ item }: IProps) {
  const modalRef = useRef<ModalRef>(null);
  const {
    pessoas,
    adicionarPessoa,
    marcarPessoa,
    marcarPessoas,
    removerPessoa,
    atualizarQuantidadeConsumida,
  } = useComanda();
  const [nome, setNome] = useState("");
  const [quantidadesDigitadas, setQuantidadesDigitadas] = useState<
    Record<string, string>
  >({});

  function formatarQuantidade(quantidade: number) {
    return quantidade.toLocaleString("pt-BR", {
      maximumFractionDigits: 2,
    });
  }

  function abrirModal() {
    setQuantidadesDigitadas({});
    modalRef.current?.titulo("Selecionar pessoas");
    modalRef.current?.abrir();
    marcarPessoas(item.pessoas);
  }

  function addPessoa() {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) return;
    adicionarPessoa(PessoaDTO.criar(nomeLimpo), item.descricao);
    setNome("");
  }

  function selecionarPessoa(pessoa: PessoaDTO) {
    marcarPessoa(pessoa, item.descricao);
  }

  function confirmarRemocaoPessoa(pessoa: PessoaDTO) {
    Alert.alert(
      `Remover ${pessoa.nome}?`,
      "A pessoa será removida da lista e de todos os itens da comanda.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            removerPessoa(pessoa.nome);
            setQuantidadesDigitadas((valores) => {
              const atualizados = { ...valores };
              delete atualizados[pessoa.nome];
              return atualizados;
            });
          },
        },
      ],
    );
  }

  function salvarQuantidade(pessoa: PessoaDTO, valorDigitado: string) {
    const quantidade = Number(valorDigitado.replace(",", "."));
    if (valorDigitado.trim() && Number.isFinite(quantidade)) {
      atualizarQuantidadeConsumida(item.descricao, pessoa.nome, quantidade);
    }
    setQuantidadesDigitadas((valores) => {
      const atualizados = { ...valores };
      delete atualizados[pessoa.nome];
      return atualizados;
    });
  }

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

      <Modal ref={modalRef}>
        <Label>Pessoas da mesa</Label>

        <ScrollView
          style={{ maxHeight: 300 }}
          keyboardShouldPersistTaps="always"
        >
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
                        formatarQuantidade(
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
          returnKeyType="done"
        />

        <BTN.Primary action={addPessoa} icon="plus" label="Adicionar" />
      </Modal>
    </View>
  );
}
