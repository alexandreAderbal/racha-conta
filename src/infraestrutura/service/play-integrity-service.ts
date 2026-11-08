import * as Crypto from "expo-crypto";
import { Platform } from "react-native";
import { API_CONSTANT, PLAY_INTEGRITY_CONSTANT } from "@Constant";

export class PlayIntegrityService {
  private providerPreparation?: Promise<void>;

  private get isConfigurado(): boolean {
    return /^\d+$/.test(PLAY_INTEGRITY_CONSTANT.GOOGLE_CLOUD_PROJECT_NUMBER);
  }

  async preparar(): Promise<void> {
    if (Platform.OS !== "android" || !this.isConfigurado) {
      return;
    }

    if (!this.providerPreparation) {
      this.providerPreparation = (async () => {
        const AppIntegrity = await import("@expo/app-integrity");
        await AppIntegrity.prepareIntegrityTokenProviderAsync(
          PLAY_INTEGRITY_CONSTANT.GOOGLE_CLOUD_PROJECT_NUMBER,
        );
      })().catch((error: unknown) => {
        this.providerPreparation = undefined;
        throw error;
      });
    }

    console.log(await this.providerPreparation);
    await this.providerPreparation;
  }

  async solicitarToken(requestBody: string): Promise<string | undefined> {
    if (Platform.OS !== "android") return undefined;

    if (!this.isConfigurado) {
      throw new Error("Google Cloud Project Number não configurado.");
    }

    const canonical = `POST\n${API_CONSTANT.COMANDA_ANALISE_URL.PATH_API_IA}\n${requestBody}`;

    const hashBase64 = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      canonical,
      { encoding: Crypto.CryptoEncoding.BASE64 },
    );

    const requestHash = hashBase64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    console.log("requestHash", requestHash);
    console.log("hashBase64", hashBase64);

    await this.preparar();

    const AppIntegrity = await import("@expo/app-integrity");

    try {
      return await AppIntegrity.requestIntegrityCheckAsync(requestHash);
    } catch (error) {
      if (!this.isProviderInvalid(error)) throw error;

      this.providerPreparation = undefined;
      await this.preparar();

      return AppIntegrity.requestIntegrityCheckAsync(requestHash);
    }
  }

  private isProviderInvalid(error: unknown): boolean {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ERR_APP_INTEGRITY_PROVIDER_INVALID"
    );
  }
}
