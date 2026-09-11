import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import NavegacaoInferior from "../components/NavegacaoInferior";

const NOTIFICACOES = [
  {
    id: "1",
    tipo: "curtida",
    usuario: "Arthurbr-YT",
    texto: "Curitiu sua publicação",
    horario: "10:38",
  },
  {
    id: "2",
    tipo: "comentario",
    usuario: "Arthurbr-YT",
    texto: "Comentou em sua publicação",
    horario: "10:37",
  },
  {
    id: "3",
    tipo: "seguir",
    usuario: "Arthurbr-YT",
    texto: "Começou a te seguir",
    horario: "10:36",
  },
  {
    id: "4",
    tipo: "curtida",
    usuario: "Cauhê S.",
    texto: "Curitiu sua publicação",
    horario: "10:38",
  },
  {
    id: "5",
    tipo: "seguir",
    usuario: "Cauhê S.",
    texto: "Começou a te seguir",
    horario: "10:36",
  },
];

export default function NotificacoesScreen({
  telaAtiva = "notificacao",
  aoMudarTela,
  aoNavegarAba,
}) {
  const lidarNavegacao = aoMudarTela || aoNavegarAba;

  const renderizarIcone = (tipo) => {
    switch (tipo) {
      case "curtida":
        return (
          <Image
            source={require("../../assets/incon_coracao.png")}
            style={styles.iconeImagem}
            resizeMode="contain"
          />
        );
      case "comentario":
        return (
          <Image
            source={require("../../assets/incon_notificacao.png")}
            style={styles.iconeImagem}
            resizeMode="contain"
          />
        );
      case "seguir":
        return (
          <Image
            source={require("../../assets/incon_seguidor.png")}
            style={styles.iconeImagem}
            resizeMode="contain"
          />
        );
      default:
        return <Ionicons name="notifications" size={28} color={theme.colors.textPrimary} />;
    }
  };

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      style={styles.containerFundo}
    >
      <StatusBar style="light" />

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
            {NOTIFICACOES.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.itemNotificacao}
                  activeOpacity={0.7}
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
                {index < NOTIFICACOES.length - 1 && (
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
