import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { theme } from "../styles/theme";

const ESPACAMENTO = 8;

export function GradePublicacoes({
  apenasPostados = false,
  apenasCurtidas = false,
  apenasRepublicados = false,
  aoAbrirPost,
  postsCompartilhados = [],
  setPostsCompartilhados,
  dadosPerfil,
}) {
  const lidarComToque = (post) => {
    if (aoAbrirPost) {
      aoAbrirPost(post);
    }
  };

  const userTarget = (dadosPerfil?.usuario || dadosPerfil?.nome || "").trim().toLowerCase();
  let postsFiltrados = postsCompartilhados || [];

  if (apenasPostados) {
    postsFiltrados = postsFiltrados.filter((p) => {
      const postUser = (p.user || p.usuario || "").trim().toLowerCase();
      if (!userTarget) return true;
      return postUser === userTarget || (userTarget === "você" && postUser === "você");
    });
  }

  if (apenasCurtidas) {
    postsFiltrados = postsFiltrados.filter((p) => {
      const curtidores = Array.isArray(p.curtidores) ? p.curtidores : [];
      return curtidores.some((u) => u.trim().toLowerCase() === userTarget);
    });
  }

  if (apenasRepublicados) {
    postsFiltrados = postsFiltrados.filter((p) => {
      const republicadores = Array.isArray(p.republicadores) ? p.republicadores : [];
      return republicadores.some((u) => u.trim().toLowerCase() === userTarget);
    });
  }

  if (postsFiltrados.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center", paddingVertical: 40 }]}>
        <Text style={{ color: theme.colors.textSecondary, textAlign: "center", width: "100%" }}>
          {apenasCurtidas
            ? "Nenhuma foto curtida ainda."
            : apenasRepublicados
            ? "Nenhuma foto republicada ainda."
            : "Nenhuma publicação criada ainda."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {postsFiltrados.map((post) => (
        <TouchableOpacity
          key={post.id}
          activeOpacity={0.85}
          style={styles.itemPost}
          onPress={() => lidarComToque(post)}
        >
          <View style={styles.conteudoPost}>
            {post.image ? (
              typeof post.image === "string" ? (
                <Image source={{ uri: post.image }} style={styles.imagemPost} resizeMode="cover" />
              ) : (
                <Image source={post.image} style={styles.imagemPost} resizeMode="cover" />
              )
            ) : (
              <View style={styles.cardTextoPreview}>
                <Text style={styles.textoPreview} numberOfLines={3}>
                  {post.text}
                </Text>
              </View>
            )}
          </View>

          {/* Badge de feedback visual com contagem real */}
          <View style={styles.badgeCurtidas}>
            <Text style={styles.textoCurtidas}>❤️ {post.curtidas || 0}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: ESPACAMENTO,
    paddingTop: ESPACAMENTO,
    backgroundColor: theme.colors.background,
    width: "100%",
  },
  itemPost: {
    width: "48.5%",
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: ESPACAMENTO,
    backgroundColor: "#0D0914",
    position: "relative",
  },
  conteudoPost: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imagemPost: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  cardTextoPreview: {
    padding: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#211645",
  },
  textoPreview: {
    color: "#E2DAEB",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  badgeCurtidas: {
    position: "absolute",
    bottom: 6,
    right: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  textoCurtidas: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
});
