import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { DetalhePostStyles } from "./DetalhePost.js";
import setaE from "../../../assets/incon_seta-esquerda.png";
import iconCoracao from "../../../assets/incon_coracao.png";
import avatarDefault from "../../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png";
import { useApi } from "../../context/ApiContext";

export const DetalhesPost = ({ onVoltar, onVerComentarios, post, aoCurtirPost }) => {
  const { usuarios = [], dadosPerfil = {} } = useApi();

  const [curtido, setCurtido] = useState(Boolean(post?.curtido));
  const [likes, setLikes] = useState(
    post?.curtidas !== undefined && post?.curtidas !== null
      ? Number(post.curtidas)
      : (post?.likes ?? 0)
  );
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [novoComentario, setNovoComentario] = useState("");
  const [comentarios, setComentarios] = useState(post?.comentarios || []);

  useEffect(() => {
    if (post) {
      setCurtido(Boolean(post.curtido));
      setLikes(
        post.curtidas !== undefined && post.curtidas !== null
          ? Number(post.curtidas)
          : (post.likes ?? 0)
      );
      setComentarios(post.comentarios || []);
    }
  }, [post]);

  const autorNome = post?.user || post?.autor || dadosPerfil?.nome || "Usuário";
  const autorUsername = post?.user
    ? `@${post.user.toLowerCase().replace(/[^a-z0-9_]/g, "")}`
    : "@usuario";
  const autorTime = post?.time || post?.tempo || "Agora";
  const postTexto = post?.text || post?.texto || "";
  const rawImagem = post?.image || post?.imagem || null;
  const localizacao = post?.localizacao || null;

  // Resolver foto real do autor do post
  const autorMatch = usuarios.find(
    (u) =>
      u.usuario?.toLowerCase() === (post?.user || "").toLowerCase() ||
      u.nome?.toLowerCase() === (post?.user || "").toLowerCase()
  );

  const postAvatar =
    (autorMatch?.fotoUri ? { uri: autorMatch.fotoUri } : null) ||
    (autorMatch?.imagemPerfil ? (typeof autorMatch.imagemPerfil === "string" ? { uri: autorMatch.imagemPerfil } : autorMatch.imagemPerfil) : null) ||
    (dadosPerfil?.usuario?.toLowerCase() === (post?.user || "").toLowerCase() || dadosPerfil?.nome?.toLowerCase() === (post?.user || "").toLowerCase()
      ? (dadosPerfil?.fotoUri ? { uri: dadosPerfil.fotoUri } : dadosPerfil?.imagemPerfil)
      : null) ||
    post?.avatar ||
    avatarDefault;

  const handleLike = () => {
    if (curtido) {
      setCurtido(false);
      setLikes(Math.max(0, likes - 1));
    } else {
      setCurtido(true);
      setLikes(likes + 1);
    }
    if (aoCurtirPost) {
      aoCurtirPost();
    }
  };

  const handleAdicionarComentario = () => {
    if (!novoComentario.trim()) return;
    const avatarComentario =
      (dadosPerfil?.fotoUri ? { uri: dadosPerfil.fotoUri } : null) ||
      dadosPerfil?.imagemPerfil ||
      avatarDefault;

    setComentarios([
      ...comentarios,
      {
        id: String(Date.now()),
        autor: dadosPerfil?.usuario || "Você",
        texto: novoComentario.trim(),
        avatar: avatarComentario,
      },
    ]);
    setNovoComentario("");
  };

  const resolverAvatarComentario = (c) => {
    if (c?.avatar) {
      if (typeof c.avatar === "object" && c.avatar.uri) return { uri: c.avatar.uri };
      if (typeof c.avatar === "string") {
        if (c.avatar.startsWith("data:") || c.avatar.startsWith("http") || c.avatar.startsWith("blob:")) {
          return { uri: c.avatar };
        }
        if (c.avatar.includes("top amigo")) return require("../../../assets/top amigo 2.png");
        if (c.avatar.includes("WhatsApp")) return avatarDefault;
      }
      if (typeof c.avatar === "number") return c.avatar;
    }

    const autorComent = (c?.autor || c?.nome || "").toLowerCase();
    if (
      dadosPerfil &&
      (autorComent === (dadosPerfil.usuario || "").toLowerCase() ||
       autorComent === (dadosPerfil.nome || "").toLowerCase() ||
       autorComent === "você")
    ) {
      if (dadosPerfil.fotoUri) return { uri: dadosPerfil.fotoUri };
      if (dadosPerfil.imagemPerfil) return dadosPerfil.imagemPerfil;
    }

    const matchUser = usuarios.find(
      (u) =>
        (u.usuario || "").toLowerCase() === autorComent ||
        (u.nome || "").toLowerCase() === autorComent
    );
    if (matchUser?.fotoUri) return { uri: matchUser.fotoUri };
    if (matchUser?.imagemPerfil) return matchUser.imagemPerfil;

    return avatarDefault;
  };

  return (
    <LinearGradient
      colors={["#211645", "#181122"]}
      style={DetalhePostStyles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={DetalhePostStyles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={DetalhePostStyles.card}>
              {/* Cabeçalho */}
              <View style={DetalhePostStyles.header}>
                <TouchableOpacity
                  onPress={onVoltar}
                  style={DetalhePostStyles.headerIconBtn}
                  activeOpacity={0.7}
                >
                  <Image source={setaE} style={DetalhePostStyles.headerIcon} />
                </TouchableOpacity>
                <Text style={DetalhePostStyles.headerTitle}>Publicação</Text>
                <View style={DetalhePostStyles.headerPlaceholder} />
              </View>

              {/* Autor */}
              <View style={DetalhePostStyles.authorRow}>
                {typeof postAvatar === "object" && postAvatar?.uri ? (
                  <Image source={{ uri: postAvatar.uri }} style={DetalhePostStyles.avatar} />
                ) : typeof postAvatar === "string" && (postAvatar.startsWith("http") || postAvatar.startsWith("blob:") || postAvatar.startsWith("data:")) ? (
                  <Image source={{ uri: postAvatar }} style={DetalhePostStyles.avatar} />
                ) : (
                  <Image
                    source={typeof postAvatar === "number" || typeof postAvatar === "object" ? postAvatar : avatarDefault}
                    style={DetalhePostStyles.avatar}
                  />
                )}
                <View style={DetalhePostStyles.authorInfo}>
                  <Text style={DetalhePostStyles.authorName}>{autorNome}</Text>
                  <Text style={DetalhePostStyles.authorUsername}>{autorUsername}</Text>
                  <Text style={DetalhePostStyles.authorTime}>{autorTime}</Text>
                </View>
              </View>

              {/* Texto do Post */}
              {Boolean(postTexto) && (
                <Text style={DetalhePostStyles.postText}>
                  {postTexto}
                </Text>
              )}

              {/* Localização do Post */}
              {Boolean(localizacao) && (
                <Text style={DetalhePostStyles.locationText}>
                  📍 {localizacao}
                </Text>
              )}

              {/* Imagem do Post (renderizada apenas se existir imagem real no post) */}
              {Boolean(rawImagem) && (
                <View style={DetalhePostStyles.imageContainer}>
                  {typeof rawImagem === "object" && rawImagem?.uri ? (
                    <Image
                      source={{ uri: rawImagem.uri }}
                      style={DetalhePostStyles.postImage}
                      resizeMode="cover"
                    />
                  ) : typeof rawImagem === "string" && (rawImagem.startsWith("http") || rawImagem.startsWith("blob:") || rawImagem.startsWith("data:")) ? (
                    <Image
                      source={{ uri: rawImagem }}
                      style={DetalhePostStyles.postImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={typeof rawImagem === "number" || typeof rawImagem === "object" ? rawImagem : null}
                      style={DetalhePostStyles.postImage}
                      resizeMode="cover"
                    />
                  )}
                </View>
              )}

              {/* Curtidas */}
              <View style={DetalhePostStyles.likesRow}>
                <TouchableOpacity
                  style={DetalhePostStyles.likeButton}
                  onPress={handleLike}
                  activeOpacity={0.7}
                >
                  <Image
                    source={iconCoracao}
                    style={[
                      DetalhePostStyles.heartIcon,
                      { tintColor: curtido ? "#E0245E" : "#8E8A9E" },
                    ]}
                  />
                  <Text
                    style={[
                      DetalhePostStyles.likesCount,
                      curtido && { color: "#E0245E", fontWeight: "bold" },
                    ]}
                  >
                    {likes}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Link / Botão Ver comentários */}
              <TouchableOpacity
                style={DetalhePostStyles.commentsButton}
                onPress={onVerComentarios || (() => setMostrarComentarios(!mostrarComentarios))}
                activeOpacity={0.7}
              >
                <Text style={DetalhePostStyles.commentsText}>
                  {mostrarComentarios ? "Ocultar comentários" : "Ver comentários...."}
                </Text>
              </TouchableOpacity>

              {/* Seção de comentários expandida */}
              {mostrarComentarios && (
                <View style={DetalhePostStyles.commentsContainer}>
                  {comentarios.map((c, index) => {
                    const avatarFonteC = resolverAvatarComentario(c);
                    return (
                      <View key={c.id || index} style={[DetalhePostStyles.commentItem, { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }]}>
                        {typeof avatarFonteC === "object" && avatarFonteC?.uri ? (
                          <Image source={{ uri: avatarFonteC.uri }} style={{ width: 32, height: 32, borderRadius: 16 }} resizeMode="cover" />
                        ) : typeof avatarFonteC === "string" ? (
                          <Image source={{ uri: avatarFonteC }} style={{ width: 32, height: 32, borderRadius: 16 }} resizeMode="cover" />
                        ) : (
                          <Image source={avatarFonteC} style={{ width: 32, height: 32, borderRadius: 16 }} resizeMode="cover" />
                        )}
                        <View style={{ flex: 1 }}>
                          <Text style={DetalhePostStyles.commentAuthor}>{c.autor || c.nome}</Text>
                          <Text style={DetalhePostStyles.commentBody}>{c.texto}</Text>
                        </View>
                      </View>
                    );
                  })}

                  <View style={DetalhePostStyles.commentInputRow}>
                    <TextInput
                      style={DetalhePostStyles.commentInput}
                      placeholder="Adicionar um comentário..."
                      placeholderTextColor="#A3A0B3"
                      value={novoComentario}
                      onChangeText={setNovoComentario}
                    />
                    <TouchableOpacity
                      style={DetalhePostStyles.commentSendBtn}
                      onPress={handleAdicionarComentario}
                      activeOpacity={0.8}
                    >
                      <Text style={DetalhePostStyles.commentSendText}>Publicar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DetalhesPost;
