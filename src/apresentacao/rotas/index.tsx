import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import ComandaResultado from "@Paginas/comanda-resultada";
import { SemInternet } from "@Paginas/sem-internet";
import { useInternet } from "@Hooks/use-internet";
import ComandaLista from "@Paginas/comanda-lista";
import { Comanda } from "@Paginas/comanda";
import { Camera } from "@Paginas/camera";
import Header from "@Componentes/header";
import { Home } from "@Paginas/home";
import { Theme } from "@Theme";

const Stack = createNativeStackNavigator();
const temaNavegacao = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Theme.colors.background,
  },
};

export function Rotas() {
  const { conectado, verificarConexao } = useInternet();

  if (!conectado) {
    return <SemInternet verificarConexao={verificarConexao} />;
  }
  return (
    <NavigationContainer theme={temaNavegacao}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: Theme.colors.background },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comanda"
          component={Comanda}
          options={{
            header: (props) => <Header {...props} />,
            title: "Comanda",
          }}
        />
        <Stack.Screen
          name="ComandaResultado"
          component={ComandaResultado}
          options={{
            header: (props) => <Header {...props} />,
            title: "Divisão",
          }}
        />
        <Stack.Screen
          name="ComandaLista"
          component={ComandaLista}
          options={{
            header: (props) => <Header {...props} />,
            title: "Comandas",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
