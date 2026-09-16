import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { ApiProvider, useApi } from "./context/ApiContext";
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

function AppContent() {
  const {
    usuarioLogado,
    fazerLogout,
    posts,
    notificacoes,
    dadosPerfil,
    adicionarNovoPost,
    alternarCurtidaGlobal,
    alternarRepublicadoGlobal,
    adicionarComentario,
    alternarCurtidaComentarioGlobal,
    atualizarPerfil,
  } = useApi();

  const [telaAtual, setTelaAtual] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const usuarioSalvo = window.localStorage.getItem("clicksocial_usuario_logado");
        if (usuarioSalvo && JSON.parse(usuarioSalvo)) return "feed";
      }
    } catch (e) {}
    return "boasVindas";
  });

  const [telaAnterior, setTelaAnterior] = useState("feed");
  const [postSelecionado, setPostSelecionado] = useState(null);

  // Navegador central com memória de origem
  const lidarNavegacaoApp = (destinoId, post, origem) => {
    const destino = (destinoId || "").toLowerCase();

    if (destino === "sair") {
      fazerLogout();
      setTelaAtual("login");
      return;
    }

    if (destino === "detalhes" || destino === "detalhepost") {
      setTelaAnterior(origem || telaAtual);
      setPostSelecionado(post || posts[0]);
      setTelaAtual("detalhes");
      return;
    }
    if (destino === "comentarios" || destino === "comentario") {
      setTelaAnterior(origem || telaAtual);
      if (post) setPostSelecionado(post);
      setTelaAtual("comentarios");
      return;
    }

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

  const handleCurtir = (postId) => {
    alternarCurtidaGlobal(postId, (postAtualizado) => {
      if (postSelecionado?.id === postId) {
        setPostSelecionado(postAtualizado);
      }
    });
  };

  const handleRepublicar = (postId) => {
    alternarRepublicadoGlobal(postId, (postAtualizado) => {
      if (postSelecionado?.id === postId) {
        setPostSelecionado(postAtualizado);
      }
    });
  };

  const ehAbaPrincipal = ["feed", "pesquisa", "criarpost", "notificacao", "perfil"].includes(telaAtual.toLowerCase());

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181122" }}>
      {/* Telas Principais das Abas (Mantidas Vivas em Memória) */}
      <View style={{ flex: 1, display: ehAbaPrincipal ? "flex" : "none" }}>
        <View style={{ flex: 1, display: telaAtual.toLowerCase() === "feed" ? "flex" : "none" }}>
          <Feed
            telaAtiva="feed"
            aoMudarTela={lidarNavegacaoApp}
            aoAbrirPost={(post) => lidarNavegacaoApp("detalhes", post, "feed")}
            postsLista={posts}
            aoCurtirPost={handleCurtir}
            aoRepublicarPost={handleRepublicar}
          />
        </View>

        <View style={{ flex: 1, display: telaAtual.toLowerCase() === "pesquisa" ? "flex" : "none" }}>
          <Pesquisa
            telaAtiva="pesquisa"
            aoMudarTela={lidarNavegacaoApp}
            posts={posts}
          />
        </View>

        <View style={{ flex: 1, display: telaAtual.toLowerCase() === "criarpost" ? "flex" : "none" }}>
          <CriarPost
            dadosPerfil={dadosPerfil}
            onVoltar={() => setTelaAtual("feed")}
            onPublicarSucesso={(novoPost) => {
              if (novoPost) {
                adicionarNovoPost(novoPost);
              }
              setTelaAtual("feed");
            }}
          />
        </View>

        <View style={{ flex: 1, display: telaAtual.toLowerCase() === "notificacao" ? "flex" : "none" }}>
          <NotificacoesScreen
            telaAtiva="notificacao"
            aoMudarTela={lidarNavegacaoApp}
            aoNavegarAba={lidarNavegacaoApp}
            posts={posts}
            notificacoes={notificacoes}
          />
        </View>

        <View style={{ flex: 1, display: telaAtual.toLowerCase() === "perfil" ? "flex" : "none" }}>
          <ProfileScreen
            telaAtiva="perfil"
            dadosPerfil={dadosPerfil}
            aoMudarTela={lidarNavegacaoApp}
            onEditar={() => setTelaAtual("editarPerfil")}
            onVoltar={() => setTelaAtual("feed")}
            postsCompartilhados={posts}
          />
        </View>
      </View>

      {/* Telas Modais / Pilha de Navegação */}
      {telaAtual === "detalhes" && (
        <DetalhesPost
          post={postSelecionado}
          onVoltar={() => setTelaAtual(telaAnterior || "feed")}
          onVerComentarios={() => setTelaAtual("comentarios")}
          aoCurtirPost={() => handleCurtir(postSelecionado?.id)}
        />
      )}

      {telaAtual === "comentarios" && (
        <Comentario
          post={postSelecionado}
          onVoltar={() => setTelaAtual(telaAnterior || "detalhes")}
          onBack={() => setTelaAtual(telaAnterior || "detalhes")}
          aoAdicionarComentario={async (texto, parentCommentId) => {
            if (postSelecionado?.id) {
              const atualizado = await adicionarComentario(postSelecionado.id, texto, parentCommentId);
              if (atualizado) {
                setPostSelecionado(atualizado);
              }
            }
          }}
          aoCurtirComentario={(commentId) => {
            if (postSelecionado?.id) {
              alternarCurtidaComentarioGlobal(postSelecionado.id, commentId).then((atualizado) => {
                if (atualizado) {
                  setPostSelecionado(atualizado);
                }
              });
            }
          }}
        />
      )}

      {telaAtual === "editarPerfil" && (
        <EditarPerfil
          perfil={dadosPerfil}
          onVoltar={() => setTelaAtual("perfil")}
          onSalvar={(novosDados) => {
            if (novosDados) atualizarPerfil(novosDados);
            setTelaAtual("perfil");
          }}
        />
      )}

      {telaAtual === "login" && (
        <LoginScreen
          aoNavegarCadastro={() => setTelaAtual("cadastro")}
          aoNavegarBoasVindas={() => setTelaAtual("boasVindas")}
          aoFazerLogin={() => setTelaAtual("feed")}
        />
      )}

      {telaAtual === "cadastro" && (
        <CadastroScreen
          aoNavegarLogin={() => setTelaAtual("login")}
          aoNavegarBoasVindas={() => setTelaAtual("boasVindas")}
        />
      )}

      {telaAtual === "boasVindas" && (
        <BoasVindasScreen
          aoNavegarLogin={() => setTelaAtual("login")}
          aoNavegarCadastro={() => setTelaAtual("cadastro")}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ApiProvider>
      <AppContent />
    </ApiProvider>
  );
}