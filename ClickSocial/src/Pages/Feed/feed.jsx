import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feedstyles } from "./feedStyle";
import NavegacaoInferior from "../../components/NavegacaoInferior";
import {
  IconeLogoFeed,
  IconeBuscarFeed,
  IconeMaisInformacoes,
  IconeCoracaoFeed,
  IconeMensagemFeed,
  IconeTabRepost,
} from "../../components/IconesSvg";

const POSTS_PADRAO = [
  {
    id: 1,
    user: "Arthurbr-YT",
    time: "Há 2 horas",
    text: "Acabei de publicar um novo conteúdo no canal! Vamos juntos explorar novas ideias e aprender coisas novas.",
    accent: "#5ef9d6",
    avatar: require("../../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
    image: require("../../../assets/12 Sem Título_20260828133808.jpg"),
    curtidas: 1900,
    curtido: false,
    comentariosCount: 120,
    republicado: false,
    tags: ["#Canal", "#ClickSocial", "#Tech"],
  },
  {
    id: 2,
    user: "Outro Cara",
    time: "Ontem",
    text: "Só eu que acho que o @Arthurbr-YT é uma mona chata? Tipo é, tipo an, tipo nada havê",
    accent: "#74f7c7",
    avatar: require("../../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
    image: require("../../../assets/1212.jpg"),
    curtidas: 840,
    curtido: false,
    comentariosCount: 45,
    republicado: false,
    tags: ["#Opinião", "#ClickSocial"],
  },
  {
    id: 3,
    user: "Eduardo Torolho",
    time: "Ontem",
    text: "É o goat não tem jeito 🔥🔥",
    accent: "#74f7c7",
    avatar: require("../../../assets/top amigo 2.png"),
    image: null,
    curtidas: 320,
    curtido: true,
    comentariosCount: 12,
    republicado: true,
    tags: ["#Goat", "#Fogo"],
  },
];

function Artwork({ accent }) {
  return (
    <View style={Feedstyles.artwork}>
      <View style={[Feedstyles.eye, { left: "18%" }, { borderColor: accent }]}>
        <View style={[Feedstyles.eyeInner, { backgroundColor: accent }]} />
        <View style={Feedstyles.eyeHighlight} />
      </View>

      <View style={[Feedstyles.eye, { right: "18%" }, { borderColor: accent }]}>
        <View style={[Feedstyles.eyeInner, { backgroundColor: accent }]} />
        <View style={Feedstyles.eyeHighlight} />
      </View>

      <View style={Feedstyles.mouthWrap}>
        <View style={[Feedstyles.mouth, { borderColor: accent }]} />
      </View>
    </View>
  );
}

export default function Feed({
  telaAtiva = "Feed",
  aoMudarTela,
  aoAbrirPost,
  postsLista,
  setPostsLista,
  aoCurtirPost,
  aoRepublicarPost,
}) {
  const [localPosts, setLocalPosts] = useState(POSTS_PADRAO);

  const postsExibidos = postsLista || localPosts;
  const setPosts = setPostsLista || setLocalPosts;

  const abrirDetalhesDoPost = (post) => {
    if (aoAbrirPost) {
      aoAbrirPost(post);
    } else if (aoMudarTela) {
      aoMudarTela("detalhes", post);
    }
  };

  const abrirComentariosDoPost = (post) => {
    if (aoMudarTela) {
      aoMudarTela("comentarios", post);
    }
  };

  const alternarCurtida = (id) => {
    if (aoCurtirPost) {
      aoCurtirPost(id);
    } else {
      setPosts((anteriores) =>
        anteriores.map((p) => {
          if (p.id === id) {
            const novoCurtido = !p.curtido;
            return {
              ...p,
              curtido: novoCurtido,
              curtidas: novoCurtido ? (p.curtidas || 0) + 1 : Math.max(0, (p.curtidas || 0) - 1),
            };
          }
          return p;
        })
      );
    }
  };

  const alternarRepublicado = (id) => {
    if (aoRepublicarPost) {
      aoRepublicarPost(id);
    } else {
      setPosts((anteriores) =>
        anteriores.map((p) => {
          if (p.id === id) {
            const novoRepublicado = !p.republicado;
            return {
              ...p,
              republicado: novoRepublicado,
              repostsCount: novoRepublicado ? (p.repostsCount || 0) + 1 : Math.max(0, (p.repostsCount || 0) - 1),
            };
          }
          return p;
        })
      );
    }
  };

  const renderAvatarPost = (avatar) => {
    if (!avatar) {
      return <Image source={require("../../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png")} style={Feedstyles.AvatarImage} />;
    }

    if (typeof avatar === "object" && avatar?.uri) {
      return <Image source={{ uri: avatar.uri }} style={Feedstyles.AvatarImage} />;
    }

    if (typeof avatar === "string") {
      if (avatar.startsWith("data:") || avatar.startsWith("http") || avatar.startsWith("blob:")) {
        return <Image source={{ uri: avatar }} style={Feedstyles.AvatarImage} />;
      }
      if (avatar.includes("top amigo")) {
        return <Image source={require("../../../assets/top amigo 2.png")} style={Feedstyles.AvatarImage} />;
      }
      if (avatar.includes("WhatsApp Image")) {
        return <Image source={require("../../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png")} style={Feedstyles.AvatarImage} />;
      }
    }

    if (typeof avatar === "number") {
      return <Image source={avatar} style={Feedstyles.AvatarImage} />;
    }

    return <Image source={require("../../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png")} style={Feedstyles.AvatarImage} />;
  };

  const alturaStatusBar = Platform.OS === "android" ? RNStatusBar.currentHeight || 24 : 0;

  return (
    <LinearGradient
      colors={["#211645", "#181122"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      <SafeAreaView style={{ flex: 1, paddingTop: alturaStatusBar }}>
        <View style={Feedstyles.Main_feed}>
          {/* Cabeçalho */}
          <View style={Feedstyles.Header}>
            <Text style={Feedstyles.HeaderText}>Click Social</Text>

            <View style={{ marginLeft: 9, marginTop: 2 }}>
              <IconeLogoFeed tamanho={20} />
            </View>

            <TouchableOpacity
              style={Feedstyles.SearchButton}
              onPress={() => aoMudarTela && aoMudarTela("pesquisa")}
              activeOpacity={0.7}
            >
              <IconeBuscarFeed tamanho={20} />
            </TouchableOpacity>
          </View>

          {/* Feed Scroll */}
          <ScrollView
            style={Feedstyles.feedScroll}
            contentContainerStyle={Feedstyles.feedContent}
            showsVerticalScrollIndicator={false}
          >
            {postsExibidos.map((post) => (
              <View key={post.id} style={Feedstyles.PostCard}>
                <View style={Feedstyles.PostHeader}>
                  <View style={Feedstyles.AvatarWrap}>
                    {renderAvatarPost(post.avatar)}
                  </View>

                  <View style={Feedstyles.UserTextWrap}>
                    <Text style={Feedstyles.UserName}>{post.user}</Text>
                    <Text style={Feedstyles.MetaText}>
                      {post.time || "Agora"}
                    </Text>
                  </View>

                  <TouchableOpacity style={Feedstyles.MenuButton} activeOpacity={0.7}>
                    <IconeMaisInformacoes tamanho={18} />
                  </TouchableOpacity>
                </View>

                <Text style={Feedstyles.PostText}>{post.text}</Text>

                {Boolean(post.localizacao) && (
                  <View style={Feedstyles.LocationBadgeRow}>
                    <Text style={Feedstyles.LocationBadgeText}>📍 {post.localizacao}</Text>
                  </View>
                )}

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => abrirDetalhesDoPost(post)}
                >
                  {post.image ? (
                    typeof post.image === "string" ? (
                      <Image source={{ uri: post.image }} style={Feedstyles.PostImage} resizeMode="cover" />
                    ) : (
                      <Image source={post.image} style={Feedstyles.PostImage} resizeMode="cover" />
                    )
                  ) : (
                    <Artwork accent={post.accent || "#5ef9d6"} />
                  )}
                </TouchableOpacity>

                {/* Linha de Ações */}
                <View style={Feedstyles.ActionsRow}>
                  {/* Curtir */}
                  <TouchableOpacity
                    style={Feedstyles.ActionItem}
                    activeOpacity={0.7}
                    onPress={() => alternarCurtida(post.id)}
                  >
                    <IconeCoracaoFeed
                      tamanho={20}
                      cor={post.curtido ? "#FF3B30" : "#9CA3AF"}
                    />
                    <Text
                      style={[
                        Feedstyles.ActionText,
                        post.curtido && { color: "#FF3B30", fontWeight: "700" },
                      ]}
                    >
                      {post.curtidas || 0}
                    </Text>
                  </TouchableOpacity>

                  {/* Comentar */}
                  <TouchableOpacity
                    style={Feedstyles.ActionItem}
                    activeOpacity={0.7}
                    onPress={() => abrirComentariosDoPost(post)}
                  >
                    <IconeMensagemFeed tamanho={20} cor="#9CA3AF" />
                    <Text style={Feedstyles.ActionText}>
                      {Array.isArray(post.comentarios) ? post.comentarios.length : (post.comentariosCount || 0)}
                    </Text>
                  </TouchableOpacity>

                  {/* Republicar */}
                  <TouchableOpacity
                    style={Feedstyles.ActionItem}
                    activeOpacity={0.7}
                    onPress={() => alternarRepublicado(post.id)}
                  >
                    <IconeTabRepost
                      tamanho={20}
                      cor={post.republicado ? "#00C853" : "#9CA3AF"}
                    />
                    <Text
                      style={[
                        Feedstyles.ActionText,
                        post.republicado && { color: "#00C853", fontWeight: "700" },
                      ]}
                    >
                      {Array.isArray(post.republicadores) ? post.republicadores.length : (post.repostsCount || 0)}
                    </Text>
                  </TouchableOpacity>

                  {/* Ver mais / Detalhes */}
                  <View style={Feedstyles.ActionItemShare}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => abrirDetalhesDoPost(post)}
                    >
                      <Text style={Feedstyles.ActionIconShare}>Ver mais</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <NavegacaoInferior telaAtiva={telaAtiva} aoMudarTela={aoMudarTela} />
      </SafeAreaView>
    </LinearGradient>
  );
}