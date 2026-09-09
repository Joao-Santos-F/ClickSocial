import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export function CampoTexto({
  rotulo,
  textoAjuda,
  valor,
  aoMudarTexto,
  senhaSegura,
  tipoTeclado = "default",
  capitalizacaoAutomatica = "none",
}) {
  const [estaFocado, setEstaFocado] = useState(false);

  return (
    <View style={styles.container}>
      {rotulo && <Text style={styles.rotulo}>{rotulo}</Text>}
      <TextInput
        style={[
          styles.campo,
          estaFocado && styles.campoFocado,
        ]}
        placeholder={textoAjuda}
        placeholderTextColor={theme.colors.inputPlaceholder}
        value={valor}
        onChangeText={aoMudarTexto}
        secureTextEntry={senhaSegura}
        keyboardType={tipoTeclado}
        autoCapitalize={capitalizacaoAutomatica}
        onFocus={() => setEstaFocado(true)}
        onBlur={() => setEstaFocado(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: theme.spacing.md,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  campo: {
    width: "100%",
    height: 48,
    backgroundColor: theme.colors.inputBackground,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: 14,
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  campoFocado: {
    borderColor: theme.colors.iconPrimary,
    backgroundColor: "#FFFFFF",
  },
});
