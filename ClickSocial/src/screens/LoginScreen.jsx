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

// Componentes modulares em PT-BR
import {
  IconeCabecalho,
  CampoTexto,
  BotaoPrincipal,
  Divisor,
  BotaoGoogle,
  LinkRodape,
} from "../components";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const lidarComLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Por favor, preencha os campos de e-mail e senha.");
      return;
    }

    setCarregando(true);
    // Simulação de autenticação
    setTimeout(() => {
      setCarregando(false);
      Alert.alert("Sucesso", `Login efetuado com o e-mail: ${email}`);
    }, 1200);
  };

  const lidarComLoginGoogle = () => {
    Alert.alert("Google Login", "Iniciando autenticação com a conta Google...");
  };

  const lidarComNavegacaoCadastro = () => {
    Alert.alert("Navegação", "Redirecionando para a tela de Cadastro...");
  };

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      style={styles.containerFundo}
    >
      <KeyboardAvoidingView
        style={styles.tecladoContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar style="light" />
        <ScrollView
          contentContainerStyle={styles.conteudoRolagem}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cartao}>
          {/* Ícone Superior */}
          <IconeCabecalho tamanho={60} />

          {/* Título */}
          <Text style={styles.titulo}>Login</Text>

          {/* Formularío de Entrada */}
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

          {/* Botão de Ação Principal */}
          <BotaoPrincipal
            titulo="Entrar"
            aoPressionar={lidarComLogin}
            carregando={carregando}
          />

          {/* Divisor */}
          <Divisor texto="ou" />

          {/* Botão Social Google */}
          <BotaoGoogle aoPressionar={lidarComLoginGoogle} />

          {/* Link para Cadastro */}
          <LinkRodape
            textoPergunta="Não tem uma conta?"
            textoAcao="Cadastra-se"
            aoPressionarAcao={lidarComNavegacaoCadastro}
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
  tecladoContainer: {
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
