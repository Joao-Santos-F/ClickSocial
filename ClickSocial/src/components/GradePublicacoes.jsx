import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
} from "react-native";
import { theme } from "../styles/theme";
import { MascoteVerde, IconeTabCoracao } from "./IconesSvg";

const { width } = Dimensions.get("window");
const ESPACAMENTO = 8;
const ITEM_WIDTH = (width - ESPACAMENTO * 3) / 2;

const POSTS_INICIAIS = [
  { id: "1", user: "Arthurbr-YT", text: "Minha foto especial", curtidas: 124, curtido: true, republicado: true },
  { id: "2", user: "Arthurbr-YT", text: "Mais um dia de produção", curtidas: 89, curtido: true, republicado: false },
  { id: "3", user: "Arthurbr-YT", text: "Explorando ideias", curtidas: 452, curtido: false, republicado: true },
  { id: "4", user: "Arthurbr-YT", text: "ClickSocial no topo", curtidas: 210, curtido: false, republicado: false },
  { id: "5", user: "Arthurbr-YT", text: "Novo projeto a caminho", curtidas: 67, curtido: false, republicado: false },
  { id: "6", user: "Arthurbr-YT", text: "Bastidores do canal", curtidas: 980, curtido: true, republicado: true },
];

export function GradePublicacoes({
  apenasCurtidas = false,
  apenasRepublicados = false,
  aoAbrirPost,
  postsCompartilhados,
  setPostsCompartilhados,
}) {
  const [localPosts, setLocalPosts] = useState(POSTS_INICIAIS);
  const [ultimoToque, setUltimoToque] = useState({});
  const [timerToque, setTimerToque] = useState({});

  const listaPosts = postsCompartilhados || localPosts;
  const atualizarPosts = setPostsCompartilhados || setLocalPosts;

  const alternarCurtida = (id) => {
    atualizarPosts((postsAnteriores) =>
      postsAnteriores.map((p) => {
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
  };

  const lidarComToque = (post) => {
    const agora = Date.now();
    const tempoAnterior = ultimoToque[post.id] || 0;

    if (agora - tempoAnterior < 300) {
      // Duplo clique detectado -> Curtir
      if (timerToque[post.id]) {
        clearTimeout(timerToque[post.id]);
      }
      setUltimoToque({ ...ultimoToque, [post.id]: 0 });
      alternarCurtida(post.id);
    } else {
      // Clique simples -> Aguardar para ver se vem outro toque ou abrir post
      setUltimoToque({ ...ultimoToque, [post.id]: agora });
      const timer = setTimeout(() => {
        if (aoAbrirPost) {
          aoAbrirPost(post);
        }
      }, 300);
      setTimerToque({ ...timerToque, [post.id]: timer });
    }
  };

  let postsFiltrados = listaPosts;
  if (apenasCurtidas) {
    postsFiltrados = postsFiltrados.filter((p) => p.curtido === true);
  }
  if (apenasRepublicados) {
    postsFiltrados = postsFiltrados.filter((p) => p.republicado === true);
  }

  if (postsFiltrados.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center", paddingVertical: 40 }]}>
        <Text style={{ color: theme.colors.textSecondary, textAlign: "center" }}>
          {apenasCurtidas
            ? "Nenhuma foto curtida ainda."
            : apenasRepublicados
            ? "Nenhuma foto republicada ainda."
            : "Nenhuma publicação encontrada."}
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
            <MascoteVerde tamanho={ITEM_WIDTH} />
          </View>
          {/* Badge de feedback visual com curtidas */}
          <View style={styles.badgeCurtidas}>
            <IconeTabCoracao
              tamanho={14}
              cor={post.curtido ? "#FF3B30" : "#FFFFFF"}
            />
            <Text style={styles.textoCurtidas}>{post.curtidas || 0}</Text>
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
  },
  itemPost: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
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
    gap: 4,
  },
  textoCurtidas: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
});
