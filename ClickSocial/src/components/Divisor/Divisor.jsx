import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export function Divisor({ texto = "ou" }) {
  return (
    <View style={styles.container}>
      <View style={styles.linha} />
      <Text style={styles.texto}>{texto}</Text>
      <View style={styles.linha} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing.lg,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.dividerLine,
  },
  texto: {
    marginHorizontal: theme.spacing.sm,
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.textSecondary,
  },
});

export default Divisor;
