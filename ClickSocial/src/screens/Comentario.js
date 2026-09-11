import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import avatarEduardo from '../../assets/top amigo 2.png';
import avatarDefault from '../../assets/Gemini_Generated_Image_1rfyg1rfyg1rfyg1.png';
import iconCoracao from '../../assets/incon_coracao.png';
import iconNotificacao from '../../assets/incon_notificacao.png';

export default function Comentario({ onBack, onVoltar, post, aoCurtirComentario, aoAdicionarComentario }) {
  const [novoTexto, setNovoTexto] = useState('');
  
  const comentariosPadrao = [
    {
      id: '1',
      nome: 'Eduardo Torolho',
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
      handle: 'lucas_m',
      tempo: 'Há 10 minutos',
      texto: 'Sensacional demais!',
      curtidas: 5,
      curtido: true,
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

  const lidarAdicionarComentario = () => {
    if (!novoTexto.trim()) return;
    if (aoAdicionarComentario) {
      aoAdicionarComentario(novoTexto.trim());
    } else {
      setLocalComentarios([
        ...listaComentarios,
        {
          id: String(Date.now()),
          nome: 'Você',
          handle: 'meu_usuario',
          tempo: 'Agora',
          texto: novoTexto.trim(),
          curtidas: 0,
          curtido: false,
          respostas: 0,
          avatar: avatarDefault,
        },
      ]);
    }
    setNovoTexto('');
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

            {/* Campo Digite algo... com ícone de enviar */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Digite algo..."
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
            {listaComentarios.map((item, index) => {
              const avatarFonte = item.avatar || (item.nome === 'Eduardo Torolho' ? avatarEduardo : avatarDefault);

              return (
                <View key={item.id} style={styles.commentCard}>
                  {/* Topo do Comentário: Avatar + Info */}
                  <View style={styles.userHeader}>
                    {typeof avatarFonte === 'string' ? (
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

                {/* Ações do Comentário (Curtidas e Respostas) */}
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
                        {item.curtidas}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.actionItem}>
                    <Image
                      source={iconNotificacao}
                      style={styles.actionIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.actionCount}>{item.respostas}</Text>
                  </View>
                </View>
              </View>
            );})}
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
});
