import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { theme } from "../styles/theme";
import {
  IconeTabImagem,
  IconeTabChat,
  IconeTabCoracao,
  IconeTabRepost,
} from "./IconesSvg";

export const ABAS_PERFIL_PADRAO = [
  { id: 0, Componente: IconeTabImagem, chave: "publicacoes" },
  { id: 1, Componente: IconeTabChat, chave: "comentarios" },
  { id: 2, Componente: IconeTabCoracao, chave: "curtidas" },
  { id: 3, Componente: IconeTabRepost, chave: "reposts" },
];

/**
 * Componente reutilizável de Abas de Perfil (Profile Tabs)
 *
 * @param {number|string} abaAtiva - ID ou chave da aba selecionada
 * @param {function} aoMudarAba - Callback ao selecionar uma aba
 * @param {Array} abas - Lista de abas com id e Componente de ícone
 */
export function ProfileTabs({
  abaAtiva = 0,
  aoMudarAba,
  abas = ABAS_PERFIL_PADRAO,
}) {
  return (
    <View style={styles.container}>
      {abas.map((aba) => {
        const ativa = abaAtiva === aba.id || abaAtiva === aba.chave;
        const cor = ativa ? theme.colors.textPrimary : theme.colors.textSecondary;
        const Icone = aba.Componente;

        return (
          <TouchableOpacity
            key={aba.id}
            style={styles.abaItem}
            onPress={() => aoMudarAba && aoMudarAba(aba.id)}
            activeOpacity={0.7}
          >
            <Icone tamanho={22} cor={cor} />
            {ativa && <View style={styles.indicadorAtivo} />}
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dividerLine,
  },
  abaItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    position: "relative",
  },
  indicadorAtivo: {
    position: "absolute",
    bottom: 0,
    left: "15%",
    right: "15%",
    height: 2,
    backgroundColor: theme.colors.textPrimary,
    borderRadius: 1,
  },
});
