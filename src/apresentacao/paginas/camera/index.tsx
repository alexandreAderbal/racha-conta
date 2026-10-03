import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import { Icon } from "@Componentes/icon";
import { UTILS } from "src/core/utils";
import { styles } from "./styles";
import { Theme } from "@Theme";
import { useComanda } from "@Hooks/use-comanda";
import { useSpinner } from "@Hooks/use-spinner";
import { SERVICE } from "@Infra-service";

export function Camera({ navigation }: any) {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [flashLigado, setFlashLigado] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [tirandoFoto, setTirandoFoto] = useState(false);
  const { adicionarComanda } = useComanda();
  const { ativarSpinner, desativarSpinner } = useSpinner();

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.carregando}>Preparando câmera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissao}>
          <View style={styles.icone}>
            <Icon
              nome="camera-off-outline"
              size={48}
              cor={Theme.colors.primary}
            />
          </View>

          <Text style={styles.titulo}>Permissão da câmera</Text>

          <Text style={styles.descricao}>
            Precisamos acessar sua câmera para fotografar a comanda.
          </Text>

          <TouchableOpacity
            style={styles.botaoPermissao}
            onPress={requestPermission}
          >
            <Icon nome="camera" size={22} cor="#FFFFFF" />

            <Text style={styles.textoBotao}>Permitir câmera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoVoltarPermissao}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textoVoltar}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async function tirarFoto() {
    try {
      ativarSpinner();
      if (!cameraRef.current || tirandoFoto) {
        return;
      }
      setTirandoFoto(true);

      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        skipProcessing: false,
      });

      if (uri) {
        const base64 = await UTILS.file.base64(uri);
        adicionarComanda(await SERVICE.openAIService.analisar([base64]));
        navigation.navigate("Comanda");
      }
    } catch (error) {
      console.error("Erro ao tirar foto:", error);

      Alert.alert("Erro", "Não foi possível tirar a foto.");
    } finally {
      setTirandoFoto(false);
      desativarSpinner();
    }
  }

  function trocarCamera() {
    setFacing((atual) => (atual === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        flash={flashLigado ? "on" : "off"}
        style={styles.camera}
        facing={facing}
      />

      <TouchableOpacity
        style={styles.botaoFechar}
        onPress={() => navigation.goBack()}
      >
        <Icon nome="arrow-left" size={28} cor="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoTrocar} onPress={trocarCamera}>
        <Icon nome="camera-flip-outline" size={26} cor="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoFlash}
        onPress={() => setFlashLigado((valor) => !valor)}
        activeOpacity={0.8}
      >
        <Icon
          nome={flashLigado ? "flash" : "flash-off"}
          size={26}
          cor="#FFFFFF"
        />
      </TouchableOpacity>

      <View style={styles.controles}>
        <TouchableOpacity
          style={[
            styles.botaoCamera,
            tirandoFoto && styles.botaoCameraDesabilitado,
          ]}
          onPress={tirarFoto}
          disabled={tirandoFoto}
        >
          <View style={styles.botaoCameraInterno}>
            <Icon nome="camera" size={30} cor={Theme.colors.primary} />
          </View>
        </TouchableOpacity>

        <Text style={styles.textoFoto}>Fotografar comanda</Text>
      </View>
    </View>
  );
}
