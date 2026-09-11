import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import BoasVindasScreen from "./screens/BoasVindasScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import NotificacoesScreen from "./screens/NotificacoesScreen";
import iconLogo from "../assets/incon_logo.png";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("notificacoes");

  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "shortcut icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = iconLogo;
    }
  }, []);

  const tratarNavegacaoAba = (abaId) => {
    if (abaId === "notificacao") {
      setTelaAtual("notificacoes");
    } else if (abaId === "perfil" || abaId === "inicio" || abaId === "criar") {
      setTelaAtual("boasVindas");
    }
  };

  if (telaAtual === "notificacoes") {
    return <NotificacoesScreen aoNavegarAba={tratarNavegacaoAba} />;
  }

  if (telaAtual === "cadastro") {
    return <CadastroScreen aoNavegarLogin={() => setTelaAtual("login")} />;
  }

  if (telaAtual === "login") {
    return <LoginScreen aoNavegarCadastro={() => setTelaAtual("cadastro")} />;
  }

  return (
    <BoasVindasScreen
      aoNavegarLogin={() => setTelaAtual("login")}
      aoNavegarCadastro={() => setTelaAtual("cadastro")}
    />
  );
}