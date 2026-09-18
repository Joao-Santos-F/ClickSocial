import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";

// URL Base flexível conforme o ambiente (Web, Android, iOS ou Dispositivo Físico)
const getApiBaseUrl = () => {
  if (Platform.OS === "web") {
    return "http://localhost:3000";
  }

  // Obter IP local da máquina de desenvolvimento dinamicamente via Expo Constants
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest?.debuggerHost ||
    Constants.manifest2?.extra?.expoGo?.developer?.inputs?.[0]?.url;

  if (hostUri) {
    const ip = hostUri.split(":")[0];
    if (ip && ip !== "localhost" && ip !== "127.0.0.1") {
      return `http://${ip}:3000`;
    }
  }

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

// Auxiliar de ordenação cronológica inversa de posts (mais novos no topo)
const ordenarPostsPorData = (listaPosts) => {
  return [...listaPosts].sort((a, b) => {
    const timestampA = Number(a.createdAt) || (Number(a.id) > 1000000 ? Number(a.id) : 0);
    const timestampB = Number(b.createdAt) || (Number(b.id) > 1000000 ? Number(b.id) : 0);
    return timestampB - timestampA;
  });
};

// Extrai timestamp numérico preciso de qualquer notificação, mesmo sem createdAt explícito
export const extrairTimestampNotificacao = (notif, index = 0) => {
  if (!notif) return 0;

  if (notif.createdAt && Number(notif.createdAt) > 0) {
    return Number(notif.createdAt);
  }

  const idNum = Number(notif.id);
  if (!isNaN(idNum) && idNum > 1000000000000) {
    return idNum;
  }

  const horarioStr = String(notif.horario || "").trim().toLowerCase();
  const agora = Date.now();

  if (horarioStr.includes("agora") || horarioStr.includes("segundo")) {
    // Notificações criadas na sessão atual: preserva ordem de inserção dando prioridade máxima
    return agora - 5000 + (Number(index) || 0) * 10;
  }

  const matchMin = horarioStr.match(/(\d+)\s*min/);
  if (matchMin) {
    const mins = parseInt(matchMin[1], 10);
    return agora - mins * 60 * 1000;
  }

  const matchHora = horarioStr.match(/(\d+)\s*hora/);
  if (matchHora) {
    const hrs = parseInt(matchHora[1], 10);
    return agora - hrs * 3600 * 1000;
  }

  if (horarioStr.includes("ontem")) {
    return agora - 86400 * 1000;
  }

  // Formato horário HH:MM (ex: "10:38")
  const matchHoraMin = horarioStr.match(/^(\d{1,2}):(\d{2})$/);
  if (matchHoraMin) {
    const h = parseInt(matchHoraMin[1], 10);
    const m = parseInt(matchHoraMin[2], 10);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.getTime();
  }

  // Notificações fixas pré-definidas
  if (notif.id === "n1" || notif.id === "1") return agora - 10 * 60 * 1000;
  if (notif.id === "n2" || notif.id === "2") return agora - 25 * 60 * 1000;
  if (notif.id === "n3" || notif.id === "3") return agora - 60 * 60 * 1000;
  if (notif.id === "n4" || notif.id === "4") return agora - 75 * 60 * 1000;
  if (notif.id === "n5" || notif.id === "5") return agora - 90 * 60 * 1000;

  return agora - 86400 * 1000 + (Number(index) || 0) * 1000;
};

// Auxiliar para ordenar notificações cronologicamente (mais novas no topo)
export const ordenarNotificacoesPorData = (lista) => {
  if (!Array.isArray(lista)) return [];
  return [...lista]
    .map((item, idx) => ({ ...item, _tempTs: extrairTimestampNotificacao(item, idx) }))
    .sort((a, b) => b._tempTs - a._tempTs)
    .map(({ _tempTs, ...item }) => item);
};

const ApiContext = createContext();

// Redimensiona e otimiza imagens Base64 no navegador para evitar estouro de memória e payload
const otimizarBase64Image = (dataUrl, maxDimension = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    if (
      typeof window === "undefined" ||
      typeof Image === "undefined" ||
      !dataUrl ||
      typeof dataUrl !== "string" ||
      !dataUrl.startsWith("data:image") ||
      dataUrl.length < 250000
    ) {
      return resolve(dataUrl);
    }

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(dataUrl);

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    } catch (e) {
      resolve(dataUrl);
    }
  });
};

// Auxiliar de conversao de URIs (blobs, file://, content://) para Data URL Base64 permanente e universal
export const resolverUriPermanente = async (input) => {
  if (!input) return null;
  const uri = typeof input === "string" ? input : input?.uri;
  if (!uri) return null;

  if (uri.startsWith("data:image")) {
    return await otimizarBase64Image(uri);
  }

  if (typeof input === "object" && input.base64) {
    const rawData = `data:image/jpeg;base64,${input.base64}`;
    return await otimizarBase64Image(rawData);
  }

  // Tratamento para URIs blob (Navegador Web)
  if (uri.startsWith("blob:")) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const rawResult = await new Promise((resolve) => {
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
      return await otimizarBase64Image(rawResult);
    } catch (e) {
      return uri;
    }
  }

  // Tratamento universal para URIs de arquivos (Web / Android / iOS)
  if (uri.startsWith("file://") || uri.startsWith("content://") || uri.startsWith("ph://")) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const rawResult = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => resolve(uri);
        reader.readAsDataURL(blob);
      });
      if (typeof rawResult === "string" && rawResult.startsWith("data:image")) {
        return await otimizarBase64Image(rawResult);
      }
    } catch (err) {}
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
        if (salvo) {
          const parsed = JSON.parse(salvo);
          if (parsed && typeof parsed === "object") {
            let img = parsed.imagemPerfil;
            if (typeof img === "string") {
              if (img.includes("WhatsApp")) img = require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png");
              else if (img.includes("top amigo")) img = require("../../assets/top amigo 2.png");
              else if (img.startsWith("data:") || img.startsWith("http")) img = { uri: img };
            } else if (parsed.fotoUri && (parsed.fotoUri.startsWith("data:") || parsed.fotoUri.startsWith("http"))) {
              img = { uri: parsed.fotoUri };
            }
            return {
              ...parsed,
              imagemPerfil: img || DADOS_INICIAIS.perfil.imagemPerfil,
            };
          }
        }
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
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // Refs estáveis para evitar recriação de callbacks e loops no useEffect
  const usuarioLogadoRef = useRef(usuarioLogado);
  useEffect(() => {
    usuarioLogadoRef.current = usuarioLogado;
  }, [usuarioLogado]);

  const dadosPerfilRef = useRef(dadosPerfil);
  useEffect(() => {
    dadosPerfilRef.current = dadosPerfil;
  }, [dadosPerfil]);

  const postsRef = useRef(posts);
  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

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
      else if (dadosPerfil?.fotoUri) avatarResolved = dadosPerfil.fotoUri;
      else if (dadosPerfil?.imagemPerfil) avatarResolved = dadosPerfil.imagemPerfil;
    }

    if (typeof avatarResolved === "string") {
      if (avatarResolved.includes("top amigo")) avatarResolved = require("../../assets/top amigo 2.png");
      else if (avatarResolved.includes("WhatsApp Image") || avatarResolved.includes("Gemini")) avatarResolved = require("../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png");
      else if (avatarResolved.includes("http") || avatarResolved.includes("blob:") || avatarResolved.startsWith("data:")) avatarResolved = avatarResolved;
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

  const recarregarDados = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
    }
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

        let usuarioAtualizadoRef = usuarioLogadoRef.current;

        if (Array.isArray(usersData) && usersData.length > 0) {
          setUsuarios(usersData);

          // Sincroniza usuário autenticado com dados atualizados do servidor sem disparar re-render cíclico
          const userServidor = usersData.find(
            (u) =>
              (usuarioLogadoRef.current?.id && u.id === usuarioLogadoRef.current.id) ||
              (usuarioLogadoRef.current?.usuario && (u.usuario || "").toLowerCase() === usuarioLogadoRef.current.usuario.toLowerCase()) ||
              (usuarioLogadoRef.current?.email && (u.email || "").toLowerCase() === usuarioLogadoRef.current.email.toLowerCase())
          );

          if (userServidor) {
            usuarioAtualizadoRef = userServidor;
            // Só atualiza o estado de usuarioLogado se algum campo relevante tiver mudado
            const mudouUsuario =
              !usuarioLogadoRef.current ||
              usuarioLogadoRef.current.id !== userServidor.id ||
              usuarioLogadoRef.current.nome !== userServidor.nome ||
              usuarioLogadoRef.current.usuario !== userServidor.usuario ||
              usuarioLogadoRef.current.fotoUri !== userServidor.fotoUri ||
              usuarioLogadoRef.current.bio !== userServidor.bio;

            if (mudouUsuario) {
              setUsuarioLogado(userServidor);
              const fotoReal = userServidor.fotoUri
                ? { uri: userServidor.fotoUri }
                : (userServidor.imagemPerfil && typeof userServidor.imagemPerfil === "string" && !userServidor.imagemPerfil.includes("WhatsApp") && !userServidor.imagemPerfil.includes("top amigo")
                  ? { uri: userServidor.imagemPerfil }
                  : (userServidor.imagemPerfil || DADOS_INICIAIS.perfil.imagemPerfil));

              setDadosPerfil({
                ...userServidor,
                imagemPerfil: fotoReal,
                fotoUri: userServidor.fotoUri || null,
                verificado: userServidor.verificado || false,
                seguidores: userServidor.seguidores ?? 0,
                seguindo: userServidor.seguindo ?? 0,
              });
            }
          }
        }
        
        // Ordena os posts em ordem cronológica decrescente (mais novos no topo)
        const postsProcessados = postsData.map((p) => processarPostServidor(p, usuarioAtualizadoRef));
        setPosts(ordenarPostsPorData(postsProcessados));

        setNotificacoes(ordenarNotificacoesPorData(Array.isArray(notifData) ? notifData : []));
        if (perfilData && perfilData.usuario && !usuarioAtualizadoRef) {
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
      setIsOnline(false);
    } finally {
      if (isInitial) {
        setLoading(false);
      }
    }
  }, [processarPostServidor]);

  useEffect(() => {
    let ativo = true;
    // Carga inicial com loading visível
    recarregarDados(true);

    // Sincronização periódica em segundo plano estável e silenciosa
    const interval = setInterval(() => {
      if (ativo) {
        recarregarDados(false);
      }
    }, 3000);

    return () => {
      ativo = false;
      clearInterval(interval);
    };
  }, [recarregarDados]);

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
      console.log("[ApiContext] Servidor json-server offline ao cadastrar usuário (usando modo local).");
    }

    adicionarNotificacao({
      tipo: "boasvindas",
      usuario: novoUsuario.usuario,
      texto: "Bem-vindo ao ClickSocial!",
      postId: null,
    });

    return { sucesso: true, usuario: novoUsuario };
  };

  // Logout isolando e limpando o estado de sessão com fallback seguro
  const fazerLogout = () => {
    setUsuarioLogado(null);
    setDadosPerfil(DADOS_INICIAIS.perfil);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem("clicksocial_usuario_logado");
        window.localStorage.removeItem("clicksocial_dados_perfil");
      }
    } catch (e) {}
  };

  // Adicionar notificação
  const adicionarNotificacao = async ({ tipo, usuario = "Você", texto, postId = null }) => {
    const agora = Date.now();
    const novaNotif = {
      id: String(agora + Math.random()),
      tipo,
      usuario,
      texto,
      horario: "Agora",
      createdAt: agora,
      postId,
    };

    setNotificacoes((prev) => ordenarNotificacoesPorData([novaNotif, ...prev]));

    try {
      await fetch(`${API_BASE_URL}/notificacoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaNotif),
      });
    } catch (e) {
      console.log("[ApiContext] Servidor json-server offline ao salvar notificação (usando modo local).");
    }
  };

  // Alternar Curtida por Usuário (Isolado e com persistência síncrona garantida)
  const alternarCurtidaGlobal = async (postId, onPostUpdate) => {
    const usuarioAtual = usuarioLogadoRef.current?.usuario || usuarioLogadoRef.current?.nome || "Você";
    const postAlvo = postsRef.current.find((p) => String(p.id) === String(postId));
    if (!postAlvo) return;

    const curtidoresAnteriores = Array.isArray(postAlvo.curtidores) ? postAlvo.curtidores : [];
    const jaCurtido = curtidoresAnteriores.includes(usuarioAtual);

    const novosCurtidores = jaCurtido
      ? curtidoresAnteriores.filter((u) => u !== usuarioAtual)
      : [...curtidoresAnteriores, usuarioAtual];

    const novasCurtidas = jaCurtido
      ? Math.max(0, (postAlvo.curtidas || 0) - 1)
      : (postAlvo.curtidas || 0) + 1;

    const postAtualizado = {
      ...postAlvo,
      curtidas: novasCurtidas,
      curtidores: novosCurtidores,
      curtido: !jaCurtido,
    };

    setPosts((postsAnteriores) => {
      const novosPosts = postsAnteriores.map((p) => (String(p.id) === String(postId) ? postAtualizado : p));
      return ordenarPostsPorData(novosPosts);
    });

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
      console.log("[ApiContext] Servidor json-server offline ao atualizar curtida (usando modo local).");
    }

    return postAtualizado;
  };

  // Alternar Republicado por Usuário com persistência síncrona
  const alternarRepublicadoGlobal = async (postId, onPostUpdate) => {
    const usuarioAtual = usuarioLogadoRef.current?.usuario || usuarioLogadoRef.current?.nome || "Você";
    const postAlvo = postsRef.current.find((p) => String(p.id) === String(postId));
    if (!postAlvo) return;

    const republicadoresAnteriores = Array.isArray(postAlvo.republicadores) ? postAlvo.republicadores : [];
    const jaRepublicado = republicadoresAnteriores.includes(usuarioAtual);

    const novosRepublicadores = jaRepublicado
      ? republicadoresAnteriores.filter((u) => u !== usuarioAtual)
      : [...republicadoresAnteriores, usuarioAtual];

    const novosRepostsCount = jaRepublicado
      ? Math.max(0, (postAlvo.repostsCount || 0) - 1)
      : (postAlvo.repostsCount || 0) + 1;

    const postAtualizado = {
      ...postAlvo,
      repostsCount: novosRepostsCount,
      republicadores: novosRepublicadores,
      republicado: !jaRepublicado,
    };

    setPosts((postsAnteriores) => {
      const novosPosts = postsAnteriores.map((p) => (String(p.id) === String(postId) ? postAtualizado : p));
      return ordenarPostsPorData(novosPosts);
    });

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
      console.log("[ApiContext] Servidor json-server offline ao atualizar republicação (usando modo local).");
    }

    return postAtualizado;
  };

  // Adicionar novo post com createdAt e ordenação cronológica garantida
  const adicionarNovoPost = async (novoPost) => {
    const agoraTimestamp = Date.now();
    const avatarRaw =
      usuarioLogado?.fotoUri ||
      dadosPerfil?.fotoUri ||
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
      const postParaServidor = {
        ...postFormatado,
        avatar: typeof avatarDoUsuario === "string" ? avatarDoUsuario : (avatarDoUsuario?.uri || "WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
        image: typeof imagemDoPost === "string" ? imagemDoPost : (imagemDoPost?.uri || null),
      };

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postParaServidor),
      });

      if (response.ok) {
        setIsOnline(true);
        console.log(`[ApiContext] Publicação salva na API com sucesso (ID: ${postFormatado.id})`);
        recarregarDados();
      } else {
        const errorText = await response.text();
        console.warn(`[ApiContext] Erro ao salvar publicação na API (Status ${response.status}):`, errorText);
      }
    } catch (e) {
      console.log("[ApiContext] Servidor json-server offline ao criar post (usando modo local).", e);
    }
  };

  // Adicionar comentário em um post e persistir com retorno síncrono imediato
  const adicionarComentario = async (postId, comentarioTexto, parentCommentId = null) => {
    const postAlvo = postsRef.current.find((p) => String(p.id) === String(postId));
    if (!postAlvo) return null;

    const autorNome = usuarioLogadoRef.current?.nome || dadosPerfilRef.current?.nome || "Você";
    const autorUsuario = usuarioLogadoRef.current?.usuario || dadosPerfilRef.current?.usuario || "meu_usuario";
    const autorFoto =
      usuarioLogadoRef.current?.fotoUri ||
      dadosPerfilRef.current?.fotoUri ||
      (typeof dadosPerfilRef.current?.imagemPerfil === "string" ? dadosPerfilRef.current.imagemPerfil : dadosPerfilRef.current?.imagemPerfil?.uri) ||
      null;

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

    let comentariosNovos = [];
    const comentariosExistentes = Array.isArray(postAlvo.comentarios) ? postAlvo.comentarios : [];

    if (parentCommentId) {
      comentariosNovos = comentariosExistentes.map((c) => {
        if (String(c.id) === String(parentCommentId)) {
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
      comentariosNovos = [...comentariosExistentes, novoComentarioObj];
    }

    const postAtualizado = {
      ...postAlvo,
      comentarios: comentariosNovos,
      comentariosCount: comentariosNovos.length,
    };

    setPosts((prevPosts) => {
      const atualizados = prevPosts.map((p) => (String(p.id) === String(postId) ? postAtualizado : p));
      return ordenarPostsPorData(atualizados);
    });

    adicionarNotificacao({
      tipo: "comentario",
      usuario: autorUsuario,
      texto: `Comentou: "${comentarioTexto}"`,
      postId,
    });

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
      console.log("[ApiContext] Servidor json-server offline ao adicionar comentário (usando modo local).");
    }

    return postAtualizado;
  };

  // Alternar Curtida de um Comentário Específico com persistência síncrona
  const alternarCurtidaComentarioGlobal = async (postId, commentId) => {
    const postAlvo = postsRef.current.find((p) => String(p.id) === String(postId));
    if (!postAlvo) return null;

    const comentariosNovos = (postAlvo.comentarios || []).map((c) => {
      if (String(c.id) === String(commentId)) {
        const novoCurtido = !c.curtido;
        return {
          ...c,
          curtido: novoCurtido,
          curtidas: novoCurtido ? (c.curtidas || 0) + 1 : Math.max(0, (c.curtidas || 0) - 1),
        };
      }
      return c;
    });

    const postAtualizado = { ...postAlvo, comentarios: comentariosNovos };

    setPosts((prevPosts) => {
      const atualizados = prevPosts.map((p) => (String(p.id) === String(postId) ? postAtualizado : p));
      return ordenarPostsPorData(atualizados);
    });

    try {
      await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comentarios: postAtualizado.comentarios,
        }),
      });
    } catch (e) {
      console.log("[ApiContext] Servidor json-server offline ao curtir comentário (usando modo local).");
    }

    return postAtualizado;
  };

  // Atualizar perfil do usuário ativo com conversão permanente e propagação total
  const atualizarPerfil = async (novosDados) => {
    const fotoUriRaw =
      novosDados.fotoUri ||
      novosDados.imagemPerfil?.uri ||
      (typeof novosDados.imagemPerfil === "string" ? novosDados.imagemPerfil : null);

    // Converte de imediato qualquer URI (inclusive blob temporário de navegador) para Base64 permanente
    const fotoUriPermanente = fotoUriRaw ? await resolverUriPermanente(fotoUriRaw) : null;
    const imagemPerfilFinal = fotoUriPermanente
      ? { uri: fotoUriPermanente }
      : (novosDados.imagemPerfil || dadosPerfil?.imagemPerfil || DADOS_INICIAIS.perfil.imagemPerfil);

    const perfilAtualizado = {
      ...dadosPerfil,
      ...novosDados,
      fotoUri: fotoUriPermanente || dadosPerfil?.fotoUri || null,
      imagemPerfil: imagemPerfilFinal,
    };

    setDadosPerfil(perfilAtualizado);

    let userAtualizado = null;
    if (usuarioLogado) {
      userAtualizado = {
        ...usuarioLogado,
        nome: novosDados.nome || usuarioLogado.nome,
        usuario: novosDados.usuario || usuarioLogado.usuario,
        bio: novosDados.bio !== undefined ? novosDados.bio : usuarioLogado.bio,
        fotoUri: fotoUriPermanente || usuarioLogado.fotoUri,
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

    // Sincroniza em tempo real as publicações existentes do usuário no Feed para exibir a nova foto
    const nomeIdentificador = (userAtualizado?.usuario || userAtualizado?.nome || perfilAtualizado.usuario || perfilAtualizado.nome || "").toLowerCase();
    const avatarParaPosts = fotoUriPermanente || (typeof imagemPerfilFinal === "object" ? imagemPerfilFinal.uri : imagemPerfilFinal);

    if (nomeIdentificador && avatarParaPosts) {
      setPosts((prevPosts) => {
        const postsAtualizados = prevPosts.map((p) => {
          const postUser = (p.user || "").toLowerCase();
          if (postUser === nomeIdentificador) {
            return {
              ...p,
              avatar: avatarParaPosts,
            };
          }
          return p;
        });
        return ordenarPostsPorData(postsAtualizados);
      });
    }

    try {
      await fetch(`${API_BASE_URL}/perfil`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userAtualizado?.id || perfilAtualizado.id || "u1",
          nome: perfilAtualizado.nome,
          usuario: perfilAtualizado.usuario,
          bio: perfilAtualizado.bio,
          imagemPerfil: fotoUriPermanente || (typeof imagemPerfilFinal === "string" ? imagemPerfilFinal : "WhatsApp Image 2026-08-25 at 11.25.57 2.png"),
          fotoUri: fotoUriPermanente || null,
        }),
      });
    } catch (e) {
      console.log("[ApiContext] Servidor json-server offline ao atualizar perfil (usando modo local).");
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
