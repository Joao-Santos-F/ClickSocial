import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import avatarEduardo from '../../assets/top amigo 2.png';
import avatarDefault from '../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png';
import iconCoracao from '../../assets/incon_coracao.png';
import iconNotificacao from '../../assets/incon_notificacao.png';
import { useApi } from '../context/ApiContext';

export default function Comentario({ onBack, onVoltar, post, aoCurtirComentario, aoAdicionarComentario }) {
  const { usuarios = [], dadosPerfil = {} } = useApi();
  const [novoTexto, setNovoTexto] = useState('');
  const [replyToComment, setReplyToComment] = useState(null);

  const comentariosPadrao = [
    {
      id: '1',
      nome: 'Eduardo Torolho',
      autor: 'Eduardo Torolho',
      handle: 'happy_1243',
      tempo: 'Há 2 minutos',
      texto: 'É o goat não tem jeito 🔥🔥',
      curtidas: 12,
      curtido: false,
      respostas: 6,
      avatar: avatarEduardo,
    },
    {
      id: '2',
      nome: 'Lucas M.',
      autor: 'Lucas M.',
      handle: 'lucas_m',
      tempo: 'Há 10 minutos',
      texto: 'Sensacional demais!',
      curtidas: 5,
      curtido: false,
      respostas: 1,
      avatar: avatarDefault,
    },
  ];

  const [localComentarios, setLocalComentarios] = useState(post?.comentarios || comentariosPadrao);

  const listaComentarios = post?.comentarios || localComentarios;

  const lidarVoltar = onBack || onVoltar;

  const alternarCurtidaComentario = (id) => {
    if (aoCurtirComentario) {
      aoCurtirComentario(id);
    } else {
      setLocalComentarios((anteriores) =>
        anteriores.map((item) => {
          if (item.id === id) {
            const novoCurtido = !item.curtido;
            return {
              ...item,
              curtido: novoCurtido,
              curtidas: novoCurtido ? item.curtidas + 1 : Math.max(0, item.curtidas - 1),
            };
          }
          return item;
        })
      );
    }
  };

  const lidarAdicionarComentario = async () => {
    if (!novoTexto.trim()) return;
    const textoParaEnviar = novoTexto.trim();
    const parentId = replyToComment ? replyToComment.id : null;
    
    setNovoTexto('');
    setReplyToComment(null);

    if (aoAdicionarComentario) {
      await aoAdicionarComentario(textoParaEnviar, parentId);
    } else {
      const novoObj = {
        id: String(Date.now()),
        parentCommentId: parentId,
        nome: dadosPerfil?.nome || 'Você',
        autor: dadosPerfil?.usuario || 'Você',
        handle: dadosPerfil?.usuario || 'meu_usuario',
        tempo: 'Agora',
        texto: textoParaEnviar,
        curtidas: 0,
        curtido: false,
        respostas: 0,
        avatar: dadosPerfil?.imagemPerfil || avatarDefault,
      };
      setLocalComentarios((prev) => [...prev, novoObj]);
    }
  };

  const resolverAvatarAutor = (item) => {
    const nomeAutor = (item.autor || item.nome || '').trim();
    
    // 1. Procura se o autor é o usuário atualmente logado (dadosPerfil ou usuarioLogado)
    if (
      dadosPerfil &&
      (nomeAutor.toLowerCase() === (dadosPerfil.usuario || '').toLowerCase() ||
       nomeAutor.toLowerCase() === (dadosPerfil.nome || '').toLowerCase() ||
       nomeAutor.toLowerCase() === 'você')
    ) {
      if (dadosPerfil.fotoUri) return { uri: dadosPerfil.fotoUri };
      if (dadosPerfil.imagemPerfil) {
        if (typeof dadosPerfil.imagemPerfil === 'string') {
          if (dadosPerfil.imagemPerfil.startsWith('data:') || dadosPerfil.imagemPerfil.startsWith('http') || dadosPerfil.imagemPerfil.startsWith('blob:')) {
            return { uri: dadosPerfil.imagemPerfil };
          }
          if (dadosPerfil.imagemPerfil.includes('top amigo')) return avatarEduardo;
          if (dadosPerfil.imagemPerfil.includes('WhatsApp')) return avatarDefault;
        }
        return dadosPerfil.imagemPerfil;
      }
    }

    // 2. Procura o autor na lista global de usuários
    const userMatch = usuarios.find(
      (u) =>
        (u.usuario || '').toLowerCase() === nomeAutor.toLowerCase() ||
        (u.nome || '').toLowerCase() === nomeAutor.toLowerCase() ||
        (u.email || '').toLowerCase() === nomeAutor.toLowerCase()
    );

    if (userMatch) {
      if (userMatch.fotoUri) {
        return { uri: userMatch.fotoUri };
      }
      if (userMatch.imagemPerfil) {
        return typeof userMatch.imagemPerfil === 'string'
          ? (userMatch.imagemPerfil.startsWith('data:') || userMatch.imagemPerfil.startsWith('http')
              ? { uri: userMatch.imagemPerfil }
              : (userMatch.imagemPerfil.includes('top amigo') ? avatarEduardo : avatarDefault))
          : userMatch.imagemPerfil;
      }
    }

    // 3. Fallback para avatar do comentário original se existir
    if (item.avatar) {
      if (typeof item.avatar === 'string') {
        if (item.avatar.includes('http') || item.avatar.includes('blob:') || item.avatar.startsWith('data:')) {
          return { uri: item.avatar };
        }
        if (item.avatar.includes('top amigo')) return avatarEduardo;
        if (item.avatar.includes('WhatsApp')) return avatarDefault;
      } else {
        return item.avatar;
      }
    }

    // 4. Fallback padrão
    if (nomeAutor.toLowerCase().includes('eduardo')) return avatarEduardo;
    return avatarDefault;
  };

  return (
    <LinearGradient colors={['#211C52', '#211645', '#0D0914']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            {/* Seta de Voltar e Título */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={lidarVoltar}
                activeOpacity={0.7}
              >
                <Image
                  source={require('../../assets/incon_seta-esquerda.png')}
                  style={styles.backIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.title}>Comentários</Text>
            </View>

            {/* Banner de Resposta se um comentário pai estiver selecionado */}
            {replyToComment && (
              <View style={styles.replyBanner}>
                <Text style={styles.replyBannerText}>
                  Respondendo a <Text style={{ fontWeight: 'bold' }}>@{replyToComment.autor || replyToComment.nome}</Text>
                </Text>
                <TouchableOpacity onPress={() => setReplyToComment(null)}>
                  <Text style={styles.replyBannerCancel}>✕</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Campo Digite algo... com ícone de enviar */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={replyToComment ? `Responder a @${replyToComment.autor || replyToComment.nome}...` : "Digite algo..."}
                placeholderTextColor="#999999"
                value={novoTexto}
                onChangeText={setNovoTexto}
              />
              <TouchableOpacity
                style={styles.sendButton}
                activeOpacity={0.7}
                onPress={lidarAdicionarComentario}
              >
                <Text style={styles.sendIcon}>➤</Text>
              </TouchableOpacity>
            </View>

            {/* Lista de Comentários */}
            {listaComentarios.map((item) => {
              const avatarFonte = resolverAvatarAutor(item);

              return (
                <View key={item.id} style={styles.commentCard}>
                  {/* Topo do Comentário: Avatar + Info */}
                  <View style={styles.userHeader}>
                    {typeof avatarFonte === 'object' && avatarFonte.uri ? (
                      <Image
                        source={{ uri: avatarFonte.uri }}
                        style={styles.avatarImage}
                        resizeMode="cover"
                      />
                    ) : typeof avatarFonte === 'string' ? (
                      <Image
                        source={{ uri: avatarFonte }}
                        style={styles.avatarImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        source={avatarFonte}
                        style={styles.avatarImage}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{item.nome || item.autor}</Text>
                      <Text style={styles.userHandle}>{item.handle || `@${(item.nome || item.autor || '').toLowerCase().replace(/\s+/g, '')}`}</Text>
                      <Text style={styles.timeAgo}>{item.tempo || 'Agora'}</Text>
                    </View>
                  </View>

                  {/* Texto do Comentário */}
                  <Text style={styles.commentText}>{item.texto}</Text>

                  {/* Ações do Comentário */}
                  <View style={styles.actionsRow}>
                    <View style={styles.actionItem}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => alternarCurtidaComentario(item.id)}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Image
                          source={iconCoracao}
                          style={[
                            styles.actionIcon,
                            { tintColor: item.curtido ? '#FF3B30' : '#8E8A9E' },
                          ]}
                          resizeMode="contain"
                        />
                        <Text
                          style={[
                            styles.actionCount,
                            item.curtido && { color: '#FF3B30', fontWeight: 'bold' },
                          ]}
                        >
                          {item.curtidas || 0}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.actionItem}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setReplyToComment(item)}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Image
                          source={iconNotificacao}
                          style={styles.actionIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.actionCount}>{item.respostas || (item.respostasLista ? item.respostasLista.length : 0)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Respostas Aninhadas (Child Comments) */}
                  {Array.isArray(item.respostasLista) && item.respostasLista.length > 0 && (
                    <View style={styles.subCommentsContainer}>
                      {item.respostasLista.map((subItem) => {
                        const subAvatar = resolverAvatarAutor(subItem);
                        return (
                          <View key={subItem.id} style={styles.subCommentCard}>
                            <View style={styles.userHeader}>
                              {typeof subAvatar === 'object' && subAvatar.uri ? (
                                <Image source={{ uri: subAvatar.uri }} style={styles.subAvatarImage} resizeMode="cover" />
                              ) : (
                                <Image source={subAvatar} style={styles.subAvatarImage} resizeMode="cover" />
                              )}
                              <View style={styles.userInfo}>
                                <Text style={styles.userName}>{subItem.nome || subItem.autor}</Text>
                                <Text style={styles.userHandle}>@{subItem.autor}</Text>
                              </View>
                            </View>
                            <Text style={styles.subCommentText}>{subItem.texto}</Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#F4F0FA',
    borderRadius: 24,
    width: '100%',
    maxWidth: 380,
    minHeight: 460,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    padding: 4,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#1A1A1A',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  replyBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E4DCED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  replyBannerText: {
    fontSize: 13,
    color: '#333333',
  },
  replyBannerCancel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    paddingHorizontal: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8FC',
    borderWidth: 1,
    borderColor: '#E4DCED',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  sendButton: {
    padding: 4,
    marginLeft: 6,
  },
  sendIcon: {
    fontSize: 16,
    color: '#3A3A3A',
    transform: [{ rotate: '-35deg' }],
  },
  commentCard: {
    backgroundColor: '#FAF8FC',
    borderWidth: 1,
    borderColor: '#E4DCED',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    backgroundColor: '#E4DCED',
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    lineHeight: 16,
  },
  userHandle: {
    fontSize: 11,
    color: '#666666',
    lineHeight: 14,
  },
  timeAgo: {
    fontSize: 10,
    color: '#888888',
    lineHeight: 12,
  },
  commentText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  actionCount: {
    fontSize: 13,
    color: '#444444',
    fontWeight: '500',
  },
  subCommentsContainer: {
    marginTop: 10,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#D1C4E9',
  },
  subCommentCard: {
    backgroundColor: '#F0EBF8',
    borderRadius: 8,
    padding: 8,
    marginTop: 6,
  },
  subAvatarImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  subCommentText: {
    fontSize: 13,
    color: '#222222',
    marginTop: 2,
  },
});

