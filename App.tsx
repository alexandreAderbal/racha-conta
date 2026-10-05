import { Rotas } from "@Rotas";
import { Theme } from "@Theme";
import { Store } from "@Store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { inicializarBanco } from "@Infra-data-base/index";
import { Spinner } from "@Componentes/spinner";
import { useFonts } from "@expo-google-fonts/inter";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { Inter_800ExtraBold } from "@expo-google-fonts/inter/800ExtraBold";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

void SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontesCarregadas, erroFontes] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    ...MaterialCommunityIcons.font,
  });

  useEffect(() => {
    inicializarBanco();
  }, []);

  useEffect(() => {
    if (fontesCarregadas || erroFontes) {
      void SplashScreen.hideAsync();
    }
  }, [fontesCarregadas, erroFontes]);

  if (!fontesCarregadas && !erroFontes) return null;

  return (
    <Provider store={Store}>
      <ThemeProvider theme={Theme}>
        <Rotas />
        <Spinner />
      </ThemeProvider>
    </Provider>
  );
}
