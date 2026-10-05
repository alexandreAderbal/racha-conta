import { Theme } from "@Theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  camera: {
    flex: 1,
  },

  botaoFlash: {
    position: "absolute",
    top: 120,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoFechar: {
    position: "absolute",
    top: 55,
    left: 20,
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.60)",
  },

  botaoTrocar: {
    position: "absolute",
    top: 55,
    right: 20,
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.60)",
  },

  controles: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  botaoCamera: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: Theme.colors.primary,
  },

  botaoCameraInterno: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoCameraDesabilitado: {
    opacity: 0.5,
  },

  textoFoto: {
    fontFamily: Theme.fonts.semiBold,
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  permissao: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  icone: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#E6F4F1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  titulo: {
    fontFamily: Theme.fonts.bold,
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 10,
  },

  descricao: {
    color: "#D1D5DB",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 340,
    marginBottom: 28,
  },

  botaoPermissao: {
    minHeight: 54,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: Theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  textoBotao: {
    fontFamily: Theme.fonts.bold,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  botaoVoltarPermissao: {
    marginTop: 20,
    padding: 12,
  },

  textoVoltar: {
    fontFamily: Theme.fonts.semiBold,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  carregando: {
    fontFamily: Theme.fonts.regular,
    color: "#FFFFFF",
    fontSize: 16,
  },
});
