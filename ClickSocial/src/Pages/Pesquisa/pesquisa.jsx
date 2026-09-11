import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import NavegacaoInferior from '../../components/NavegacaoInferior';
import {
  IconeLogoFeed,
  IconeBuscarFeed,
  IconeFogoDestaque,
} from '../../components/IconesSvg';
import { PesquisaStyles } from './pesquisaStyle';

const destaques = ['Estrada Cata Preta', 'Estrada Cata Preta', 'Estrada Cata Preta'];

const cards = [
  { id: 1, image: require('../../../assets/12 Sem Título_20260828133808.jpg') },
  { id: 2, image: require('../../../assets/1212.jpg') },
  { id: 3, image: require('../../../assets/12 Sem Título_20260828133808.jpg') },
  { id: 4, image: require('../../../assets/1212.jpg') },
  { id: 5, image: require('../../../assets/12 Sem Título_20260828133808.jpg') },
  { id: 6, image: require('../../../assets/1212.jpg') },
];

function FaceCard({ image }) {
  return (
    <View style={PesquisaStyles.faceCard}>
      <View style={PesquisaStyles.starTopRight}>
        <IconeFogoDestaque largura={14} altura={18} />
      </View>

      {image ? (
        <Image source={image} style={PesquisaStyles.faceImage} resizeMode="cover" />
      ) : (
        <>
          <View style={PesquisaStyles.eyeLeft}>
            <View style={PesquisaStyles.eyeInner} />
          </View>

          <View style={PesquisaStyles.eyeRight}>
            <View style={PesquisaStyles.eyeInner} />
          </View>

          <View style={PesquisaStyles.mouth} />
        </>
      )}
    </View>
  );
}

export default function Pesquisa({ telaAtiva = "pesquisa", aoMudarTela }) {
  const [searchText, setSearchText] = useState('');

  return (
    <LinearGradient colors={['#211645', '#181122']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex: 1, width: '100%', height: '100%',}}>

    <View style={PesquisaStyles.container}>
      <View style={PesquisaStyles.headerBar}>
        <TouchableOpacity onPress={() => aoMudarTela && aoMudarTela("feed")} activeOpacity={0.7}>
          <Text style={PesquisaStyles.title}>Click Social</Text>
        </TouchableOpacity>
        <View style={PesquisaStyles.titleIconWrap}>
          <IconeLogoFeed tamanho={22} />
        </View>
      </View>
    <View style={PesquisaStyles.card}>
    <View style={PesquisaStyles.searchBox}>
        <TextInput
          style={PesquisaStyles.searchInput}
          placeholder="Pesquisar..."
          placeholderTextColor="#999999"
          value={searchText}
          onChangeText={setSearchText}
          editable={true}
        />
        <View style={PesquisaStyles.searchIconWrap}>
          <IconeBuscarFeed tamanho={18} />
        </View>
      </View>

      <Text style={PesquisaStyles.sectionTitle}>Destaques:</Text>

      <View style={PesquisaStyles.highlightList}>
        {destaques.map((item, index) => (
          <View key={`${item}-${index}`} style={PesquisaStyles.highlightRow}>
            <IconeFogoDestaque largura={14} altura={18} />
            <Text style={PesquisaStyles.highlightText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={PesquisaStyles.grid}>
        {cards.map((card) => (
          <FaceCard key={card.id} image={card.image} />
        ))}
      </View>
    </View>

    </View>

    <NavegacaoInferior telaAtiva={telaAtiva} aoMudarTela={aoMudarTela} />
    
    </LinearGradient>
  );
}
