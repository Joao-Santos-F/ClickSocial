import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { theme } from "../../styles/theme";

export function BotaoPrincipal({ titulo, aoPressionar, desabilitado = false, carregando = false }) {
  return (
    <TouchableOpacity
      style={[styles.botao, desabilitado && styles.botaoDesabilitado]}
      onPress={aoPressionar}
      activeOpacity={0.8}
      disabled={desabilitado || carregando}
    >
      {carregando ? (
        <ActivityIndicator color={theme.colors.buttonPrimaryText} />
      ) : (
        <Text style={styles.textoBotao}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: "100%",
    height: 48,
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: theme.borderRadius.medium,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoBotao: {
    color: theme.colors.buttonPrimaryText,
    fontSize: 15,
    fontWeight: "700",
  },
});
