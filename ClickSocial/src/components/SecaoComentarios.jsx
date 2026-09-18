import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { theme } from "../styles/theme";
import { IconeTabChat } from "./IconesSvg";
import { useApi } from "../context/ApiContext";

const avatarPadrao = require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png");
const avatarEduardo = require("../../assets/top amigo 2.png");

// Ícone de coração interativo padronizado com o Feed
function IconeCoracao({ curtido, tamanho = 16 }) {
  const cor = curtido ? "#FF3B30" : "#9CA3AF";
  return (
    <View style={{ width: tamanho, height: tamanho, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: tamanho, color: cor, lineHeight: tamanho + 2 }}>
        {curtido ? "❤️" : "🤍"}
      </Text>
    </View>
  );
}

export function SecaoComentarios({
  postsCompartilhados = [],
  dadosPerfil: dadosPerfilProp,
}) {
  const { usuarios = [], dadosPerfil: dadosPerfilCtx, usuarioLogado } = useApi();
  const dadosPerfil = dadosPerfilProp || dadosPerfilCtx;

  const userHandle = (dadosPerfil?.usuario || "").trim().toLowerCase();
  const userNome = (dadosPerfil?.nome || "").trim().toLowerCase();

  // Estado local para interações de curtida nos comentários
  const [curtidas, setCurtidas] = useState({});

  const todosComentarios = (postsCompartilhados || []).flatMap(
    (p) => p.comentarios || []
  );
  const comentariosDoUsuario = todosComentarios.filter((c) => {
    if (!userHandle && !userNome) return true;
    const autor = (c.autor || "").trim().toLowerCase();
    const nome = (c.nome || "").trim().toLowerCase();
    const handle = (c.handle || "").trim().toLowerCase();

    return (
      (userHandle &&
        (autor === userHandle ||
          nome === userHandle ||
          handle === userHandle)) ||
      (userNome &&
        (autor === userNome ||
          nome === userNome ||
          handle === userNome)) ||
      autor === "você" ||
      nome === "você"
    );
  });

  const resolverFonteAvatar = (c) => {
    const autor = (c.autor || c.nome || "").trim().toLowerCase();
    const handle = (c.handle || "").trim().toLowerCase();

    const resolverImg = (img) => {
      if (!img) return null;
      if (typeof img === "number") return img;
      if (typeof img === "string") {
        if (
          img.startsWith("data:") ||
          img.startsWith("http") ||
          img.startsWith("blob:")
        ) {
          return { uri: img };
        }
        if (img.includes("top amigo")) return avatarEduardo;
        if (img.includes("WhatsApp")) return avatarPadrao;
        return null;
      }
      if (typeof img === "object" && img !== null) {
        const uri = img.uri;
        if (typeof uri === "string" && uri.length > 0) {
          if (
            uri.startsWith("data:") ||
            uri.startsWith("http") ||
            uri.startsWith("blob:")
          ) {
            return { uri };
          }
          if (uri.includes("top amigo")) return avatarEduardo;
          if (uri.includes("WhatsApp")) return avatarPadrao;
        }
      }
      return null;
    };

    if (
      (userHandle && (autor === userHandle || handle === userHandle)) ||
      (userNome && (autor === userNome || handle === userNome)) ||
      autor === "você"
    ) {
      const src =
        resolverImg(dadosPerfil?.fotoUri) ||
        resolverImg(dadosPerfil?.imagemPerfil);
      if (src) return src;
    }

    if (
      usuarioLogado &&
      ((usuarioLogado.usuario &&
        autor === usuarioLogado.usuario.toLowerCase()) ||
        (usuarioLogado.nome &&
          autor === usuarioLogado.nome.toLowerCase()))
    ) {
      const src =
        resolverImg(usuarioLogado.fotoUri) ||
        resolverImg(usuarioLogado.imagemPerfil);
      if (src) return src;
    }

    const usuarioEncontrado = (usuarios || []).find(
      (u) =>
        (u.usuario || "").toLowerCase() === autor ||
        (u.nome || "").toLowerCase() === autor ||
        (u.email || "").toLowerCase() === autor
    );

    if (usuarioEncontrado) {
      const src =
        resolverImg(usuarioEncontrado.fotoUri) ||
        resolverImg(usuarioEncontrado.imagemPerfil);
      if (src) return src;
    }

    if (c.avatar) {
      const src = resolverImg(c.avatar);
      if (src) return src;
    }

    return avatarPadrao;
  };

  const alternarCurtidaComentario = (comentarioId, curtidasBase) => {
    setCurtidas((prev) => {
      const estadoAtual = prev[comentarioId];
      if (estadoAtual === undefined) {
        // Primeiro clique: inverte o estado base
        return {
          ...prev,
          [comentarioId]: { curtido: true, total: (curtidasBase || 0) + 1 },
        };
      }
      const novoCurtido = !estadoAtual.curtido;
      return {
        ...prev,
        [comentarioId]: {
          curtido: novoCurtido,
          total: novoCurtido
            ? estadoAtual.total + 1
            : Math.max(0, estadoAtual.total - 1),
        },
      };
    });
  };

  if (comentariosDoUsuario.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { paddingVertical: 40, alignItems: "center" },
        ]}
      >
        <Text
          style={{ color: theme.colors.textSecondary, textAlign: "center" }}
        >
          Nenhum comentário realizado por este usuário.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {comentariosDoUsuario.map((c, index) => {
        const id = c.id || String(index);
        const estadoLocal = curtidas[id];
        const estaCurtido =
          estadoLocal !== undefined ? estadoLocal.curtido : Boolean(c.curtido);
        const totalCurtidas =
          estadoLocal !== undefined
            ? estadoLocal.total
            : c.curtidas || 0;

        return (
          <View key={id} style={styles.cardComentario}>
            <View style={styles.topoComentario}>
              <View style={styles.avatarPequeno}>
                <Image
                  source={resolverFonteAvatar(c)}
                  style={styles.avatarImagem}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.infoAutor}>
                <Text style={styles.nomeAutor}>
                  {c.nome || c.autor || "Usuário"}
                </Text>
                <Text style={styles.handleAutor}>
                  @{c.handle || c.autor || "usuario"} •{" "}
                  {c.tempo || "Agora"}
                </Text>
              </View>
            </View>
            <Text style={styles.textoComentario}>{c.texto}</Text>
            <View style={styles.rodapeComentario}>
              {/* Coração interativo */}
              <TouchableOpacity
                style={styles.itemAcao}
                onPress={() => alternarCurtidaComentario(id, c.curtidas)}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <IconeCoracao curtido={estaCurtido} tamanho={16} />
                <Text
                  style={[
                    styles.textoAcao,
                    estaCurtido && { color: "#FF3B30" },
                  ]}
                >
                  {totalCurtidas}
                </Text>
              </TouchableOpacity>
              <View style={styles.itemAcao}>
                <IconeTabChat tamanho={16} cor={theme.colors.textSecondary} />
                <Text style={styles.textoAcao}>{c.respostas || 0}</Text>
              </View>
            </View>
          </View>
        );
      })}
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
