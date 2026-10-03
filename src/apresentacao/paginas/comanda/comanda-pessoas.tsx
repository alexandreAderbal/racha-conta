import {
  BotaoPessoa,
  Input,
  Label,
  LinhaPessoas,
  TextoPessoa,
  TextoPessoas,
} from "./styles";
import Modal, { ModalRef } from "@Componentes/modal";
import { PessoaDTO } from "@Infra-dto/pessoa-dto";
import { ScrollView, View } from "react-native";
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
  const { pessoas, adicionarPessoa, marcarPessoa, marcarPessoas } =
    useComanda();
  const [nome, setNome] = useState("");

  function abrirModal() {
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
          {pessoas.map((pessoa, index) => {
            return (
              <BotaoPessoa
                key={index}
                selecionada={pessoa.selecionado || false}
                onPress={() => selecionarPessoa(pessoa)}
              >
                <Icon
                  nome={
                    pessoa.selecionado
                      ? "checkbox-marked"
                      : "checkbox-blank-outline"
                  }
                  cor={
                    pessoa.selecionado
                      ? Theme.colors.primary
                      : Theme.colors.textSecondary
                  }
                  size={24}
                />

                <TextoPessoa>{pessoa.nome}</TextoPessoa>
              </BotaoPessoa>
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
