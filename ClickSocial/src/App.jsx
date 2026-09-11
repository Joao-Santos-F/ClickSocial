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

  // Roteador local incremental para autenticação, feed, pesquisa, criar post, detalhes, perfil, comentários e notificações
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
    } else if (destino === "comentarios" || destino === "comentario") {
      setTelaAtual("comentarios");
    } else if (destino === "notificacao" || destino === "notificacoes") {
      setTelaAtual("notificacao");
    } else if (destino === "perfil") {
      setTelaAtual("perfil");
    } else if (destino === "editarperfil" || destino === "editar") {
      setTelaAtual("editarPerfil");
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