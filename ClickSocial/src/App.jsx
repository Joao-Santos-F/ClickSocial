import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, Platform } from "react-native";
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

const POSTS_INICIAIS = [
  {
    id: "1",
    user: "Arthurbr-YT",
    time: "Há 2 horas",
    text: "Acabei de publicar um novo conteúdo no canal! Vamos juntos explorar novas ideias e aprender coisas novas.",
    accent: "#5ef9d6",
    avatar: require("../assets/Gemini_Generated_Image_1rfyg1rfyg1rfyg1.png"),
    image: require("../assets/12 Sem Título_20260828133808.jpg"),
    curtidas: 124,
    curtido: true,
    comentariosCount: 120,
    republicado: true,
    tags: ["Canal", "ClickSocial", "Tech"],
    comentarios: [
      { id: "c1", autor: "Lucas M.", texto: "Sensacional demais!", curtidas: 5, curtido: false },
      { id: "c2", autor: "Beatriz R.", texto: "Parabéns, ficou incrível!", curtidas: 12, curtido: true },
    ],
  },
  {
    id: "2",
    user: "Outro Cara",
    time: "Ontem",
    text: "Só eu que acho que o @Arthurbr-YT é uma mona chata? Tipo é, tipo an, tipo nada havê",
    accent: "#74f7c7",
    avatar: require("../assets/Gemini_Generated_Image_1rfyg1rfyg1rfyg1.png"),
    image: require("../assets/1212.jpg"),
    curtidas: 89,
    curtido: true,
    comentariosCount: 45,
    republicado: false,
    tags: ["Opinião", "ClickSocial"],
    comentarios: [
      { id: "c3", autor: "Eduardo Torolho", texto: "Nada a ver man", curtidas: 2, curtido: false },
    ],
  },
  {
    id: "3",
    user: "Eduardo Torolho",
    time: "Ontem",
    text: "É o goat não tem jeito 🔥🔥",
    accent: "#74f7c7",
    avatar: require("../assets/top amigo 2.png"),
    image: null,
    curtidas: 452,
    curtido: false,
    comentariosCount: 12,
    republicado: true,
    tags: ["Goat", "Fogo", "EstradaCataPreta"],
    comentarios: [
      { id: "c4", autor: "Arthurbr-YT", texto: "Valeu demais!", curtidas: 18, curtido: true },
    ],
  },
];

const NOTIFICACOES_INICIAIS = [
  {
    id: "n1",
    tipo: "curtida",
    usuario: "Arthurbr-YT",
    texto: "Curtiu sua publicação",
    horario: "Há 10 min",
    postId: "1",
  },
  {
    id: "n2",
    tipo: "comentario",
    usuario: "Beatriz R.",
    texto: "Comentou: 'Parabéns, ficou incrível!'",
    horario: "Há 25 min",
    postId: "1",
  },
  {
    id: "n3",
    tipo: "repost",
    usuario: "Eduardo Torolho",
    texto: "Republicou a sua publicação",
    horario: "Há 1 hora",
    postId: "3",
  },
  {
    id: "n4",
    tipo: "seguir",
    usuario: "Cauhê S.",
    texto: "Começou a te seguir",
    horario: "Ontem",
    postId: null,
  },
];

export default function App() {
  const [telaAtual, setTelaAtual] = useState("boasVindas");
  const [telaAnterior, setTelaAnterior] = useState("feed");
  const [postSelecionado, setPostSelecionado] = useState(null);
  const [dadosPerfil, setDadosPerfil] = useState({
    nome: "Arthur Batista",
    usuario: "Arthurbr-YT",
    bio: "Criador de conteúdo e explorador de ideias.",
    imagemPerfil: require("../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
  });
  const [posts, setPosts] = useState(POSTS_INICIAIS);
  const [notificacoes, setNotificacoes] = useState(NOTIFICACOES_INICIAIS);

  // Adicionar notificação dinâmica
  const adicionarNotificacao = ({ tipo, usuario = "Você", texto, postId = null }) => {
    const novaNotif = {
      id: String(Date.now() + Math.random()),
      tipo,
      usuario,
      texto,
      horario: "Agora",
      postId,
    };
    setNotificacoes((prev) => [novaNotif, ...prev]);
  };

  // Navegador central com memória de origem
  const lidarNavegacaoApp = (destinoId, post, origem) => {
    const destino = (destinoId || "").toLowerCase();
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

  // Alternar Curtida no Estado Global
  const alternarCurtidaGlobal = (postId) => {
    setPosts((postsAnteriores) =>
      postsAnteriores.map((p) => {
        if (p.id === postId) {
          const novoCurtido = !p.curtido;
          const novoPost = {
            ...p,
            curtido: novoCurtido,
            curtidas: novoCurtido ? (p.curtidas || 0) + 1 : Math.max(0, (p.curtidas || 0) - 1),
          };
          if (postSelecionado?.id === postId) {
            setPostSelecionado(novoPost);
          }
          if (novoCurtido) {
            adicionarNotificacao({
              tipo: "curtida",
              usuario: "Você",
              texto: `Curtiu a publicação de ${p.user || "um usuário"}`,
              postId: p.id,
            });
          }
          return novoPost;
        }
        return p;
      })
    );
  };

  // Alternar Republicado no Estado Global
  const alternarRepublicadoGlobal = (postId) => {
    setPosts((postsAnteriores) =>
      postsAnteriores.map((p) => {
        if (p.id === postId) {
          const novoRepublicado = !p.republicado;
          const novoPost = {
            ...p,
            republicado: novoRepublicado,
            repostsCount: novoRepublicado ? (p.repostsCount || 0) + 1 : Math.max(0, (p.repostsCount || 0) - 1),
          };
          if (postSelecionado?.id === postId) {
            setPostSelecionado(novoPost);
          }
          if (novoRepublicado) {
            adicionarNotificacao({
              tipo: "repost",
              usuario: "Você",
              texto: `Republicou a publicação de ${p.user || "um usuário"}`,
              postId: p.id,
            });
          }
          return novoPost;
        }
        return p;
      })
    );
  };

  // Adicionar novo post
  const adicionarNovoPost = (novoPost) => {
    setPosts([novoPost, ...posts]);
    adicionarNotificacao({
      tipo: "post",
      usuario: "Você",
      texto: "Criou uma nova publicação no feed",
      postId: novoPost.id,
    });
    setTelaAtual("feed");
  };

  // Alternar Curtida de Comentário no Estado Global
  const alternarCurtidaComentarioGlobal = (commentId) => {
    if (!postSelecionado) return;
    setPosts((postsAnteriores) =>
      postsAnteriores.map((p) => {
        if (p.id === postSelecionado.id) {
          const comentariosAtualizados = (p.comentarios || []).map((c) => {
            if (c.id === commentId) {
              const novoCurtido = !c.curtido;
              return {
                ...c,
                curtido: novoCurtido,
                curtidas: novoCurtido ? (c.curtidas || 0) + 1 : Math.max(0, (c.curtidas || 0) - 1),
              };
            }
            return c;
          });
          const novoPost = { ...p, comentarios: comentariosAtualizados };
          setPostSelecionado(novoPost);
          return novoPost;
        }
        return p;
      })
    );
  };

  // Adicionar Comentário no Estado Global
  const adicionarComentarioGlobal = (textoComentario) => {
    if (!postSelecionado || !textoComentario.trim()) return;
    setPosts((postsAnteriores) =>
      postsAnteriores.map((p) => {
        if (p.id === postSelecionado.id) {
          const novoComentarioObj = {
            id: String(Date.now()),
            autor: dadosPerfil.nome || "Você",
            nome: dadosPerfil.nome || "Você",
            handle: dadosPerfil.usuario || "meu_usuario",
            tempo: "Agora",
            texto: textoComentario.trim(),
            curtidas: 0,
            curtido: false,
            respostas: 0,
            avatar: dadosPerfil.imagemPerfil || require("../assets/Gemini_Generated_Image_1rfyg1rfyg1rfyg1.png"),
          };
          const comentariosAtualizados = [...(p.comentarios || []), novoComentarioObj];
          const novoPost = {
            ...p,
            comentarios: comentariosAtualizados,
            comentariosCount: (p.comentariosCount || 0) + 1,
          };
          setPostSelecionado(novoPost);
          adicionarNotificacao({
            tipo: "comentario",
            usuario: "Você",
            texto: `Comentou: "${textoComentario.trim()}"`,
            postId: p.id,
          });
          return novoPost;
        }
        return p;
      })
    );
  };

  const ehAbaPrincipal = ["feed", "pesquisa", "criarpost", "notificacao", "perfil"].includes(telaAtual.toLowerCase());

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181122" }}>
      {/* Telas Principais das Abas (Mantidas Vivas em Memória para Não Recarregar ao Trocar de Aba) */}
      <View style={{ flex: 1, display: ehAbaPrincipal ? "flex" : "none" }}>
        <View style={{ flex: 1, display: telaAtual.toLowerCase() === "feed" ? "flex" : "none" }}>
          <Feed
            telaAtiva="feed"
            aoMudarTela={lidarNavegacaoApp}
            aoAbrirPost={(post) => lidarNavegacaoApp("detalhes", post, "feed")}
            postsLista={posts}
            setPostsLista={setPosts}
            aoCurtirPost={alternarCurtidaGlobal}
            aoRepublicarPost={alternarRepublicadoGlobal}
          />
        </View>

        <View style={{ flex: 1, display: telaAtual.toLowerCase() === "pesquisa" ? "flex" : "none" }}>
          <Pesquisa
            telaAtiva="pesquisa"
            aoMudarTela={lidarNavegacaoApp}
            posts={posts}
            setPosts={setPosts}
          />
        </View>

        <View style={{ flex: 1, display: telaAtual.toLowerCase() === "criarpost" ? "flex" : "none" }}>
          <CriarPost
            dadosPerfil={dadosPerfil}
            onVoltar={() => setTelaAtual("feed")}
            onPublicarSucesso={(novoPost) => {
              if (novoPost) {
                adicionarNovoPost(novoPost);
              } else {
                setTelaAtual("feed");
              }
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
            setPostsCompartilhados={setPosts}
          />
        </View>
      </View>

      {/* Telas Modais / Pilha de Navegação */}
      {telaAtual === "detalhes" && (
        <DetalhesPost
          post={postSelecionado}
          onVoltar={() => setTelaAtual(telaAnterior || "feed")}
          onVerComentarios={() => setTelaAtual("comentarios")}
          aoCurtirPost={() => alternarCurtidaGlobal(postSelecionado?.id)}
        />
      )}

      {telaAtual === "comentarios" && (
        <Comentario
          post={postSelecionado}
          onVoltar={() => setTelaAtual(telaAnterior || "detalhes")}
          onBack={() => setTelaAtual(telaAnterior || "detalhes")}
          aoCurtirComentario={alternarCurtidaComentarioGlobal}
          aoAdicionarComentario={adicionarComentarioGlobal}
        />
      )}

      {telaAtual === "editarPerfil" && (
        <EditarPerfil
          perfil={dadosPerfil}
          onVoltar={() => setTelaAtual("perfil")}
          onSalvar={(novosDados) => {
            if (novosDados) setDadosPerfil(novosDados);
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