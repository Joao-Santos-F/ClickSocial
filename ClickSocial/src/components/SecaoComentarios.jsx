import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import { IconeTabCoracao, IconeTabChat, IconeDestaque } from "./IconesSvg";

export function SecaoComentarios({ postsCompartilhados = [], dadosPerfil }) {
  const userTarget = (dadosPerfil?.usuario || dadosPerfil?.nome || "").trim().toLowerCase();

  // Coleta os comentários criados por este usuário específico no perfil
  const todosComentarios = (postsCompartilhados || []).flatMap((p) => p.comentarios || []);
  const comentariosDoUsuario = todosComentarios.filter((c) => {
    if (!userTarget) return true;
    const autor = (c.autor || c.nome || "").trim().toLowerCase();
    return autor === userTarget || autor === "você";
  });

  if (comentariosDoUsuario.length === 0) {
    return (
      <View style={[styles.container, { paddingVertical: 40, alignItems: "center" }]}>
        <Text style={{ color: theme.colors.textSecondary, textAlign: "center" }}>
          Nenhum comentário realizado por este usuário.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {comentariosDoUsuario.map((c, index) => (
        <View key={c.id || index} style={styles.cardComentario}>
          <View style={styles.topoComentario}>
            <View style={styles.avatarPequeno}>
              <IconeDestaque tamanho={24} />
            </View>
            <View style={styles.infoAutor}>
              <Text style={styles.nomeAutor}>{c.autor || c.nome || "Usuário"}</Text>
              <Text style={styles.handleAutor}>@{c.handle || "usuario"} • {c.tempo || "Agora"}</Text>
            </View>
          </View>
          <Text style={styles.textoComentario}>{c.texto}</Text>
          <View style={styles.rodapeComentario}>
            <View style={styles.itemAcao}>
              <IconeTabCoracao tamanho={16} cor="#FF3B30" />
              <Text style={styles.textoAcao}>{c.curtidas || 0}</Text>
            </View>
            <View style={styles.itemAcao}>
              <IconeTabChat tamanho={16} cor={theme.colors.textSecondary} />
              <Text style={styles.textoAcao}>{c.respostas || 0}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
  },
  cardComentario: {
    backgroundColor: theme.colors.cardBackground,
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
