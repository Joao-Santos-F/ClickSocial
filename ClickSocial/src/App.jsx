import React, { useState } from "react";
import BoasVindasScreen from "./screens/BoasVindasScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import Feed from "./Pages/Feed/feed";
import Pesquisa from "./Pages/Pesquisa/pesquisa";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("boasVindas");

  // Roteador local para permitir teste de Feed e Pesquisa integrado ao fluxo anterior
  const lidarNavegacaoApp = (id) => {
    const destino = (id || "").toLowerCase();
    if (destino === "pesquisa") {
      setTelaAtual("pesquisa");
    } else if (destino === "feed" || destino === "inicio") {
      setTelaAtual("feed");
    } else if (destino === "sair" || destino === "login") {
      setTelaAtual("login");
    }
  };

  if (telaAtual === "feed") {
    return <Feed telaAtiva="Feed" aoMudarTela={lidarNavegacaoApp} />;
  }

  if (telaAtual === "pesquisa") {
    return <Pesquisa telaAtiva="Feed" aoMudarTela={lidarNavegacaoApp} />;
  }

  if (telaAtual === "login") {
    return (
      <LoginScreen
        aoNavegarCadastro={() => setTelaAtual("cadastro")}
        aoNavegarBoasVindas={() => setTelaAtual("boasVindas")}
        aoFazerLogin={() => setTelaAtual("feed")}
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