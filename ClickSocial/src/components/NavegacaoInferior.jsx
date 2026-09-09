import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from "react-native";
import { theme } from "../styles/theme";
import {
  IconeNavInicio,
  IconeNavCriar,
  IconeNavNotificacao,
  IconeNavPerfil,
} from "./IconesSvg";

export const ITENS_NAV_PADRAO = [
  {
    id: "inicio",
    rotulo: "Início",
    Componente: IconeNavInicio,
  },
  {
    id: "criar",
    rotulo: "Criar",
    Componente: IconeNavCriar,
  },
  {
    id: "notificacao",
    rotulo: "Notificação",
    Componente: IconeNavNotificacao,
  },
  {
    id: "perfil",
    rotulo: "Perfil",
    Componente: IconeNavPerfil,
  },
];

/**
 * Componente reutilizável de Navegação Inferior (Bottom Navigation)
 *
 * @param {string} telaAtiva - ID da tela atualmente ativa ('inicio' | 'criar' | 'notificacao' | 'perfil')
 * @param {function} aoMudarTela - Callback acionado ao tocar em um item (recebe o id da tela)
 * @param {Array} itens - Lista personalizada de itens (opcional, usa ITENS_NAV_PADRAO por padrão)
 */
export function NavegacaoInferior({
  telaAtiva = "perfil",
  aoMudarTela,
  itens = ITENS_NAV_PADRAO,
}) {
  const lidarComToque = (id) => {
    if (aoMudarTela) {
      aoMudarTela(id);
    } else {
      Alert.alert("Navegação", `Item selecionado: ${id.toUpperCase()}`);
    }
  };

  return (
    <View style={styles.container}>
      {itens.map((item) => {
        const ativo = item.id === telaAtiva;
        const cor = ativo ? theme.colors.textPrimary : theme.colors.textSecondary;
        const Icone = item.Componente;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.itemNav}
            activeOpacity={0.7}
            onPress={() => lidarComToque(item.id)}
          >
            <Icone tamanho={24} cor={cor} />
            <Text style={[styles.rotuloNav, ativo && styles.rotuloNavAtivo]}>
              {item.rotulo}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: theme.colors.dividerLine,
    paddingBottom: Platform.OS === "ios" ? 22 : 10,
    paddingTop: 10,
  },
  itemNav: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  rotuloNav: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  rotuloNavAtivo: {
    color: theme.colors.textPrimary,
    fontWeight: "600",
  },
});
