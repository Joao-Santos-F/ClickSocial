import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { theme } from "../styles/theme";

export function IconeCabecalho({ tamanho = 64, cor = theme.colors.iconPrimary }) {
  return (
    <View style={styles.container}>
      <Svg width={tamanho} height={tamanho} viewBox="0 0 64 64" fill="none">
        {/* Pessoa Central */}
        <Circle cx="32" cy="18" r="6.5" stroke={cor} strokeWidth="2.5" />
        <Path d="M23 42C23 35.3726 27.0294 31 32 31C36.9706 31 41 35.3726 41 42V44H23V42Z" stroke={cor} strokeWidth="2.5" />
        
        {/* Pessoa Esquerda */}
        <Circle cx="17" cy="24" r="4.5" stroke={cor} strokeWidth="2.2" />
        <Path d="M10 42V40C10 35.5 13.5 33 17.5 33" stroke={cor} strokeWidth="2.2" />
        
        {/* Pessoa Direita */}
        <Circle cx="47" cy="24" r="4.5" stroke={cor} strokeWidth="2.2" />
        <Path d="M54 42V40C54 35.5 50.5 33 46.5 33" stroke={cor} strokeWidth="2.2" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },
});
