import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { Theme } from "@Theme";

import {
  Container,
  Loader,
  Anel,
  IconArea,
  Mensagem,
  SubMensagem,
  Pontos,
} from "./styles";
import { useSpinner } from "@Hooks/use-spinner";
import { Icon } from "@Componentes/icon";

export function Spinner() {
  const rotacao = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(1)).current;
  const { spinner } = useSpinner();

  useEffect(() => {
    if (!spinner.ativo) return;

    rotacao.setValue(0);
    escala.setValue(1);

    const rotation = Animated.loop(
      Animated.timing(rotacao, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false,
      }),
    );

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(escala, {
          toValue: 1.06,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
          isInteraction: false,
        }),
        Animated.timing(escala, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
          isInteraction: false,
        }),
      ]),
    );

    rotation.start();
    pulse.start();

    return () => {
      rotation.stop();
      pulse.stop();
    };
  }, [spinner.ativo, rotacao, escala]);

  const rotate = useMemo(
    () =>
      rotacao.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
      }),
    [rotacao],
  );

  if (!spinner.ativo) return null;

  return (
    <Container>
      <Loader>
        <Animated.View
          style={{
            position: "absolute",
            transform: [{ rotate }],
          }}
        >
          <Anel />
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ scale: escala }],
          }}
        >
          <IconArea>
            <Icon
              nome="account-multiple-outline"
              size={42}
              cor={Theme.colors.primary}
            />
          </IconArea>
        </Animated.View>
      </Loader>

      <Mensagem>
        Aguarde
        <PontosAnimados />
      </Mensagem>

      <SubMensagem> {spinner.msg}</SubMensagem>
    </Container>
  );
}

function PontosAnimados() {
  const [pontos, setPontos] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => {
      setPontos((valor) => (valor === "..." ? "" : `${valor}.`));
    }, 450);

    return () => clearInterval(intervalo);
  }, []);

  return <Pontos>{pontos}</Pontos>;
}
