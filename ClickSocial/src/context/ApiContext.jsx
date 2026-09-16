import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Platform } from "react-native";

// URL Base flexível conforme o ambiente (Web, Android ou iOS)
const getApiBaseUrl = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000";
  }
  return "http://localhost:3000";
};

const API_BASE_URL = getApiBaseUrl();

const USUARIOS_INICIAIS = [
  {
    id: "u1",
    nome: "Arthur Batista",
    usuario: "Arthurbr-YT",
    email: "arthur@clicksocial.com",
    senha: "123",
    bio: "Criador de conteúdo e explorador de ideias.",
    verificado: true,
    seguidores: "26,2K",
    seguindo: 17,
    imagemPerfil: require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
  },
  {
    id: "u2",
    nome: "Eduardo Torolho",
    usuario: "Eduardo Torolho",
    email: "eduardo@clicksocial.com",
    senha: "123",
    bio: "É o goat não tem jeito 🔥🔥",
    verificado: false,
    seguidores: 120,
    seguindo: 45,
    imagemPerfil: require("../../assets/top amigo 2.png"),
  },
];

const DADOS_INICIAIS = {
  posts: [
    {
      id: "1",
      createdAt: 1789500000000,
      user: "Arthurbr-YT",
      time: "Há 2 horas",
      text: "Acabei de publicar um novo conteúdo no canal! Vamos juntos explorar novas ideias e aprender coisas novas.",
      accent: "#5ef9d6",
      avatar: require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
      image: require("../../assets/12 Sem Título_20260828133808.jpg"),
      curtidas: 124,
      curtidores: ["Arthurbr-YT"],
      curtido: true,
      comentariosCount: 120,
      republicado: true,
      republicadores: ["Arthurbr-YT"],
      tags: ["Canal", "ClickSocial", "Tech"],
      comentarios: [
        { id: "c1", autor: "Lucas M.", texto: "Sensacional demais!", curtidas: 5, curtido: false, respostas: 0 },
        { id: "c2", autor: "Beatriz R.", texto: "Parabéns, ficou incrível!", curtidas: 12, curtido: true, respostas: 0 },
      ],
    },
    {
      id: "2",
      createdAt: 1789400000000,
      user: "Outro Cara",
      time: "Ontem",
      text: "Só eu que acho que o @Arthurbr-YT é uma mona chata? Tipo é, tipo an, tipo nada havê",
      accent: "#74f7c7",
      avatar: require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
      image: require("../../assets/1212.jpg"),
      curtidas: 89,
      curtidores: ["Outro Cara"],
      curtido: true,
      comentariosCount: 45,
      republicado: false,
      republicadores: [],
      tags: ["Opinião", "ClickSocial"],
      comentarios: [
        { id: "c3", autor: "Eduardo Torolho", texto: "Nada a ver man", curtidas: 2, curtido: false, respostas: 0 },
      ],
    },
    {
      id: "3",
      createdAt: 1789300000000,
      user: "Eduardo Torolho",
      time: "Ontem",
      text: "É o goat não tem jeito 🔥🔥",
      accent: "#74f7c7",
      avatar: require("../../assets/top amigo 2.png"),
      image: null,
      curtidas: 452,
      curtidores: ["Eduardo Torolho"],
      curtido: false,
      comentariosCount: 12,
      republicado: true,
      republicadores: ["Eduardo Torolho"],
      tags: ["Goat", "Fogo", "EstradaCataPreta"],
      comentarios: [
        { id: "c4", autor: "Arthurbr-YT", texto: "Valeu demais!", curtidas: 18, curtido: true, respostas: 0 },
      ],
    },
  ],
  notificacoes: [],
  perfil: {
    nome: "Arthur Batista",
    usuario: "Arthurbr-YT",
    bio: "Criador de conteúdo e explorador de ideias.",
    verificado: true,
    seguidores: "26,2K",
    seguindo: 17,
    imagemPerfil: require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
  },
};

// Auxiliar de ordenação cronológica inversa (mais novos no topo)
const ordenarPostsPorData = (listaPosts) => {
  return [...listaPosts].sort((a, b) => {
    const timestampA = Number(a.createdAt) || (Number(a.id) > 1000000 ? Number(a.id) : 0);
    const timestampB = Number(b.createdAt) || (Number(b.id) > 1000000 ? Number(b.id) : 0);
    return timestampB - timestampA;
  });
};

const ApiContext = createContext();

// Auxiliar de conversao de blobs temporarios do navegador para Data URL Base64 permanente
export const resolverUriPermanente = async (input) => {
  if (!input) return null;
  const uri = typeof input === "string" ? input : input?.uri;
  if (!uri) return null;

  if (uri.startsWith("data:image")) return uri;

  if (typeof input === "object" && input.base64) {
    return `data:image/jpeg;base64,${input.base64}`;
  }

  if (uri.startsWith("blob:")) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === "string" && reader.result.startsWith("data:image")) {
            resolve(reader.result);
          } else {
            resolve(uri);
          }
        };
        reader.onerror = () => resolve(uri);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      return uri;
    }
  }

  return uri;
};

export const ApiProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIAIS);

  // Recupera sessão persistida do usuário logado se o Metro recarregar a página
  const [usuarioLogado, setUsuarioLogadoState] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const salvo = window.localStorage.getItem("clicksocial_usuario_logado");
        if (salvo) return JSON.parse(salvo);
      }
    } catch (e) {}
    return USUARIOS_INICIAIS[0];
  });

  const setUsuarioLogado = (user) => {
    setUsuarioLogadoState(user);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        if (user) {
          window.localStorage.setItem("clicksocial_usuario_logado", JSON.stringify(user));
        } else {
          window.localStorage.removeItem("clicksocial_usuario_logado");
        }
      }
    } catch (e) {}
  };

  const [dadosPerfil, setDadosPerfilState] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const salvo = window.localStorage.getItem("clicksocial_dados_perfil");
        if (salvo) return JSON.parse(salvo);
      }
    } catch (e) {}
    return DADOS_INICIAIS.perfil;
  });

  const setDadosPerfil = (perfil) => {
    setDadosPerfilState(perfil);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        if (perfil) {
          window.localStorage.setItem("clicksocial_dados_perfil", JSON.stringify(perfil));
        } else {
          window.localStorage.removeItem("clicksocial_dados_perfil");
        }
      }
    } catch (e) {}
  };

  const [posts, setPosts] = useState(ordenarPostsPorData(DADOS_INICIAIS.posts));
  const [notificacoes, setNotificacoes] = useState(DADOS_INICIAIS.notificacoes);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  // Mapeador auxiliar para tratar imagens e estados dinâmicos por usuário do json-server
  const processarPostServidor = useCallback((p, usuarioAtual = usuarioLogado) => {
    const autorPost = usuarios.find(
      (u) =>
        (u.usuario || "").toLowerCase() === (p.user || "").toLowerCase() ||
        (u.nome || "").toLowerCase() === (p.user || "").toLowerCase()
    );

    let avatarResolved = p.avatar;
    if (autorPost) {
      if (autorPost.fotoUri) avatarResolved = autorPost.fotoUri;
      else if (autorPost.imagemPerfil) avatarResolved = autorPost.imagemPerfil;
    } else if (
      usuarioAtual &&
      ((usuarioAtual.usuario || "").toLowerCase() === (p.user || "").toLowerCase() ||
       (usuarioAtual.nome || "").toLowerCase() === (p.user || "").toLowerCase())
    ) {
      if (usuarioAtual.fotoUri) avatarResolved = usuarioAtual.fotoUri;
      else if (dadosPerfil?.imagemPerfil) avatarResolved = dadosPerfil.imagemPerfil;
    }

    if (typeof avatarResolved === "string") {
      if (avatarResolved.includes("top amigo")) avatarResolved = require("../../assets/top amigo 2.png");
      else if (avatarResolved.includes("WhatsApp Image") || avatarResolved.includes("Gemini")) avatarResolved = require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png");
      else if (avatarResolved.includes("http") || avatarResolved.includes("blob:")) avatarResolved = avatarResolved;
    }

    let imageResolved = p.image;
    if (typeof p.image === "string") {
      if (p.image.includes("12 Sem Título")) imageResolved = require("../../assets/12 Sem Título_20260828133808.jpg");
      else if (p.image.includes("1212")) imageResolved = require("../../assets/1212.jpg");
    }

    const handleUsuarioLogado = usuarioAtual?.usuario || usuarioAtual?.nome || "";
    const curtidores = Array.isArray(p.curtidores) ? p.curtidores : [];
    const republicadores = Array.isArray(p.republicadores) ? p.republicadores : [];
    const listaComentarios = Array.isArray(p.comentarios) ? p.comentarios : [];

    const comentariosTratados = listaComentarios.map((c) => {
      const curtidoresC = Array.isArray(c.curtidores) ? c.curtidores : [];
      return {
        ...c,
        curtidores: curtidoresC,
        curtido: handleUsuarioLogado ? curtidoresC.includes(handleUsuarioLogado) : false,
      };
    });

    return {
      ...p,
      createdAt: p.createdAt || (Number(p.id) > 1000000 ? Number(p.id) : Date.now() - 86400000),
      avatar: avatarResolved || DADOS_INICIAIS.posts[0].avatar,
      image: imageResolved,
      curtidores,
      republicadores,
      curtido: handleUsuarioLogado ? curtidores.includes(handleUsuarioLogado) : false,
      republicado: handleUsuarioLogado ? republicadores.includes(handleUsuarioLogado) : false,
      comentarios: comentariosTratados,
      comentariosCount: comentariosTratados.length,
      repostsCount: republicadores.length,
    };
  }, [usuarios, dadosPerfil, usuarioLogado]);

  const recarregarDados = useCallback(async () => {
    setLoading(true);
    try {
      const [resUsuarios, resPosts, resNotif, resPerfil] = await Promise.all([
        fetch(`${API_BASE_URL}/usuarios`),
        fetch(`${API_BASE_URL}/posts`),
        fetch(`${API_BASE_URL}/notificacoes`),
        fetch(`${API_BASE_URL}/perfil`),
      ]);

      if (resUsuarios.ok && resPosts.ok && resNotif.ok && resPerfil.ok) {
        const usersData = await resUsuarios.json();
        const postsData = await resPosts.json();
        const notifData = await resNotif.json();
        const perfilData = await resPerfil.json();

        if (Array.isArray(usersData) && usersData.length > 0) {
          setUsuarios(usersData);
        }
        
        // Ordena os posts em ordem cronológica decrescente (mais novos no topo)
        const postsProcessados = postsData.map((p) => processarPostServidor(p, usuarioLogado));
        setPosts(ordenarPostsPorData(postsProcessados));

        setNotificacoes(notifData);
        if (perfilData && perfilData.usuario && !usuarioLogado) {
          setDadosPerfil({
            ...perfilData,
            verificado: perfilData.verificado || false,
            seguidores: perfilData.seguidores ?? 0,
            seguindo: perfilData.seguindo ?? 0,
            imagemPerfil: perfilData.fotoUri ? { uri: perfilData.fotoUri } : DADOS_INICIAIS.perfil.imagemPerfil,
          });
        }
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (err) {
      console.log("[ApiContext] Servidor json-server offline, usando estado local.");
      setIsOnline(false);
    } finally {
      setLoading(false);
    }
  }, [processarPostServidor, usuarioLogado]);

  useEffect(() => {
    recarregarDados();
  }, []);

  // Autenticação: Fazer Login
  const fazerLogin = async ({ email, senha }) => {
    const emailFormatado = (email || "").trim().toLowerCase();
    const senhaFormatada = String(senha || "").trim();

    let listaUsuarios = usuarios;

    try {
      const res = await fetch(`${API_BASE_URL}/usuarios`);
      if (res.ok) {
        const dadosServidor = await res.json();
        if (Array.isArray(dadosServidor) && dadosServidor.length > 0) {
          listaUsuarios = dadosServidor;
          setUsuarios(dadosServidor);
          setIsOnline(true);
        }
      }
    } catch (e) {
      console.log("[ApiContext] Servidor json-server offline ao fazer login.");
    }

    const usuarioEncontrado = listaUsuarios.find(
      (u) =>
        (u.email || "").trim().toLowerCase() === emailFormatado &&
        String(u.senha || "").trim() === senhaFormatada
    );

    if (usuarioEncontrado) {
      setUsuarioLogado(usuarioEncontrado);
      setDadosPerfil({
        nome: usuarioEncontrado.nome,
        usuario: usuarioEncontrado.usuario,
        bio: usuarioEncontrado.bio || "Novo membro do ClickSocial!",
        verificado: usuarioEncontrado.verificado || false,
        seguidores: usuarioEncontrado.seguidores ?? 0,
        seguindo: usuarioEncontrado.seguindo ?? 0,
        fotoUri: usuarioEncontrado.fotoUri || null,
        imagemPerfil: usuarioEncontrado.fotoUri
          ? { uri: usuarioEncontrado.fotoUri }
          : (usuarioEncontrado.imagemPerfil || DADOS_INICIAIS.perfil.imagemPerfil),
      });
      setPosts((prevPosts) =>
        prevPosts.map((p) => processarPostServidor(p, usuarioEncontrado))
      );
      return { sucesso: true, usuario: usuarioEncontrado };
    }

    return { sucesso: false, mensagem: "E-mail ou senha incorretos." };
  };

  // Autenticação: Cadastrar Usuário com valores zerados (BUG 6 RESOLVIDO NO BACKEND/REGISTRO)
  const cadastrarUsuario = async ({ nomeCompleto, nomeUsuario, email, senha, fotoUri }) => {
    const emailFormatado = (email || "").trim().toLowerCase();
    const usernameFormatado = (nomeUsuario || "").trim();

    let listaUsuarios = usuarios;
    try {
      const res = await fetch(`${API_BASE_URL}/usuarios`);
      if (res.ok) {
        const dadosServidor = await res.json();
        if (Array.isArray(dadosServidor)) {
          listaUsuarios = dadosServidor;
          setUsuarios(dadosServidor);
        }
      }
    } catch (e) {}

    const existente = listaUsuarios.find(
      (u) =>
        (u.email || "").trim().toLowerCase() === emailFormatado ||
        (u.usuario || "").trim().toLowerCase() === usernameFormatado.toLowerCase()
    );

    if (existente) {
      return { sucesso: false, mensagem: "E-mail ou nome de usuário já cadastrado!" };
    }

    const fotoPermanente = await resolverUriPermanente(fotoUri);

    // Um usuário novo SEMPRE nasce com verificado=false, 0 seguidores, 0 seguindo
    const novoUsuario = {
      id: String(Date.now() + Math.floor(Math.random() * 1000)),
      nome: nomeCompleto,
      usuario: usernameFormatado,
      email: emailFormatado,
      senha: String(senha),
      bio: "Novo membro do ClickSocial!",
      verificado: false,
      seguidores: 0,
      seguindo: 0,
      fotoUri: fotoPermanente,
    };

    setUsuarios((prev) => [...prev, novoUsuario]);
    setUsuarioLogado(novoUsuario);
    setDadosPerfil({
      nome: novoUsuario.nome,
      usuario: novoUsuario.usuario,
      bio: novoUsuario.bio,
      verificado: false,
      seguidores: 0,
      seguindo: 0,
      imagemPerfil: fotoPermanente ? { uri: fotoPermanente } : DADOS_INICIAIS.perfil.imagemPerfil,
    });

    try {
      await fetch(`${API_BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });
      setIsOnline(true);
    } catch (e) {
      console.error("Erro ao salvar novo usuário na API:", e);
    }

    adicionarNotificacao({
      tipo: "boasvindas",
      usuario: novoUsuario.usuario,
      texto: "Bem-vindo ao ClickSocial!",
      postId: null,
    });

    return { sucesso: true, usuario: novoUsuario };
  };

  // Logout isolando e limpando o estado de sessão
  const fazerLogout = () => {
    setUsuarioLogado(null);
    setDadosPerfil(null);
  };

  // Adicionar notificação
  const adicionarNotificacao = async ({ tipo, usuario = "Você", texto, postId = null }) => {
    const novaNotif = {
      id: String(Date.now() + Math.random()),
      tipo,
      usuario,
      texto,
      horario: "Agora",
      postId,
    };

    setNotificacoes((prev) => [novaNotif, ...prev]);

    try {
      await fetch(`${API_BASE_URL}/notificacoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaNotif),
      });
    } catch (e) {
      console.error("Erro ao salvar notificação na API", e);
    }
  };

  // Alternar Curtida por Usuário (Isolado)
  const alternarCurtidaGlobal = async (postId, onPostUpdate) => {
    const usuarioAtual = usuarioLogado?.usuario || usuarioLogado?.nome || "Você";
    let postAtualizado = null;

    setPosts((postsAnteriores) => {
      const novosPosts = postsAnteriores.map((p) => {
        if (p.id === postId) {
          const curtidoresAnteriores = Array.isArray(p.curtidores) ? p.curtidores : [];
          const jaCurtido = curtidoresAnteriores.includes(usuarioAtual);

          const novosCurtidores = jaCurtido
            ? curtidoresAnteriores.filter((u) => u !== usuarioAtual)
            : [...curtidoresAnteriores, usuarioAtual];

          const novasCurtidas = jaCurtido
            ? Math.max(0, (p.curtidas || 0) - 1)
            : (p.curtidas || 0) + 1;

          postAtualizado = {
            ...p,
            curtidas: novasCurtidas,
            curtidores: novosCurtidores,
            curtido: !jaCurtido,
          };

          return postAtualizado;
        }
        return p;
      });
      return ordenarPostsPorData(novosPosts);
    });

    if (postAtualizado) {
      if (onPostUpdate) onPostUpdate(postAtualizado);
      if (postAtualizado.curtido) {
        adicionarNotificacao({
          tipo: "curtida",
          usuario: usuarioAtual,
          texto: `Curtiu a publicação de ${postAtualizado.user || "um usuário"}`,
          postId: postAtualizado.id,
        });
      }

      try {
        await fetch(`${API_BASE_URL}/posts/${postId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            curtidas: postAtualizado.curtidas,
            curtidores: postAtualizado.curtidores,
            curtido: postAtualizado.curtido,
          }),
        });
      } catch (e) {
        console.error("Erro ao atualizar curtida na API", e);
      }
    }
  };

  // Alternar Republicado por Usuário (Sem disparo automático de repost)
  const alternarRepublicadoGlobal = async (postId, onPostUpdate) => {
    const usuarioAtual = usuarioLogado?.usuario || usuarioLogado?.nome || "Você";
    let postAtualizado = null;

    setPosts((postsAnteriores) => {
      const novosPosts = postsAnteriores.map((p) => {
        if (p.id === postId) {
          const republicadoresAnteriores = Array.isArray(p.republicadores) ? p.republicadores : [];
          const jaRepublicado = republicadoresAnteriores.includes(usuarioAtual);

          const novosRepublicadores = jaRepublicado
            ? republicadoresAnteriores.filter((u) => u !== usuarioAtual)
            : [...republicadoresAnteriores, usuarioAtual];

          const novosRepostsCount = jaRepublicado
            ? Math.max(0, (p.repostsCount || 0) - 1)
            : (p.repostsCount || 0) + 1;

          postAtualizado = {
            ...p,
            repostsCount: novosRepostsCount,
            republicadores: novosRepublicadores,
            republicado: !jaRepublicado,
          };

          return postAtualizado;
        }
        return p;
      });
      return ordenarPostsPorData(novosPosts);
    });

    if (postAtualizado) {
      if (onPostUpdate) onPostUpdate(postAtualizado);
      if (postAtualizado.republicado) {
        adicionarNotificacao({
          tipo: "repost",
          usuario: usuarioAtual,
          texto: `Republicou a publicação de ${postAtualizado.user || "um usuário"}`,
          postId: postAtualizado.id,
        });
      }

      try {
        await fetch(`${API_BASE_URL}/posts/${postId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            repostsCount: postAtualizado.repostsCount,
            republicadores: postAtualizado.republicadores,
            republicado: postAtualizado.republicado,
          }),
        });
      } catch (e) {
        console.error("Erro ao atualizar republicação na API", e);
      }
    }
  };

  // Adicionar novo post com createdAt e ordenação cronológica garantida
  const adicionarNovoPost = async (novoPost) => {
    const agoraTimestamp = Date.now();
    const avatarRaw =
      usuarioLogado?.fotoUri ||
      (typeof dadosPerfil?.imagemPerfil === "string" ? dadosPerfil.imagemPerfil : dadosPerfil?.imagemPerfil?.uri) ||
      novoPost.avatar;

    const avatarDoUsuario = (await resolverUriPermanente(avatarRaw)) || "WhatsApp Image 2026-08-25 at 11.25.57 2.png";
    const imagemDoPost = await resolverUriPermanente(novoPost.image);

    const postFormatado = {
      ...novoPost,
      id: novoPost.id || String(agoraTimestamp),
      createdAt: agoraTimestamp,
      user: usuarioLogado?.usuario || usuarioLogado?.nome || novoPost.user || "Arthurbr-YT",
      avatar: avatarDoUsuario,
      image: imagemDoPost,
      curtidas: 0,
      curtidores: [],
      curtido: false,
      comentariosCount: 0,
      comentarios: [],
      repostsCount: 0,
      republicadores: [],
      republicado: false,
      tags: novoPost.tags || ["#ClickSocial"],
    };

    setPosts((prev) => ordenarPostsPorData([postFormatado, ...prev]));

    adicionarNotificacao({
      tipo: "post",
      usuario: usuarioLogado?.usuario || "Você",
      texto: "Criou uma nova publicação no feed",
      postId: postFormatado.id,
    });

    try {
      await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...postFormatado,
          avatar: typeof avatarDoUsuario === "string" ? avatarDoUsuario : (avatarDoUsuario?.uri || "WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
          image: typeof imagemDoPost === "string" ? imagemDoPost : (imagemDoPost?.uri || null),
        }),
      });
    } catch (e) {
      console.error("Erro ao criar post na API", e);
    }
  };

  // Adicionar comentário em um post e retornar o objeto atualizado para tempo real
  const adicionarComentario = async (postId, comentarioTexto, parentCommentId = null) => {
    let postAtualizado = null;
    const autorNome = usuarioLogado?.nome || dadosPerfil.nome || "Você";
    const autorUsuario = usuarioLogado?.usuario || dadosPerfil.usuario || "meu_usuario";
    const autorFoto = usuarioLogado?.fotoUri || (typeof dadosPerfil.imagemPerfil === "string" ? dadosPerfil.imagemPerfil : dadosPerfil.imagemPerfil?.uri) || null;

    const novoComentarioObj = {
      id: String(Date.now()),
      parentCommentId: parentCommentId || null,
      autor: autorUsuario,
      nome: autorNome,
      handle: autorUsuario,
      tempo: "Agora",
      texto: comentarioTexto,
      curtidas: 0,
      curtido: false,
      respostas: 0,
      avatar: autorFoto,
    };

    setPosts((prevPosts) => {
      const atualizados = prevPosts.map((p) => {
        if (p.id === postId) {
          let comentariosNovos = [];
          if (parentCommentId) {
            comentariosNovos = (p.comentarios || []).map((c) => {
              if (c.id === parentCommentId) {
                const listaRespostas = Array.isArray(c.respostasLista) ? c.respostasLista : [];
                return {
                  ...c,
                  respostas: (c.respostas || 0) + 1,
                  respostasLista: [...listaRespostas, novoComentarioObj],
                };
              }
              return c;
            });
          } else {
            comentariosNovos = [...(p.comentarios || []), novoComentarioObj];
          }

          postAtualizado = {
            ...p,
            comentarios: comentariosNovos,
            comentariosCount: comentariosNovos.length,
          };
          return postAtualizado;
        }
        return p;
      });
      return ordenarPostsPorData(atualizados);
    });

    adicionarNotificacao({
      tipo: "comentario",
      usuario: autorUsuario,
      texto: `Comentou: "${comentarioTexto}"`,
      postId,
    });

    if (postAtualizado) {
      try {
        await fetch(`${API_BASE_URL}/posts/${postId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comentarios: postAtualizado.comentarios,
            comentariosCount: postAtualizado.comentariosCount,
          }),
        });
      } catch (e) {
        console.error("Erro ao adicionar comentário na API", e);
      }
    }

    return postAtualizado;
  };

  // Alternar Curtida de um Comentário Específico (BUG 5 RESOLVIDO)
  const alternarCurtidaComentarioGlobal = async (postId, commentId) => {
    let postAtualizado = null;

    setPosts((prevPosts) => {
      const atualizados = prevPosts.map((p) => {
        if (p.id === postId) {
          const comentariosNovos = (p.comentarios || []).map((c) => {
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
          postAtualizado = { ...p, comentarios: comentariosNovos };
          return postAtualizado;
        }
        return p;
      });
      return ordenarPostsPorData(atualizados);
    });

    if (postAtualizado) {
      try {
        await fetch(`${API_BASE_URL}/posts/${postId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comentarios: postAtualizado.comentarios,
          }),
        });
      } catch (e) {
        console.error("Erro ao curtir comentário na API", e);
      }
    }

    return postAtualizado;
  };

  // Atualizar perfil do usuário ativo
  const atualizarPerfil = async (novosDados) => {
    const fotoUriCalculada = novosDados.imagemPerfil?.uri || (typeof novosDados.imagemPerfil === "string" ? novosDados.imagemPerfil : null);
    const perfilAtualizado = {
      ...dadosPerfil,
      ...novosDados,
      imagemPerfil: novosDados.imagemPerfil || dadosPerfil.imagemPerfil,
    };

    setDadosPerfil(perfilAtualizado);

    if (usuarioLogado) {
      const userAtualizado = {
        ...usuarioLogado,
        nome: novosDados.nome || usuarioLogado.nome,
        usuario: novosDados.usuario || usuarioLogado.usuario,
        bio: novosDados.bio || usuarioLogado.bio,
        fotoUri: fotoUriCalculada || usuarioLogado.fotoUri,
      };

      setUsuarioLogado(userAtualizado);
      setUsuarios((prev) => prev.map((u) => (u.id === userAtualizado.id ? userAtualizado : u)));

      try {
        await fetch(`${API_BASE_URL}/usuarios/${userAtualizado.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userAtualizado),
        });
      } catch (e) {}
    }

    try {
      await fetch(`${API_BASE_URL}/perfil`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "1",
          nome: perfilAtualizado.nome,
          usuario: perfilAtualizado.usuario,
          bio: perfilAtualizado.bio,
          imagemPerfil: fotoUriCalculada || "WhatsApp Image 2026-08-25 at 11.25.57 2.png",
          fotoUri: fotoUriCalculada || null,
        }),
      });
    } catch (e) {
      console.error("Erro ao atualizar perfil na API", e);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        usuarios,
        usuarioLogado,
        posts,
        notificacoes,
        dadosPerfil,
        loading,
        isOnline,
        fazerLogin,
        cadastrarUsuario,
        fazerLogout,
        recarregarDados,
        adicionarNovoPost,
        alternarCurtidaGlobal,
        alternarRepublicadoGlobal,
        adicionarComentario,
        alternarCurtidaComentarioGlobal,
        atualizarPerfil,
        adicionarNotificacao,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi deve ser usado dentro de um ApiProvider");
  }
  return context;
};
