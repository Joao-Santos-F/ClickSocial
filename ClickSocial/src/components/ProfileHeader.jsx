import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { theme } from "../styles/theme";
import {
  IconeSetaVoltar,
  IconeVerificado,
  IconeDestaque,
  MascoteVerde,
} from "./IconesSvg";

import { useApi } from "../context/ApiContext";

const DESTAQUES = [
  { id: "1", rotulo: "Highlights 1" },
  { id: "2", rotulo: "Highlights 2" },
  { id: "3", rotulo: "Highlights 3" },
  { id: "4", rotulo: "Highlights 4" },
  { id: "5", rotulo: "Highlights 5" },
];

export function ProfileHeader({ onEditPress, onVoltarPress, dadosPerfil, postsCount = 0 }) {
  const { usuarioLogado, usuarios = [] } = useApi();

  const lidarComVoltar = () => {
    if (onVoltarPress) {
      onVoltarPress();
    } else {
      Alert.alert("Navegação", "Retornar para a tela anterior.");
    }
  };

  const lidarComEditar = () => {
    if (onEditPress) {
      onEditPress();
    }
  };

  const lidarComArquivados = () => {
    Alert.alert("Arquivados", "Acessando publicações arquivadas.");
  };

  const lidarComDestaque = (id) => {
    Alert.alert("Destaque", `Abrindo story em destaque #${id}`);
  };

  const renderAvatarImage = () => {
    let img =
      dadosPerfil?.fotoUri ||
      dadosPerfil?.imagemPerfil ||
      usuarioLogado?.fotoUri ||
      usuarioLogado?.imagemPerfil;

    if (!img && usuarioLogado) {
      const match = usuarios.find(
        (u) => (u.usuario || "").toLowerCase() === (usuarioLogado.usuario || "").toLowerCase()
      );
      if (match?.fotoUri) img = match.fotoUri;
      else if (match?.imagemPerfil) img = match.imagemPerfil;
    }

    if (img) {
      let uriStr = typeof img === "object" ? img?.uri : img;

      if (typeof uriStr === "string") {
        if (uriStr.startsWith("data:") || uriStr.startsWith("http") || uriStr.startsWith("blob:")) {
          return <Image source={{ uri: uriStr }} style={styles.avatarImage} resizeMode="cover" />;
        }
        if (uriStr.includes("WhatsApp")) {
          return <Image source={require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png")} style={styles.avatarImage} resizeMode="cover" />;
        }
        if (uriStr.includes("top amigo")) {
          return <Image source={require("../../assets/top amigo 2.png")} style={styles.avatarImage} resizeMode="cover" />;
        }
      }
      if (typeof img === "number") {
        return <Image source={img} style={styles.avatarImage} resizeMode="cover" />;
      }
      if (typeof img === "object" && img?.uri) {
        return <Image source={{ uri: img.uri }} style={styles.avatarImage} resizeMode="cover" />;
      }
    }

    return <Image source={require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png")} style={styles.avatarImage} resizeMode="cover" />;
  };

  const ehVerificado = Boolean(dadosPerfil?.verificado);
  const totalPosts = postsCount ?? (dadosPerfil?.postsCount || 0);
  const seguidores = dadosPerfil?.seguidores ?? 0;
  const seguindo = dadosPerfil?.seguindo ?? 0;

  return (
    <View style={styles.cartao}>
      {/* Linha superior: Avatar + Info + Botão Voltar */}
      <View style={styles.linhaTopoContainer}>
        {/* Avatar Circular Interativo com foto dinâmica */}
        <TouchableOpacity
          onPress={lidarComEditar}
          activeOpacity={0.8}
          style={styles.avatarWrapper}
        >
          {renderAvatarImage()}
        </TouchableOpacity>

        {/* Informações: Nome + Badge + Estatísticas */}
        <View style={styles.infoContainer}>
          <View style={styles.linhaNome}>
            <Text style={styles.nomeTexto}>
              {dadosPerfil?.nome || dadosPerfil?.usuario || "Usuário"}
            </Text>
            {ehVerificado && (
              <View style={styles.badgeContainer}>
                <IconeVerificado tamanho={18} cor="#110D20" />
              </View>
            )}
          </View>

          {/* Estatísticas Dinâmicas */}
          <View style={styles.estatisticasContainer}>
            <TouchableOpacity activeOpacity={0.7} style={styles.estatisticaItem}>
              <Text style={styles.estatisticaNumero}>{totalPosts}</Text>
              <Text style={styles.estatisticaRotulo}>Post</Text>
              <View style={styles.linhaSublinhada} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.estatisticaItem}>
              <Text style={styles.estatisticaNumero}>{seguidores}</Text>
              <Text style={styles.estatisticaRotulo}>Seguidores</Text>
              <View style={styles.linhaSublinhada} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.estatisticaItem}>
              <Text style={styles.estatisticaNumero}>{seguindo}</Text>
              <Text style={styles.estatisticaRotulo}>Seguindo</Text>
              <View style={styles.linhaSublinhada} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão voltar */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          activeOpacity={0.6}
          onPress={lidarComVoltar}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao início"
        >
          <IconeSetaVoltar tamanho={22} cor={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Caixa de Bio */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioInput} numberOfLines={2} ellipsizeMode="tail">
          {dadosPerfil?.bio || "Criador de conteúdo e explorador de ideias."}
        </Text>
      </View>

      {/* Botões de Ação: Editar e Arquivados */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoAcao}
          activeOpacity={0.7}
          onPress={lidarComEditar}
        >
          <Text style={styles.botaoAcaoTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoAcao}
          activeOpacity={0.7}
          onPress={lidarComArquivados}
        >
          <Text style={styles.botaoAcaoTexto}>Arquivados</Text>
        </TouchableOpacity>
      </View>

      {/* 5 Círculos de Destaques Interativos (Avatar do Usuário) */}
      <View style={styles.destaquesContainer}>
        {DESTAQUES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.destaqueCirculo}
            activeOpacity={0.7}
            onPress={() => lidarComDestaque(item.id)}
          >
            {renderAvatarImage()}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.card,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    marginHorizontal: theme.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  linhaTopoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: theme.colors.iconPrimary,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#211645",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  linhaNome: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  nomeTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  badgeContainer: {
    marginLeft: 4,
  },
  estatisticasContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  estatisticaItem: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
    position: "relative",
    paddingBottom: 2,
  },
  linhaSublinhada: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: theme.colors.textPrimary,
  },
  estatisticaNumero: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  estatisticaRotulo: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  botaoVoltar: {
    padding: 6,
    marginLeft: 4,
    alignSelf: "flex-start",
  },
  bioContainer: {
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.small,
    height: 38,
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.inputBackground,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  bioInput: {
    fontSize: 13,
    color: theme.colors.textPrimary,
    padding: 0,
    margin: 0,
  },
  botoesContainer: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  botaoAcao: {
    flex: 1,
    height: 34,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.small,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.cardBackground,
  },
  botaoAcaoTexto: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.textSecondary,
  },
  destaquesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.md,
    paddingHorizontal: 2,
  },
  destaqueCirculo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0D0914",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
