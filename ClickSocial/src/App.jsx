import React, { useState, useEffect, useCallback } from "react";
import { View, BackHandler } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
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

const ehAbaPrincipalNome = (nome) =>
  ["feed", "pesquisa", "criarpost", "notificacao", "perfil"].includes(
    (nome || "").toLowerCase()
  );

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
    excluirPost,
  } = useApi();

  const [telaAtual, setTelaAtual] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const usuarioSalvo = window.localStorage.getItem(
          "clicksocial_usuario_logado"
        );
        if (usuarioSalvo && JSON.parse(usuarioSalvo)) return "feed";
      }
    } catch (e) {}
    return "boasVindas";
  });

  // Pilha de navegação para garantir histórico confiável
  const [historicoTelas, setHistoricoTelas] = useState(["feed"]);
  const [postSelecionado, setPostSelecionado] = useState(null);

  const lidarVoltarTela = useCallback(() => {
    setHistoricoTelas((prev) => {
      const novaPilha = [...prev];
      let destino = novaPilha.pop();

      while (
        destino &&
        destino.toLowerCase() === telaAtual.toLowerCase() &&
        novaPilha.length > 0
      ) {
        destino = novaPilha.pop();
      }

      if (!destino || destino.toLowerCase() === telaAtual.toLowerCase()) {
        destino = "feed";
      }

      setTelaAtual(destino);
      return novaPilha.length > 0 ? novaPilha : ["feed"];
    });
  }, [telaAtual]);

  // Botão físico de voltar Android
  useEffect(() => {
    const onBackPress = () => {
      const telasRaiz = ["feed", "login", "boasvindas"];
      if (!telasRaiz.includes(telaAtual.toLowerCase())) {
        lidarVoltarTela();
        return true;
      }
      return false;
    };
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  }, [telaAtual, lidarVoltarTela]);

  // Botão voltar do navegador Web
  useEffect(() => {
    if (typeof window !== "undefined" && window.addEventListener) {
      const handlePopState = () => {
        const telasRaiz = ["feed", "login", "boasvindas"];
        if (!telasRaiz.includes(telaAtual.toLowerCase())) {
          lidarVoltarTela();
        }
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [telaAtual, lidarVoltarTela]);

  const lidarNavegacaoApp = (destinoId, post, origem) => {
    const destino = (destinoId || "").toLowerCase();

    if (destino === "sair") {
      fazerLogout();
      setHistoricoTelas(["login"]);
      setTelaAtual("login");
      return;
    }

    const telaOrigem = origem || telaAtual;

    if (destino === "detalhes" || destino === "detalhepost") {
      setHistoricoTelas((prev) => [
        ...prev.filter((t) => t.toLowerCase() !== "detalhes"),
        telaOrigem,
      ]);
      const postAlvo =
        post ||
        posts.find((p) => p.id === postSelecionado?.id) ||
        posts[0];
      setPostSelecionado(postAlvo);
      setTelaAtual("detalhes");
      return;
    }

    if (destino === "comentarios" || destino === "comentario") {
      setHistoricoTelas((prev) => [
        ...prev.filter((t) => t.toLowerCase() !== "comentarios"),
        telaOrigem,
      ]);
      if (post) setPostSelecionado(post);
      setTelaAtual("comentarios");
      return;
    }

    if (destino === "editarperfil" || destino === "editar") {
      setHistoricoTelas((prev) => [
        ...prev.filter((t) => t.toLowerCase() !== "editarperfil"),
        telaOrigem,
      ]);
      setTelaAtual("editarPerfil");
      return;
    }

    if (destino === "criar" || destino === "criarpost") {
      setHistoricoTelas((prev) => [
        ...prev.filter((t) => t.toLowerCase() !== "criarpost"),
        telaOrigem,
      ]);
      setTelaAtual("criarPost");
      return;
    }

    const mapaDestinos = {
      feed: "feed",
      inicio: "feed",
      pesquisa: "pesquisa",
      notificacao: "notificacao",
      notificacoes: "notificacao",
      perfil: "perfil",
      login: "login",
      cadastro: "cadastro",
      boasvindas: "boasVindas",
    };

    const telaDestino = mapaDestinos[destino];
    if (telaDestino) {
      if (ehAbaPrincipalNome(telaDestino)) {
        setHistoricoTelas(["feed"]);
      } else {
        setHistoricoTelas((prev) => [...prev, telaAtual]);
      }
      setTelaAtual(telaDestino);
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

  const handleExcluirPost = (postId) => {
    if (excluirPost) excluirPost(postId);
    lidarVoltarTela();
  };

  const telaAtualLower = telaAtual.toLowerCase();

  return (
    // View neutra — sem SafeAreaView aqui para evitar duplicação de insets no iOS.
    // Cada tela gerencia seu próprio SafeAreaView com edges corretos.
    <View style={{ flex: 1, backgroundColor: "#181122" }}>

      {/* ======= ABAS PRINCIPAIS (renderização condicional — sem display:none) ======= */}

      {telaAtualLower === "feed" && (
        <Feed
          telaAtiva="feed"
          aoMudarTela={lidarNavegacaoApp}
          aoAbrirPost={(post) => lidarNavegacaoApp("detalhes", post, "feed")}
          postsLista={posts}
          aoCurtirPost={handleCurtir}
          aoRepublicarPost={handleRepublicar}
        />
      )}

      {telaAtualLower === "pesquisa" && (
        <Pesquisa
          telaAtiva="pesquisa"
          aoMudarTela={lidarNavegacaoApp}
          posts={posts}
        />
      )}

      {telaAtualLower === "criarpost" && (
        <CriarPost
          dadosPerfil={dadosPerfil}
          onVoltar={lidarVoltarTela}
          onPublicarSucesso={(novoPost) => {
            if (novoPost) adicionarNovoPost(novoPost);
            setTelaAtual("feed");
          }}
        />
      )}

      {telaAtualLower === "notificacao" && (
        <NotificacoesScreen
          telaAtiva="notificacao"
          aoMudarTela={lidarNavegacaoApp}
          aoNavegarAba={lidarNavegacaoApp}
          posts={posts}
          notificacoes={notificacoes}
        />
      )}

      {telaAtualLower === "perfil" && (
        <ProfileScreen
          telaAtiva="perfil"
          dadosPerfil={dadosPerfil}
          aoMudarTela={lidarNavegacaoApp}
          onEditar={() => lidarNavegacaoApp("editarPerfil", null, "perfil")}
          onVoltar={() => setTelaAtual("feed")}
          postsCompartilhados={posts}
        />
      )}

      {/* ======= TELAS MODAIS / PILHA ======= */}

      {telaAtual === "detalhes" && (
        <DetalhesPost
          post={postSelecionado}
          onVoltar={lidarVoltarTela}
          onVerComentarios={() =>
            lidarNavegacaoApp("comentarios", postSelecionado, "detalhes")
          }
          aoCurtirPost={() => handleCurtir(postSelecionado?.id)}
          onExcluir={handleExcluirPost}
          aoAdicionarComentario={async (texto, parentCommentId) => {
            if (postSelecionado?.id) {
              const atualizado = await adicionarComentario(
                postSelecionado.id,
                texto,
                parentCommentId
              );
              if (atualizado) setPostSelecionado(atualizado);
              return atualizado;
            }
          }}
        />
      )}

      {telaAtual === "comentarios" && (
        <Comentario
          post={postSelecionado}
          onVoltar={lidarVoltarTela}
          onBack={lidarVoltarTela}
          aoAdicionarComentario={async (texto, parentCommentId) => {
            if (postSelecionado?.id) {
              const atualizado = await adicionarComentario(
                postSelecionado.id,
                texto,
                parentCommentId
              );
              if (atualizado) setPostSelecionado(atualizado);
              return atualizado;
            }
          }}
          aoCurtirComentario={async (commentId) => {
            if (postSelecionado?.id) {
              const atualizado = await alternarCurtidaComentarioGlobal(
                postSelecionado.id,
                commentId
              );
              if (atualizado) setPostSelecionado(atualizado);
              return atualizado;
            }
          }}
        />
      )}

      {telaAtual === "editarPerfil" && (
        <EditarPerfil
          perfil={dadosPerfil}
          onVoltar={lidarVoltarTela}
          onSalvar={(novosDados) => {
            if (novosDados) atualizarPerfil(novosDados);
            lidarVoltarTela();
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
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ApiProvider>
        <AppContent />
      </ApiProvider>
    </SafeAreaProvider>
  );
}