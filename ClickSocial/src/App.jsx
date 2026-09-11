import React, { useState } from "react";
import BoasVindasScreen from "./screens/BoasVindasScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import Feed from "./Pages/Feed/feed";
import Pesquisa from "./Pages/Pesquisa/pesquisa";
import CriarPost from "./screens/clicksocial-CriaPost/CriaPost.jsx";
import DetalhesPost from "./screens/clicksocial-DetalhesPost/DetalhePost.jsx";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("boasVindas");
  const [postSelecionado, setPostSelecionado] = useState(null);

  // Roteador local incremental para fluxos de autenticação, feed, pesquisa, criar post e detalhes
  const lidarNavegacaoApp = (id, post) => {
    const destino = (id || "").toLowerCase();
    if (destino === "pesquisa") {
      setTelaAtual("pesquisa");
    } else if (destino === "feed" || destino === "inicio") {
      setTelaAtual("feed");
    } else if (destino === "criar" || destino === "criarpost") {
      setTelaAtual("criarPost");
    } else if (destino === "detalhes" || destino === "detalhepost") {
      setPostSelecionado(post || null);
      setTelaAtual("detalhes");
    } else if (destino === "sair" || destino === "login") {
      setTelaAtual("login");
    }
  };

  if (telaAtual === "feed") {
    return (
      <Feed
        telaAtiva="Feed"
        aoMudarTela={lidarNavegacaoApp}
        aoAbrirPost={(post) => lidarNavegacaoApp("detalhes", post)}
      />
    );
  }

  if (telaAtual === "pesquisa") {
    return <Pesquisa telaAtiva="Feed" aoMudarTela={lidarNavegacaoApp} />;
  }

  if (telaAtual === "criarPost") {
    return (
      <CriarPost
        onVoltar={() => setTelaAtual("feed")}
        onPublicarSucesso={() => setTelaAtual("feed")}
      />
    );
  }

  if (telaAtual === "detalhes") {
    return (
      <DetalhesPost
        post={postSelecionado}
        onVoltar={() => setTelaAtual("feed")}
      />
    );
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