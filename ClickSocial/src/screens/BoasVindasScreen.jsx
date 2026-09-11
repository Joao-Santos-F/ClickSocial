import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../styles/theme";
import { IconeCabecalho } from "../components";

export default function BoasVindasScreen({
  aoNavegarLogin,
  aoNavegarCadastro,
  onLogin,
  onCadastro,
}) {
  const lidarLogin = aoNavegarLogin || onLogin;
  const lidarCadastro = aoNavegarCadastro || onCadastro;

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      style={styles.containerFundo}
    >
      <StatusBar style="light" />
      <View style={styles.containerCentral}>
        <View style={styles.cartao}>
          <IconeCabecalho tamanho={84} />

          <Text style={styles.titulo}>ClickSocial</Text>

          <Text style={styles.subtitulo}>
            Conecte-se com pessoas{"\n"}e compartilhe momentos
          </Text>

          <View style={styles.containerBotoes}>
            <TouchableOpacity
              style={styles.botaoEntrar}
              onPress={lidarLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotaoEntrar}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCriarConta}
              onPress={lidarCadastro}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotaoCriarConta}>Criar Conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  containerFundo: {
    flex: 1,
  },
  containerCentral: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  cartao: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.card,
    paddingVertical: 40,
    paddingHorizontal: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 36,
  },
  containerBotoes: {
    width: "100%",
  },
  botaoEntrar: {
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: theme.borderRadius.medium,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  textoBotaoEntrar: {
    color: theme.colors.buttonPrimaryText,
    fontSize: 16,
    fontWeight: "700",
  },
  botaoCriarConta: {
    width: "100%",
    height: 50,
    backgroundColor: "#F0EFF5",
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotaoCriarConta: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
});
