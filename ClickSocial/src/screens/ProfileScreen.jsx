import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
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
}) {
  const [abaAtiva, setAbaAtiva] = useState(0);

  const lidarComEditar = onEditar || (() => aoMudarTela && aoMudarTela("editarPerfil"));
  const lidarComVoltar = onVoltar || (() => aoMudarTela && aoMudarTela("feed"));

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar com estilo light (ícones claros no fundo escuro) */}
      <StatusBar style="light" backgroundColor={theme.colors.background} translucent />

      {/* Conteúdo com scroll e margem superior ajustada para StatusBar */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudoScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho do Perfil com Bio digitável e interações */}
        <ProfileHeader
          onEditPress={lidarComEditar}
          onVoltarPress={lidarComVoltar}
          dadosPerfil={dadosPerfil}
        />

        {/* Abas de navegação de conteúdo */}
        <ProfileTabs abaAtiva={abaAtiva} aoMudarAba={setAbaAtiva} />

        {/* Conteúdo dinâmico das Abas */}
        {abaAtiva === 0 && (
          <GradePublicacoes
            aoAbrirPost={(post) => aoMudarTela && aoMudarTela("detalhes", post)}
          />
        )}
        {abaAtiva === 1 && <SecaoComentarios />}
        {abaAtiva === 2 && (
          <GradePublicacoes
            apenasCurtidas={true}
            aoAbrirPost={(post) => aoMudarTela && aoMudarTela("detalhes", post)}
          />
        )}
        {abaAtiva === 3 && (
          <GradePublicacoes
            apenasRepublicados={true}
            aoAbrirPost={(post) => aoMudarTela && aoMudarTela("detalhes", post)}
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
