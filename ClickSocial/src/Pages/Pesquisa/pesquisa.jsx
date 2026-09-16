import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import NavegacaoInferior from '../../components/NavegacaoInferior';
import {
  IconeLogoFeed,
  IconeBuscarFeed,
  IconeFogoDestaque,
  MascoteVerde,
} from '../../components/IconesSvg';
import { PesquisaStyles } from './pesquisaStyle';

const destaquesSugeridos = ['Estrada Cata Preta', 'ClickSocial', 'Tech', 'Canal'];

function FaceCard({ post, onPress }) {
  const image = post?.image;
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[PesquisaStyles.faceCard, { marginBottom: 12 }]}
    >
      <View style={PesquisaStyles.starTopRight}>
        <IconeFogoDestaque largura={14} altura={18} />
      </View>

      {image ? (
        typeof image === 'string' ? (
          <Image source={{ uri: image }} style={PesquisaStyles.faceImage} resizeMode="cover" />
        ) : (
          <Image source={image} style={PesquisaStyles.faceImage} resizeMode="cover" />
        )
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D0914' }}>
          <MascoteVerde tamanho={80} />
        </View>
      )}

      {/* Info Overlay */}
      <View style={{ padding: 6, backgroundColor: 'rgba(0,0,0,0.7)', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <Text numberOfLines={1} style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>
          {post?.user || 'Usuário'}
        </Text>
        <Text numberOfLines={1} style={{ color: '#DDD', fontSize: 10 }}>
          {post?.text || 'Publicação'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Pesquisa({ telaAtiva = "pesquisa", aoMudarTela, posts = [] }) {
  const [searchText, setSearchText] = useState('');

  const busca = searchText.trim().toLowerCase();

  const postsFiltrados = posts.filter((p) => {
    if (!busca) return true;

    // Busca no texto do post
    const bateuTexto = p.text && p.text.toLowerCase().includes(busca);
    // Busca no usuário
    const bateuUser = p.user && p.user.toLowerCase().includes(busca);
    // Busca nas tags
    const bateuTag = p.tags && p.tags.some((t) => t.toLowerCase().includes(busca));
    // Busca nos comentários
    const bateuComentario = p.comentarios && p.comentarios.some(
      (c) => (c.texto && c.texto.toLowerCase().includes(busca)) || (c.autor && c.autor.toLowerCase().includes(busca))
    );

    return bateuTexto || bateuUser || bateuTag || bateuComentario;
  });

  const alturaStatusBar = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;

  return (
    <LinearGradient
      colors={['#211645', '#181122']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <SafeAreaView style={{ flex: 1, paddingTop: alturaStatusBar }}>
        <View style={PesquisaStyles.container}>
          {/* Header */}
          <View style={PesquisaStyles.headerBar}>
            <TouchableOpacity onPress={() => aoMudarTela && aoMudarTela("feed")} activeOpacity={0.7}>
              <Text style={PesquisaStyles.title}>Click Social</Text>
            </TouchableOpacity>
            <View style={PesquisaStyles.titleIconWrap}>
              <IconeLogoFeed tamanho={22} />
            </View>
          </View>

          {/* Card Principal */}
          <View style={PesquisaStyles.card}>
            {/* Campo Busca */}
            <View style={PesquisaStyles.searchBox}>
              <TextInput
                style={PesquisaStyles.searchInput}
                placeholder="Pesquisar fotos, posts ou comentários..."
                placeholderTextColor="#999999"
                value={searchText}
                onChangeText={setSearchText}
                editable={true}
              />
              <View style={PesquisaStyles.searchIconWrap}>
                <IconeBuscarFeed tamanho={18} />
              </View>
            </View>

            {/* Destaques / Tags Clicáveis */}
            <Text style={PesquisaStyles.sectionTitle}>Destaques:</Text>
            <View style={PesquisaStyles.highlightList}>
              {destaquesSugeridos.map((item, index) => (
                <TouchableOpacity
                  key={`${item}-${index}`}
                  style={PesquisaStyles.highlightRow}
                  activeOpacity={0.7}
                  onPress={() => setSearchText(item)}
                >
                  <IconeFogoDestaque largura={14} altura={18} />
                  <Text style={PesquisaStyles.highlightText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Resultado da Busca */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              {postsFiltrados.length === 0 ? (
                <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                  <Text style={{ color: '#8E8A9E', fontSize: 14 }}>
                    Nenhuma foto ou comentário encontrado para "{searchText}".
                  </Text>
                </View>
              ) : (
                <View style={PesquisaStyles.grid}>
                  {postsFiltrados.map((post) => (
                    <FaceCard
                      key={post.id}
                      post={post}
                      onPress={() => aoMudarTela && aoMudarTela("detalhes", post, "pesquisa")}
                    />
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>

        <NavegacaoInferior telaAtiva={telaAtiva} aoMudarTela={aoMudarTela} />
      </SafeAreaView>
    </LinearGradient>
  );
}
