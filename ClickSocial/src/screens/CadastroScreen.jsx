import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../styles/theme";

// Importação dos componentes modulares em PT-BR
import {
  IconeCabecalho,
  CampoTexto,
  CampoFoto,
  BotaoPrincipal,
  LinkRodape,
} from "../components";

export default function CadastroScreen({
  aoNavegarLogin,
  aoNavegarBoasVindas,
  onLogin,
  onVoltar,
}) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fotoUri, setFotoUri] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const lidarNavegarLogin = aoNavegarLogin || onLogin;
  const lidarVoltar = aoNavegarBoasVindas || onVoltar || lidarNavegarLogin;

  const lidarComCadastro = () => {
    if (!nomeCompleto || !nomeUsuario || !email || !senha) {
      Alert.alert(
        "Campos Obrigatórios",
        "Por favor, preencha todos os campos marcados com (*)."
      );
      return;
    }

    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => lidarNavegarLogin && lidarNavegarLogin() },
      ]);
    }, 1200);
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

            <Text style={styles.titulo}>Cadastro</Text>

            <CampoTexto
              rotulo="Nome Completo"
              textoAjuda="Digite seu Nome"
              valor={nomeCompleto}
              aoMudarTexto={setNomeCompleto}
              capitalizacaoAutomatica="words"
              obrigatorio
            />

            <CampoTexto
              rotulo="Nome de Usuário"
              textoAjuda="Digite seu User"
              valor={nomeUsuario}
              aoMudarTexto={setNomeUsuario}
              capitalizacaoAutomatica="none"
              obrigatorio
            />

            <CampoTexto
              rotulo="E-mail"
              textoAjuda="Digite seu email"
              valor={email}
              aoMudarTexto={setEmail}
              tipoTeclado="email-address"
              capitalizacaoAutomatica="none"
              obrigatorio
            />

            <CampoTexto
              rotulo="Senha"
              textoAjuda="Digite sua senha"
              valor={senha}
              aoMudarTexto={setSenha}
              senhaSegura
              obrigatorio
            />

            <CampoFoto
              rotulo="Foto de Perfil"
              textoAjuda="Insira sua Foto"
              aoSelecionarFoto={setFotoUri}
            />

            <BotaoPrincipal
              titulo="Criar Conta"
              aoPressionar={lidarComCadastro}
              carregando={carregando}
            />

            <LinkRodape
              textoPergunta="Tem uma conta?"
              textoAcao="Faça Login"
              aoPressionarAcao={lidarNavegarLogin}
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
