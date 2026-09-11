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
    id: "feed",
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
  telaAtiva,
  abaAtiva,
  aoMudarTela,
  aoSelecionarAba,
  itens = ITENS_NAV_PADRAO,
}) {
  const ativaAtual = (telaAtiva || abaAtiva || "Feed").toLowerCase();
  const callback = aoMudarTela || aoSelecionarAba;

  const lidarComToque = (id) => {
    if (callback) {
      callback(id);
    } else {
      Alert.alert("Navegação", `Item selecionado: ${id.toUpperCase()}`);
    }
  };

  const checarSeAtivo = (itemId) => {
    const idMinusculo = itemId.toLowerCase();
    if (idMinusculo === "feed" || idMinusculo === "inicio") {
      return ativaAtual === "feed" || ativaAtual === "inicio";
    }
    return ativaAtual === idMinusculo;
  };

  return (
    <View style={styles.container}>
      {itens.map((item) => {
        const ativo = checarSeAtivo(item.id);
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

export default NavegacaoInferior;

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
