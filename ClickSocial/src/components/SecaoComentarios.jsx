import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import { IconeTabCoracao, IconeTabChat, IconeDestaque } from "./IconesSvg";

export function SecaoComentarios() {
  return (
    <View style={styles.container}>
      <View style={styles.cardComentario}>
        <View style={styles.topoComentario}>
          <View style={styles.avatarPequeno}>
            <IconeDestaque tamanho={24} />
          </View>
          <View style={styles.infoAutor}>
            <Text style={styles.nomeAutor}>Eduardo Torolho</Text>
            <Text style={styles.handleAutor}>@happy_1243 • Hoje 15:32</Text>
          </View>
        </View>
        <Text style={styles.textoComentario}>É o goat não tem jeito 🔥🔥</Text>
        <View style={styles.rodapeComentario}>
          <View style={styles.itemAcao}>
            <IconeTabCoracao tamanho={16} cor="#FF3B30" />
            <Text style={styles.textoAcao}>72</Text>
          </View>
          <View style={styles.itemAcao}>
            <IconeTabChat tamanho={16} cor={theme.colors.textSecondary} />
            <Text style={styles.textoAcao}>6</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
  },
  cardComentario: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  topoComentario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarPequeno: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0D0914",
    alignItems: "center",
    justifyContent: "center",
  },
  infoAutor: {
    marginLeft: 10,
  },
  nomeAutor: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  handleAutor: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  textoComentario: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginVertical: 6,
  },
  rodapeComentario: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  itemAcao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  textoAcao: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: "600",
  },
});
