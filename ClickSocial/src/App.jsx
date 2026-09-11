import React, { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen";
import Feed from "./Pages/Feed/feed";
import Pesquisa from "./Pages/Pesquisa/pesquisa";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("Feed");

  const navegarPara = (id) => {
    if (id === "perfil") {
      setTelaAtual("perfil");
      return;
    }

    if (id === "pesquisa") {
      setTelaAtual("pesquisa");
      return;
    }

    setTelaAtual("Feed");
  };

  if (telaAtual === "perfil") {
    return <ProfileScreen telaAtiva="perfil" aoMudarTela={navegarPara} />;
  }

  if (telaAtual === "pesquisa") {
    return <Pesquisa telaAtiva="Feed" aoMudarTela={navegarPara} />;
  }

  return <Feed telaAtiva="Feed" aoMudarTela={navegarPara} />;
}