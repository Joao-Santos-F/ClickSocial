import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
    SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { DetalhePostStyles } from "./DetalhePost.js";
import setaE from "../../../assets/incon_seta-esquerda.png";
import iconCoracao from "../../../assets/incon_coracao.png";
import avatarCauhe from "../../../assets/avatar_cauhe.jpg";
import postPreview from "../../../assets/post_preview.jpg";

import avatarEduardo from "../../../assets/top amigo 2.png";
import avatarDefault from "../../../assets/Gemini_Generated_Image_1rfyg1rfyg1rfyg1.png";

export const DetalhesPost = ({ onVoltar, onVerComentarios, post, aoCurtirPost }) => {
  const [curtido, setCurtido] = useState(post?.curtido || false);
  const likesPadrao = post?.curtidas ? Number(post.curtidas) : (post?.likes || 67);
  const [likes, setLikes] = useState(likesPadrao);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [novoComentario, setNovoComentario] = useState("");
  const [comentarios, setComentarios] = useState(post?.comentarios || [
    { id: "1", autor: "Lucas M.", texto: "Sensacional demais!", avatar: avatarDefault },
    { id: "2", autor: "Beatriz R.", texto: "Parabéns, ficou incrível!", avatar: avatarEduardo },
  ]);

  const autorNome = post?.user || post?.autor || "Cauhê S.";
  const autorUsername = post?.username || (post?.user ? `@${post.user.toLowerCase().replace(/[^a-z0-9_]/g, "")}` : "@grugez");
  const autorTime = post?.time || post?.tempo || "Há 5 horas";
  const postTexto = post?.text || post?.texto || "Irmão, teu álbum merece um premio!!!!";
  const postImagem = post?.image || post?.imagem || postPreview;
  const postAvatar = post?.avatar || avatarCauhe;

  const handleLike = () => {
    if (curtido) {
      setCurtido(false);
      setLikes(likes - 1);
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
    setComentarios([
      ...comentarios,
      {
        id: String(Date.now()),
        autor: "Você",
        texto: novoComentario.trim(),
        avatar: avatarDefault,
      },
    ]);
    setNovoComentario("");
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
                {typeof postAvatar === "string" ? (
                  <Image source={{ uri: postAvatar }} style={DetalhePostStyles.avatar} />
                ) : (
                  <Image source={postAvatar} style={DetalhePostStyles.avatar} />
                )}
                <View style={DetalhePostStyles.authorInfo}>
                  <Text style={DetalhePostStyles.authorName}>{autorNome}</Text>
                  <Text style={DetalhePostStyles.authorUsername}>{autorUsername}</Text>
                  <Text style={DetalhePostStyles.authorTime}>{autorTime}</Text>
                </View>
              </View>

              {/* Texto do Post */}
              <Text style={DetalhePostStyles.postText}>
                {postTexto}
              </Text>

              {/* Imagem do Post */}
              {postImagem && (
                <View style={DetalhePostStyles.imageContainer}>
                  {typeof postImagem === "string" ? (
                    <Image
                      source={{ uri: postImagem }}
                      style={DetalhePostStyles.postImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={postImagem}
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
                    const avatarFonte = c.avatar || (c.autor === 'Eduardo Torolho' ? avatarEduardo : avatarDefault);
                    return (
                      <View key={c.id || index} style={[DetalhePostStyles.commentItem, { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }]}>
                        {typeof avatarFonte === 'string' ? (
                          <Image source={{ uri: avatarFonte }} style={{ width: 32, height: 32, borderRadius: 16 }} resizeMode="cover" />
                        ) : (
                          <Image source={avatarFonte} style={{ width: 32, height: 32, borderRadius: 16 }} resizeMode="cover" />
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
