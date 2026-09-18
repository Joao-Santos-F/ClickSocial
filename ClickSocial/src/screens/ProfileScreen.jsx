import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "../styles/theme";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileTabs } from "../components/ProfileTabs";
import { GradePublicacoes } from "../components/GradePublicacoes";
import { SecaoComentarios } from "../components/SecaoComentarios";
import NavegacaoInferior from "../components/NavegacaoInferior";

export default function ProfileScreen({
  telaAtiva = "perfil",
  aoMudarTela,
  onEditar,
  onVoltar,
  dadosPerfil,
  postsCompartilhados,
  setPostsCompartilhados,
}) {
  const [abaAtiva, setAbaAtiva] = useState(0);

  // Handlers seguros de navegação do perfil
  const lidarComEditar = () => {
    if (typeof onEditar === "function") onEditar();
    else if (typeof aoMudarTela === "function") aoMudarTela("editarPerfil");
  };

  const lidarComVoltar = () => {
    if (typeof onVoltar === "function") onVoltar();
    else if (typeof aoMudarTela === "function") aoMudarTela("feed");
  };

  const postsUsuario = (postsCompartilhados || []).filter(
    (p) =>
      (p.user || "").toLowerCase() === (dadosPerfil?.usuario || "").toLowerCase() ||
      (p.user || "").toLowerCase() === (dadosPerfil?.nome || "").toLowerCase()
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={theme.colors.background} translucent />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudoScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho do Perfil com foto dinâmica e dados reais */}
        <ProfileHeader
          onEditPress={lidarComEditar}
          onVoltarPress={lidarComVoltar}
          dadosPerfil={dadosPerfil}
          postsCount={postsUsuario.length}
        />

        {/* Abas de navegação de conteúdo */}
        <ProfileTabs abaAtiva={abaAtiva} aoMudarAba={setAbaAtiva} />

        {/* Conteúdo dinâmico das Abas */}
        {abaAtiva === 0 && (
          <GradePublicacoes
            apenasPostados={true}
            dadosPerfil={dadosPerfil}
            postsCompartilhados={postsCompartilhados}
            setPostsCompartilhados={setPostsCompartilhados}
            aoAbrirPost={(post) => aoMudarTela && aoMudarTela("detalhes", post, "perfil")}
          />
        )}
        {abaAtiva === 1 && (
          <SecaoComentarios
            dadosPerfil={dadosPerfil}
            postsCompartilhados={postsCompartilhados}
          />
        )}
        {abaAtiva === 2 && (
          <GradePublicacoes
            apenasCurtidas={true}
            dadosPerfil={dadosPerfil}
            postsCompartilhados={postsCompartilhados}
            setPostsCompartilhados={setPostsCompartilhados}
            aoAbrirPost={(post) => aoMudarTela && aoMudarTela("detalhes", post, "perfil")}
          />
        )}
        {abaAtiva === 3 && (
          <GradePublicacoes
            apenasRepublicados={true}
            dadosPerfil={dadosPerfil}
            postsCompartilhados={postsCompartilhados}
            setPostsCompartilhados={setPostsCompartilhados}
            aoAbrirPost={(post) => aoMudarTela && aoMudarTela("detalhes", post, "perfil")}
          />
        )}
      </ScrollView>

      {/* Footer fixo na parte inferior */}
      <NavegacaoInferior telaAtiva={telaAtiva} aoMudarTela={aoMudarTela} />
    </SafeAreaView>
  );
}

const alturaStatusBar = Platform.OS === "android" ? RNStatusBar.currentHeight || 24 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: alturaStatusBar,
  },
  scroll: {
    flex: 1,
  },
  conteudoScroll: {
    paddingTop: 12,
    paddingBottom: 20,
  },
});
