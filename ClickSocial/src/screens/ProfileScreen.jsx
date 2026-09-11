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
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../styles/theme";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileTabs } from "../components/ProfileTabs";
import { GradePublicacoes } from "../components/GradePublicacoes";
import { SecaoComentarios } from "../components/SecaoComentarios";
import { NavegacaoInferior } from "../components/NavegacaoInferior";

export default function ProfileScreen() {
  const [abaAtiva, setAbaAtiva] = useState(0);

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      style={styles.containerFundo}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        {/* Conteúdo com scroll */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudoScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho do Perfil com Bio digitável e interações */}
          <ProfileHeader />

          {/* Cartão de Conteúdo (Abas + Grade/Comentários) */}
          <View style={styles.cartaoConteudo}>
            {/* Abas de navegação de conteúdo */}
            <ProfileTabs abaAtiva={abaAtiva} aoMudarAba={setAbaAtiva} />

            {/* Conteúdo dinâmico das Abas */}
            {abaAtiva === 0 && <GradePublicacoes />}
            {abaAtiva === 1 && <SecaoComentarios />}
            {abaAtiva === 2 && <GradePublicacoes />}
            {abaAtiva === 3 && <SecaoComentarios />}
          </View>
        </ScrollView>

        {/* Footer fixo na parte inferior */}
        <NavegacaoInferior />
      </SafeAreaView>
    </LinearGradient>
  );
}

const alturaStatusBar = Platform.OS === "android" ? RNStatusBar.currentHeight || 24 : 0;

const styles = StyleSheet.create({
  containerFundo: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: alturaStatusBar,
  },
  scroll: {
    flex: 1,
  },
  conteudoScroll: {
    paddingTop: 10,
    paddingBottom: 20,
    gap: 12,
  },
  cartaoConteudo: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.card,
    marginHorizontal: theme.spacing.sm,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});

