import { isRunningInExpoGo } from "expo";
import { Platform, StatusBar } from "react-native";

type GoogleMobileAds = typeof import("react-native-google-mobile-ads");
type InterstitialAdInstance =
  import("react-native-google-mobile-ads").InterstitialAd;

export class AdMobService {
  private inicializacaoConsentimento: Promise<boolean> | undefined;
  private inicializacaoSdk: Promise<boolean> | undefined;
  private sdkInicializado = false;
  private interstitial: InterstitialAdInstance | undefined;
  private idUnidadeInterstitial: string | undefined;
  private interstitialCarregado = false;
  private interstitialCarregando = false;
  private interstitialExibindo = false;
  private resolverExibicaoInterstitial:
    | ((exibido: boolean) => void)
    | undefined;
  private removerListenersInterstitial: Array<() => void> = [];

  private obterModuloAdMob(): GoogleMobileAds {
    return require("react-native-google-mobile-ads") as GoogleMobileAds;
  }

  private inicializarSdk(): Promise<boolean> {
    if (this.sdkInicializado) return Promise.resolve(true);
    if (this.inicializacaoSdk) return this.inicializacaoSdk;

    const { default: mobileAds } = this.obterModuloAdMob();
    const inicializacao = mobileAds()
      .initialize()
      .then(() => {
        this.sdkInicializado = true;
        return true;
      })
      .catch((erro: unknown) => {
        console.warn("Não foi possível inicializar o SDK do AdMob:", erro);
        return false;
      })
      .finally(() => {
        this.inicializacaoSdk = undefined;
      });

    this.inicializacaoSdk = inicializacao;
    return inicializacao;
  }

  private async iniciarAnuncios(): Promise<boolean> {
    if (isRunningInExpoGo()) return false;

    try {
      const { AdsConsent } = this.obterModuloAdMob();

      try {
        await AdsConsent.gatherConsent();
      } catch (erro) {
        console.warn(
          "Não foi possível atualizar o consentimento para anúncios:",
          erro,
        );
      }

      const { canRequestAds } = await AdsConsent.getConsentInfo();
      if (!canRequestAds) return false;

      return this.inicializarSdk();
    } catch (erro) {
      console.warn("Não foi possível inicializar os anúncios:", erro);
      return false;
    }
  }

  inicializar(): Promise<boolean> {
    if (this.sdkInicializado) return Promise.resolve(true);
    if (this.inicializacaoConsentimento) return this.inicializacaoConsentimento;

    const inicializacao = this.iniciarAnuncios().finally(() => {
      this.inicializacaoConsentimento = undefined;
    });

    this.inicializacaoConsentimento = inicializacao;
    return inicializacao;
  }

  async privacidadeObrigatoria(): Promise<boolean> {
    if (isRunningInExpoGo()) return false;

    const { AdsConsent, AdsConsentPrivacyOptionsRequirementStatus } =
      this.obterModuloAdMob();
    const { privacyOptionsRequirementStatus } =
      await AdsConsent.getConsentInfo();

    return (
      privacyOptionsRequirementStatus ===
      AdsConsentPrivacyOptionsRequirementStatus.REQUIRED
    );
  }

  async abrirPrivacidade(): Promise<{
    privacyOptionsRequired: boolean;
    sdkReady: boolean;
  }> {
    if (isRunningInExpoGo()) {
      return { privacyOptionsRequired: false, sdkReady: false };
    }

    const { AdsConsent, AdsConsentPrivacyOptionsRequirementStatus } =
      this.obterModuloAdMob();
    await AdsConsent.showPrivacyOptionsForm();

    const consentInfo = await AdsConsent.getConsentInfo();
    const idUnidadeInterstitial = this.idUnidadeInterstitial;
    this.limparInterstitial();
    const sdkReady = consentInfo.canRequestAds
      ? await this.inicializarSdk()
      : false;

    if (sdkReady && idUnidadeInterstitial) {
      this.precarregarInterstitial(idUnidadeInterstitial);
    }

    return {
      privacyOptionsRequired:
        consentInfo.privacyOptionsRequirementStatus ===
        AdsConsentPrivacyOptionsRequirementStatus.REQUIRED,
      sdkReady,
    };
  }

  precarregarInterstitial(idUnidade: string): void {
    if (!idUnidade || !this.sdkInicializado || isRunningInExpoGo()) return;

    if (this.interstitial && this.idUnidadeInterstitial === idUnidade) {
      if (
        !this.interstitialCarregado &&
        !this.interstitialCarregando &&
        !this.interstitialExibindo
      ) {
        this.carregarInterstitial();
      }
      return;
    }

    this.limparInterstitial();

    const { AdEventType, InterstitialAd } = this.obterModuloAdMob();
    this.idUnidadeInterstitial = idUnidade;
    const interstitial = InterstitialAd.createForAdRequest(idUnidade);
    this.interstitial = interstitial;

    this.removerListenersInterstitial = [
      interstitial.addAdEventListener(AdEventType.LOADED, () => {
        this.interstitialCarregado = true;
        this.interstitialCarregando = false;
      }),
      interstitial.addAdEventListener(AdEventType.ERROR, (erro) => {
        this.interstitialCarregado = false;
        this.interstitialCarregando = false;
        console.warn(
          "Não foi possível carregar o intersticial do AdMob:",
          erro,
        );

        if (this.interstitialExibindo) {
          this.interstitialExibindo = false;
          this.restaurarBarraDeStatus();
          this.resolverInterstitial(false);
        }
      }),
      interstitial.addAdEventListener(AdEventType.OPENED, () => {
        if (Platform.OS === "ios") StatusBar.setHidden(true);
      }),
      interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        this.interstitialCarregado = false;
        this.interstitialCarregando = false;
        this.interstitialExibindo = false;
        this.restaurarBarraDeStatus();
        this.resolverInterstitial(true);
        this.carregarInterstitial();
      }),
    ];

    this.carregarInterstitial();
  }

  async exibirInterstitial(): Promise<boolean> {
    const interstitial = this.interstitial;
    if (
      !interstitial ||
      !this.interstitialCarregado ||
      this.interstitialExibindo
    ) {
      if (!this.interstitialExibindo && this.idUnidadeInterstitial) {
        this.precarregarInterstitial(this.idUnidadeInterstitial);
      }
      return false;
    }

    this.interstitialCarregado = false;
    this.interstitialExibindo = true;
    const fechamento = new Promise<boolean>((resolve) => {
      this.resolverExibicaoInterstitial = resolve;
    });

    try {
      await interstitial.show();
      return await fechamento;
    } catch (erro) {
      this.interstitialExibindo = false;
      this.resolverInterstitial(false);
      console.warn("Não foi possível exibir o intersticial do AdMob:", erro);
      this.carregarInterstitial();
      return false;
    }
  }

  private carregarInterstitial(): void {
    if (
      !this.interstitial ||
      this.interstitialCarregado ||
      this.interstitialCarregando ||
      this.interstitialExibindo
    ) {
      return;
    }

    try {
      this.interstitialCarregando = true;
      this.interstitial.load();
    } catch (erro) {
      this.interstitialCarregando = false;
      console.warn("Não foi possível solicitar o intersticial do AdMob:", erro);
    }
  }

  private limparInterstitial(): void {
    this.removerListenersInterstitial.forEach((remover) => remover());
    this.removerListenersInterstitial = [];
    this.interstitial?.destroy();
    this.interstitial = undefined;
    this.idUnidadeInterstitial = undefined;
    this.interstitialCarregado = false;
    this.interstitialCarregando = false;
    this.interstitialExibindo = false;
    this.restaurarBarraDeStatus();
    this.resolverInterstitial(false);
  }

  private resolverInterstitial(exibido: boolean): void {
    const resolver = this.resolverExibicaoInterstitial;
    this.resolverExibicaoInterstitial = undefined;
    resolver?.(exibido);
  }

  private restaurarBarraDeStatus(): void {
    if (Platform.OS === "ios") StatusBar.setHidden(false);
  }
}
