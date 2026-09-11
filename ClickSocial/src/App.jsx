import React, { useState } from "react";
import BoasVindasScreen from "./screens/BoasVindasScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import Feed from "./Pages/Feed/feed";
import Pesquisa from "./Pages/Pesquisa/pesquisa";
import CriarPost from "./screens/clicksocial-CriaPost/CriaPost.jsx";
import DetalhesPost from "./screens/clicksocial-DetalhesPost/DetalhePost.jsx";
import ProfileScreen from "./screens/ProfileScreen";
import EditarPerfil from "./screens/EditarPerfil";
import Comentario from "./screens/Comentario";
import NotificacoesScreen from "./screens/NotificacoesScreen";

export default function App() {
  const [telaAtual, setTelaAtual] = useState("boasVindas");
  const [postSelecionado, setPostSelecionado] = useState(null);
  const [dadosPerfil, setDadosPerfil] = useState(null);

  // Roteador local incremental e canônico para todas as telas integradas
  const lidarNavegacaoApp = (id, post) => {
    const destino = (id || "").toLowerCase();
    switch (destino) {
      case "feed":
      case "inicio":
        setTelaAtual("feed");
        break;
      case "pesquisa":
        setTelaAtual("pesquisa");
        break;
      case "criar":
      case "criarpost":
        setTelaAtual("criarPost");
        break;
      case "detalhes":
      case "detalhepost":
        setPostSelecionado(post || null);
        setTelaAtual("detalhes");
        break;
      case "comentarios":
      case "comentario":
        setTelaAtual("comentarios");
        break;
      case "notificacao":
      case "notificacoes":
        setTelaAtual("notificacao");
        break;
      case "perfil":
        setTelaAtual("perfil");
        break;
      case "editarperfil":
      case "editar":
        setTelaAtual("editarPerfil");
        break;
      case "login":
      case "sair":
        setTelaAtual("login");
        break;
      case "cadastro":
        setTelaAtual("cadastro");
        break;
      case "boasvindas":
        setTelaAtual("boasVindas");
        break;
      default:
        break;
    }
  };

  if (telaAtual === "feed") {
    return (
      <Feed
        telaAtiva="feed"
        aoMudarTela={lidarNavegacaoApp}
        aoAbrirPost={(post) => lidarNavegacaoApp("detalhes", post)}
      />
    );
  }

  if (telaAtual === "pesquisa") {
    return <Pesquisa telaAtiva="pesquisa" aoMudarTela={lidarNavegacaoApp} />;
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
        onVerComentarios={() => setTelaAtual("comentarios")}
      />
    );
  }

  if (telaAtual === "comentarios") {
    return (
      <Comentario
        post={postSelecionado}
        onVoltar={() => setTelaAtual("detalhes")}
        onBack={() => setTelaAtual("detalhes")}
      />
    );
  }

  if (telaAtual === "notificacao") {
    return (
      <NotificacoesScreen
        telaAtiva="notificacao"
        aoMudarTela={lidarNavegacaoApp}
        aoNavegarAba={lidarNavegacaoApp}
      />
    );
  }

  if (telaAtual === "perfil") {
    return (
      <ProfileScreen
        telaAtiva="perfil"
        dadosPerfil={dadosPerfil}
        aoMudarTela={lidarNavegacaoApp}
        onEditar={() => setTelaAtual("editarPerfil")}
        onVoltar={() => setTelaAtual("feed")}
      />
    );
  }

  if (telaAtual === "editarPerfil") {
    return (
      <EditarPerfil
        perfil={dadosPerfil}
        onVoltar={() => setTelaAtual("perfil")}
        onSalvar={(novosDados) => {
          if (novosDados) setDadosPerfil(novosDados);
          setTelaAtual("perfil");
        }}
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