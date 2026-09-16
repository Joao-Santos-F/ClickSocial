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
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../styles/theme";
import { useApi } from "../context/ApiContext";

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
  const { cadastrarUsuario } = useApi();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fotoUri, setFotoUri] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const lidarNavegarLogin = aoNavegarLogin || onLogin;
  const lidarVoltar = aoNavegarBoasVindas || onVoltar || lidarNavegarLogin;

  const lidarComCadastro = async () => {
    if (!nomeCompleto || !nomeUsuario || !email || !senha) {
      Alert.alert(
        "Campos Obrigatórios",
        "Por favor, preencha todos os campos marcados com (*)."
      );
      return;
    }

    setCarregando(true);
    try {
      const res = await cadastrarUsuario({
        nomeCompleto,
        nomeUsuario,
        email,
        senha,
        fotoUri,
      });

      setCarregando(false);

      if (res.sucesso) {
        if (lidarNavegarLogin) {
          lidarNavegarLogin();
        }
      } else {
        Alert.alert("Erro no Cadastro", res.mensagem || "Não foi possível cadastrar a conta.");
      }
    } catch (error) {
      setCarregando(false);
      Alert.alert("Erro", "Ocorreu um erro inesperado ao cadastrar a conta.");
    }
  };

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient}
      style={styles.containerFundo}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
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
      </SafeAreaView>
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
