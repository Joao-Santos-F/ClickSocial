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
  { id: "1", curtidas: 124, curtido: false },
  { id: "2", curtidas: 89, curtido: true },
  { id: "3", curtidas: 452, curtido: false },
  { id: "4", curtidas: 210, curtido: false },
  { id: "5", curtidas: 67, curtido: false },
  { id: "6", curtidas: 980, curtido: true },
];

export function GradePublicacoes() {
  const [posts, setPosts] = useState(POSTS_INICIAIS);

  const lidarComToquePost = (id) => {
    setPosts((postsAnteriores) =>
      postsAnteriores.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            curtido: !p.curtido,
            curtidas: p.curtido ? p.curtidas - 1 : p.curtidas + 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <View style={styles.container}>
      {posts.map((post) => (
        <TouchableOpacity
          key={post.id}
          activeOpacity={0.85}
          style={styles.itemPost}
          onPress={() => lidarComToquePost(post.id)}
        >
          <View style={styles.conteudoPost}>
            <MascoteVerde tamanho="100%" />
          </View>
          {/* Badge de feedback visual com curtidas */}
          <View style={styles.badgeCurtidas}>
            <IconeTabCoracao
              tamanho={14}
              cor={post.curtido ? "#FF3B30" : "#FFFFFF"}
            />
            <Text style={styles.textoCurtidas}>{post.curtidas}</Text>
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
    padding: 10,
    backgroundColor: theme.colors.cardBackground,
  },
  itemPost: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
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
