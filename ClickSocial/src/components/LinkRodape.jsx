import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export function LinkRodape({
  textoPergunta = "Não tem uma conta?",
  textoAcao = "Cadastra-se",
  aoPressionarAcao,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.pergunta}>{textoPergunta} </Text>
      <TouchableOpacity onPress={aoPressionarAcao} activeOpacity={0.7}>
        <Text style={styles.acao}>{textoAcao}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.xs,
  },
  pergunta: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.textMuted,
  },
  acao: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.linkText,
    textDecorationLine: "underline",
  },
});
