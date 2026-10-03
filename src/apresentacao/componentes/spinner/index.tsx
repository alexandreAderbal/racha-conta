import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

export function Spinner() {
  const rotacao = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(1)).current;
  const [pontos, setPontos] = useState("");
  const { spinner } = useSpinner();

  useEffect(() => {
    const rotation = Animated.loop(
      Animated.timing(rotacao, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(escala, {
          toValue: 1.06,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(escala, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    rotation.start();
    pulse.start();

    return () => {
      rotation.stop();
      pulse.stop();
    };
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setPontos((valor) => {
        if (valor === "...") return "";
        return valor + ".";
      });
    }, 450);

    return () => clearInterval(intervalo);
  }, []);

  const rotate = rotacao.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!spinner.ativo) return;

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
            <MaterialCommunityIcons
              name="account-multiple-outline"
              size={42}
              color={Theme.colors.primary}
            />
          </IconArea>
        </Animated.View>
      </Loader>

      <Mensagem>
        Aguarde
        <Pontos>{pontos}</Pontos>
      </Mensagem>

      <SubMensagem> {spinner.msg}</SubMensagem>
    </Container>
  );
}
