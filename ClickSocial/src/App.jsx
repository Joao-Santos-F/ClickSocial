import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import iconLogo from "../assets/incon_logo.png";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("login");

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

  if (telaAtual === "cadastro") {
    return <CadastroScreen aoNavegarLogin={() => setTelaAtual("login")} />;
  }

  return <LoginScreen aoNavegarCadastro={() => setTelaAtual("cadastro")} />;
}