import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../styles/theme";

export function BarraNavegacao({ abaAtiva = "notificacao", aoSelecionarAba }) {
  const abas = [
    { id: "inicio", rotulo: "Início", icone: "home", iconeOutlined: "home-outline" },
    { id: "criar", rotulo: "Criar", icone: "add-circle", iconeOutlined: "add-circle-outline" },
    { id: "notificacao", rotulo: "Notificação", icone: "notifications", iconeOutlined: "notifications-outline" },
    { id: "perfil", rotulo: "Perfil", icone: "person-circle", iconeOutlined: "person-circle-outline" },
  ];

  return (
    <View style={styles.container}>
      {abas.map((aba) => {
        const estaAtiva = abaAtiva === aba.id;
        const nomeIcone = estaAtiva ? aba.icone : aba.iconeOutlined;

        return (
          <TouchableOpacity
            key={aba.id}
            style={styles.itemAba}
            onPress={() => aoSelecionarAba && aoSelecionarAba(aba.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={nomeIcone}
              size={24}
              color={estaAtiva ? theme.colors.textPrimary : theme.colors.textSecondary}
            />
            <Text style={[styles.textoAba, estaAtiva && styles.textoAbaAtiva]}>
              {aba.rotulo}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BarraNavegacao;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 64,
    backgroundColor: theme.colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: theme.colors.inputBorder,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  itemAba: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textoAba: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 2,
    fontWeight: "500",
  },
  textoAbaAtiva: {
    color: theme.colors.textPrimary,
    fontWeight: "700",
  },
});
