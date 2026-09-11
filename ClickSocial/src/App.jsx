import React, { useState } from "react";
import BoasVindasScreen from "./screens/BoasVindasScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("boasVindas");

  if (telaAtual === "login") {
    return (
      <LoginScreen
        aoNavegarCadastro={() => setTelaAtual("cadastro")}
        aoNavegarBoasVindas={() => setTelaAtual("boasVindas")}
      />
    );
  }

  if (telaAtual === "cadastro") {
    return (
      <CadastroScreen
        aoNavegarLogin={() => setTelaAtual("login")}
        aoNavegarBoasVindas={() => setTelaAtual("boasVindas")}
      />
    );
  }

  return (
    <BoasVindasScreen
      aoNavegarLogin={() => setTelaAtual("login")}
      aoNavegarCadastro={() => setTelaAtual("cadastro")}
    />
  );
}