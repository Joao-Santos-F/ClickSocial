import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../styles/theme";
import NavegacaoInferior from "../components/NavegacaoInferior";
import { IconeMensagemFeed, IconeTabRepost, IconeLogoFeed } from "../components/IconesSvg";
import { ordenarNotificacoesPorData } from "../context/ApiContext";
import iconCoracao from "../../assets/incon_coracao.png";
import iconSeguidor from "../../assets/incon_seguidor.png";

const NOTIFICACOES_PADRAO = [
  {
    id: "1",
    tipo: "curtida",
    usuario: "Arthurbr-YT",
    texto: "Curtiu sua publicação",
    horario: "10:38",
    postId: "1",
  },
  {
    id: "2",
    tipo: "comentario",
    usuario: "Arthurbr-YT",
    texto: "Comentou em sua publicação: 'Ficou demais!'",
    horario: "10:37",
    postId: "1",
  },
  {
    id: "3",
    tipo: "seguir",
    usuario: "Arthurbr-YT",
    texto: "Começou a te seguir",
    horario: "10:36",
    postId: null,
  },
  {
    id: "4",
    tipo: "curtida",
    usuario: "Cauhê S.",
    texto: "Curtiu sua publicação",
    horario: "10:38",
    postId: "2",
  },
  {
    id: "5",
    tipo: "seguir",
    usuario: "Cauhê S.",
    texto: "Começou a te seguir",
    horario: "10:36",
    postId: null,
  },
];

export default function NotificacoesScreen({
  telaAtiva = "notificacao",
  aoMudarTela,
  aoNavegarAba,
  posts = [],
  notificacoes,
  notificacoesLista,
}) {
  const lidarNavegacao = aoMudarTela || aoNavegarAba;
  const listaBruta = notificacoesLista || notificacoes || NOTIFICACOES_PADRAO;
  const listaNotificacoes = React.useMemo(() => {
    return ordenarNotificacoesPorData(listaBruta);
  }, [listaBruta]);

  const lidarCliqueNotificacao = (item) => {
    if (!lidarNavegacao) return;

    if (item.tipo === "seguir") {
      lidarNavegacao("perfil");
    } else {
      const postAlvo = posts.find((p) => p.id === item.postId) || posts[0];
      lidarNavegacao("detalhes", postAlvo, "notificacao");
    }
  };

  const renderizarIcone = (tipo) => {
    switch (tipo) {
      case "curtida":
        return (
          <Image
            source={iconCoracao}
            style={styles.iconeImagem}
            resizeMode="contain"
          />
        );
      case "comentario":
        return <IconeMensagemFeed tamanho={24} cor="#110D20" />;
      case "repost":
        return <IconeTabRepost tamanho={24} cor="#00C853" />;
      case "post":
        return <IconeLogoFeed tamanho={24} cor="#7C3AED" />;
      case "seguir":
        return (
          <Image
            source={iconSeguidor}
            style={styles.iconeImagem}
            resizeMode="contain"
          />
        );
      default:
        return <IconeMensagemFeed tamanho={24} cor="#110D20" />;
    }
  };

  const alturaStatusBar = Platform.OS === "android" ? RNStatusBar.currentHeight || 24 : 0;

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      style={styles.containerFundo}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, paddingTop: alturaStatusBar }}>
        <View style={styles.conteudoPrincipal}>
          <View style={styles.cartao}>
            <View style={styles.cabecalhoCartao}>
              <Text style={styles.tituloCabecalho}>Notificações</Text>
            </View>
            <View style={styles.divisorLinha} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listaConteudo}
            >
              {listaNotificacoes.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={styles.itemNotificacao}
                    activeOpacity={0.7}
                    onPress={() => lidarCliqueNotificacao(item)}
                  >
                    <View style={styles.containerIcone}>
                      {renderizarIcone(item.tipo)}
                    </View>
                    <View style={styles.containerTexto}>
                      <Text style={styles.textoMensagem}>
                        <Text style={styles.nomeUsuario}>{item.usuario}</Text>{" "}
                        <Text style={styles.acaoTexto}>{item.texto}</Text>
                      </Text>
                      <Text style={styles.horarioTexto}>{item.horario}</Text>
                    </View>
                  </TouchableOpacity>
                  {index < listaNotificacoes.length - 1 && (
                    <View style={styles.divisorLinhaItem} />
                  )}
                </React.Fragment>
              ))}
            </ScrollView>
          </View>
        </View>

        <NavegacaoInferior
          telaAtiva={telaAtiva}
          aoMudarTela={lidarNavegacao}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  containerFundo: {
    flex: 1,
  },
  conteudoPrincipal: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 36,
    paddingBottom: 16,
    justifyContent: "center",
  },
  cartao: {
    flex: 1,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    overflow: "hidden",
  },
  cabecalhoCartao: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tituloCabecalho: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  divisorLinha: {
    height: 1,
    backgroundColor: "#E2E0EC",
    width: "100%",
  },
  listaConteudo: {
    paddingVertical: 8,
  },
  itemNotificacao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  containerIcone: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  iconeImagem: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  containerTexto: {
    flex: 1,
  },
  textoMensagem: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  nomeUsuario: {
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  acaoTexto: {
    fontWeight: "400",
    color: theme.colors.textSecondary,
  },
  horarioTexto: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  divisorLinhaItem: {
    height: 1,
    backgroundColor: "#E2E0EC",
    marginHorizontal: 16,
  },
});
