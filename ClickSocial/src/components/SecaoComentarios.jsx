import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "../styles/theme";
import { IconeTabCoracao, IconeTabChat } from "./IconesSvg";
import { useApi } from "../context/ApiContext";

const avatarPadrao = require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png");
const avatarEduardo = require("../../assets/top amigo 2.png");

export function SecaoComentarios({ postsCompartilhados = [], dadosPerfil: dadosPerfilProp }) {
  const { usuarios = [], dadosPerfil: dadosPerfilCtx, usuarioLogado } = useApi();
  const dadosPerfil = dadosPerfilProp || dadosPerfilCtx;

  const userHandle = (dadosPerfil?.usuario || "").trim().toLowerCase();
  const userNome = (dadosPerfil?.nome || "").trim().toLowerCase();

  // Coleta os comentários criados por este usuário específico no perfil
  const todosComentarios = (postsCompartilhados || []).flatMap((p) => p.comentarios || []);
  const comentariosDoUsuario = todosComentarios.filter((c) => {
    if (!userHandle && !userNome) return true;
    const autor = (c.autor || "").trim().toLowerCase();
    const nome = (c.nome || "").trim().toLowerCase();
    const handle = (c.handle || "").trim().toLowerCase();

    return (
      (userHandle && (autor === userHandle || nome === userHandle || handle === userHandle)) ||
      (userNome && (autor === userNome || nome === userNome || handle === userNome)) ||
      autor === "você" ||
      nome === "você"
    );
  });

  const resolverFonteAvatar = (c) => {
    const autor = (c.autor || c.nome || "").trim().toLowerCase();
    const handle = (c.handle || "").trim().toLowerCase();

    // 1. Autor é o perfil sendo exibido (prioridade máxima para refletir alteração de foto em tempo real)
    if (
      (userHandle && (autor === userHandle || handle === userHandle)) ||
      (userNome && (autor === userNome || handle === userNome)) ||
      autor === "você"
    ) {
      if (dadosPerfil?.fotoUri) return { uri: dadosPerfil.fotoUri };
      if (dadosPerfil?.imagemPerfil) {
        if (typeof dadosPerfil.imagemPerfil === "string") {
          if (dadosPerfil.imagemPerfil.startsWith("data:") || dadosPerfil.imagemPerfil.startsWith("http") || dadosPerfil.imagemPerfil.startsWith("blob:")) {
            return { uri: dadosPerfil.imagemPerfil };
          }
          if (dadosPerfil.imagemPerfil.includes("top amigo")) return avatarEduardo;
          if (dadosPerfil.imagemPerfil.includes("WhatsApp")) return avatarPadrao;
        }
        return dadosPerfil.imagemPerfil;
      }
    }

    // 2. Autor é o usuário atualmente logado
    if (
      usuarioLogado &&
      ((usuarioLogado.usuario && autor === usuarioLogado.usuario.toLowerCase()) ||
       (usuarioLogado.nome && autor === usuarioLogado.nome.toLowerCase()))
    ) {
      if (usuarioLogado.fotoUri) return { uri: usuarioLogado.fotoUri };
      if (usuarioLogado.imagemPerfil) {
        if (typeof usuarioLogado.imagemPerfil === "string") {
          if (usuarioLogado.imagemPerfil.startsWith("data:") || usuarioLogado.imagemPerfil.startsWith("http")) {
            return { uri: usuarioLogado.imagemPerfil };
          }
          if (usuarioLogado.imagemPerfil.includes("top amigo")) return avatarEduardo;
          if (usuarioLogado.imagemPerfil.includes("WhatsApp")) return avatarPadrao;
        }
        return usuarioLogado.imagemPerfil;
      }
    }

    // 3. Busca o autor na lista global de usuários cadastrados
    const usuarioEncontrado = (usuarios || []).find(
      (u) =>
        (u.usuario || "").toLowerCase() === autor ||
        (u.nome || "").toLowerCase() === autor ||
        (u.email || "").toLowerCase() === autor
    );

    if (usuarioEncontrado) {
      if (usuarioEncontrado.fotoUri) return { uri: usuarioEncontrado.fotoUri };
      if (usuarioEncontrado.imagemPerfil) {
        if (typeof usuarioEncontrado.imagemPerfil === "string") {
          if (usuarioEncontrado.imagemPerfil.startsWith("data:") || usuarioEncontrado.imagemPerfil.startsWith("http")) {
            return { uri: usuarioEncontrado.imagemPerfil };
          }
          if (usuarioEncontrado.imagemPerfil.includes("top amigo")) return avatarEduardo;
          if (usuarioEncontrado.imagemPerfil.includes("WhatsApp")) return avatarPadrao;
        }
        return usuarioEncontrado.imagemPerfil;
      }
    }

    // 4. Se o próprio comentário já possui avatar gravado
    if (c.avatar) {
      if (typeof c.avatar === "string") {
        if (c.avatar.startsWith("data:") || c.avatar.startsWith("http") || c.avatar.startsWith("blob:")) {
          return { uri: c.avatar };
        }
        if (c.avatar.includes("top amigo")) return avatarEduardo;
        if (c.avatar.includes("WhatsApp")) return avatarPadrao;
      }
      return c.avatar;
    }

    return avatarPadrao;
  };

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
              <Image
                source={resolverFonteAvatar(c)}
                style={styles.avatarImagem}
                resizeMode="cover"
              />
            </View>
            <View style={styles.infoAutor}>
              <Text style={styles.nomeAutor}>{c.nome || c.autor || "Usuário"}</Text>
              <Text style={styles.handleAutor}>@{c.handle || c.autor || "usuario"} • {c.tempo || "Agora"}</Text>
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
    backgroundColor: "#201A30",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImagem: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
