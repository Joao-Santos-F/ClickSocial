import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../styles/theme";

import {
  IconeCabecalho,
  CampoTexto,
  BotaoPrincipal,
  Divisor,
  BotaoGoogle,
  LinkRodape,
} from "../components";

export default function LoginScreen({
  aoNavegarCadastro,
  aoNavegarBoasVindas,
  onCadastro,
  onVoltar,
  aoFazerLogin,
}) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const lidarNavegarCadastro = aoNavegarCadastro || onCadastro;
  const lidarVoltar = aoNavegarBoasVindas || onVoltar;

  const lidarComLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Por favor, preencha os campos de e-mail e senha.");
      return;
    }

    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      Alert.alert("Sucesso", `Login efetuado com o e-mail: ${email}`, [
        { text: "OK", onPress: () => aoFazerLogin && aoFazerLogin() },
      ]);
    }, 1200);
  };

  const lidarComLoginGoogle = () => {
    Alert.alert("Google Login", "Iniciando autenticação com a conta Google...");
  };

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      style={styles.containerFundo}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.conteudoRolagem}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cartao}>
            <TouchableOpacity
              onPress={lidarVoltar}
              disabled={!lidarVoltar}
              activeOpacity={0.7}
            >
              <IconeCabecalho tamanho={60} />
            </TouchableOpacity>

            <Text style={styles.titulo}>Login</Text>

            <CampoTexto
              rotulo="E-mail"
              textoAjuda="Digite seu email"
              valor={email}
              aoMudarTexto={setEmail}
              tipoTeclado="email-address"
              capitalizacaoAutomatica="none"
            />

            <CampoTexto
              rotulo="Senha"
              textoAjuda="Digite sua senha"
              valor={senha}
              aoMudarTexto={setSenha}
              senhaSegura
            />

            <BotaoPrincipal
              titulo="Entrar"
              aoPressionar={lidarComLogin}
              carregando={carregando}
            />

            <Divisor texto="ou" />

            <BotaoGoogle aoPressionar={lidarComLoginGoogle} />

            <LinkRodape
              textoPergunta="Não tem uma conta?"
              textoAcao="Cadastra-se"
              aoPressionarAcao={lidarNavegarCadastro}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  containerFundo: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  conteudoRolagem: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  cartao: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.card,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
    marginTop: 4,
  },
});
