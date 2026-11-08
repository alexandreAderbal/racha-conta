import { isRunningInExpoGo } from "expo";
import { useEffect, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { SERVICE } from "@Infra-service";
import { Theme } from "@Theme";

type GoogleMobileAds = typeof import("react-native-google-mobile-ads");

const plataformaNativa = Platform.OS === "android" || Platform.OS === "ios";
const anunciosNativos: GoogleMobileAds | undefined =
  plataformaNativa && !isRunningInExpoGo()
    ? require("react-native-google-mobile-ads")
    : undefined;

function obterIdBanner(): string | undefined {
  if (!anunciosNativos || !plataformaNativa) return undefined;
  if (__DEV__) return anunciosNativos.TestIds.BANNER;

  const idApp =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID
      : process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID;
  const idBanner =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID
      : process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_ID;

  return idApp && idBanner ? idBanner : undefined;
}

function obterIdInterstitial(): string | undefined {
  if (!anunciosNativos || !plataformaNativa) return undefined;
  if (__DEV__) return anunciosNativos.TestIds.INTERSTITIAL;

  const idApp =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID
      : process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID;
  const idInterstitial =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_ID
      : process.env.EXPO_PUBLIC_ADMOB_IOS_INTERSTITIAL_ID;

  return idApp && idInterstitial ? idInterstitial : undefined;
}

export default function AdMobBanner() {
  const [sdkInicializado, setSdkInicializado] = useState(false);
  const [privacidadeObrigatoria, setPrivacidadeObrigatoria] = useState(false);
  const idBanner = obterIdBanner();
  const idInterstitial = obterIdInterstitial();

  useEffect(() => {
    if (!idBanner && !idInterstitial) return;

    let ativo = true;
    void SERVICE.adMobService
      .inicializar()
      .then(async (podeSolicitarAnuncios) => {
        if (podeSolicitarAnuncios && idInterstitial) {
          SERVICE.adMobService.precarregarInterstitial(idInterstitial);
        }

        const opcoesObrigatorias =
          await SERVICE.adMobService.privacidadeObrigatoria();
        if (!ativo) return;

        setSdkInicializado(podeSolicitarAnuncios);
        setPrivacidadeObrigatoria(opcoesObrigatorias);
      })
      .catch((erro: unknown) => {
        console.warn(
          "Não foi possível carregar as opções de privacidade:",
          erro,
        );
      });

    return () => {
      ativo = false;
    };
  }, [idBanner, idInterstitial]);

  if ((!idBanner && !idInterstitial) || !anunciosNativos) return null;
  if (!privacidadeObrigatoria && (!idBanner || !sdkInicializado)) return null;

  const { BannerAd, BannerAdSize } = anunciosNativos;

  async function abrirOpcoesPrivacidade() {
    try {
      const resultado = await SERVICE.adMobService.abrirPrivacidade();
      setPrivacidadeObrigatoria(resultado.privacyOptionsRequired);
      setSdkInicializado(resultado.sdkReady);
      if (resultado.sdkReady && idInterstitial) {
        SERVICE.adMobService.precarregarInterstitial(idInterstitial);
      }
    } catch (erro) {
      console.warn("Não foi possível abrir as opções de privacidade:", erro);
    }
  }

  return (
    <View
      style={{
        position: "absolute",
        alignSelf: "center",
        zIndex: 1000,
      }}
    >
      {sdkInicializado && idBanner ? (
        <BannerAd
          unitId={idBanner}
          size={BannerAdSize.LARGE_BANNER}
          onAdFailedToLoad={(erro) => {
            console.warn("Não foi possível carregar o banner do AdMob:", erro);
          }}
        />
      ) : null}
      {privacidadeObrigatoria ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => void abrirOpcoesPrivacidade()}
          style={{ paddingVertical: 6 }}
        >
          <Text
            style={{
              color: "#d7eeee",
              fontFamily: Theme.fonts.regular,
              fontSize: 11,
              textDecorationLine: "underline",
            }}
          >
            Privacidade dos anúncios
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
