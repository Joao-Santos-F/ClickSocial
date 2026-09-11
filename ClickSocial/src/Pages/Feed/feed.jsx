import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feedstyles } from "./feedStyle";
import NavegacaoInferior from "../../components/NavegacaoInferior";
import {
  IconeLogoFeed,
  IconeBuscarFeed,
  IconeMaisInformacoes,
  IconeCoracaoFeed,
  IconeMensagemFeed,
  IconeFrameFeed,
} from "../../components/IconesSvg";

    const posts = [
        {
        id: 1,
        user: "Arthurbr-YT",
        time: "Há 2 horas",
        text: "Acabei de publicar um novo conteúdo no canal! Vamos juntos explorar novas ideias e aprender coisas novas.",
        accent: "#5ef9d6",
        avatar: require('../../../assets/Gemini_Generated_Image_1rfyg1rfyg1rfyg1.png'),
        image: require('../../../assets/12 Sem Título_20260828133808.jpg'),
        },
        {
        id: 2,
        user: "Outro Cara",
        time: "Ontem",
        text: "Só eu que acho que o @Arthurbr-YT é uma mona chata? Tipo é, tipo an, tipo nada havê",
        accent: "#74f7c7",
        avatar: require('../../../assets/Gemini_Generated_Image_1rfyg1rfyg1rfyg1.png'),
        image: require('../../../assets/1212.jpg'),
        },
        {
        id: 3,
        user: "Outro Cara",
        time: "Ontem",
        text: "Só eu que acho que o @Arthurbr-YT é uma mona chata? Tipo é, tipo an, tipo nada havê",
        accent: "#74f7c7",
        avatar: require('../../../assets/Gemini_Generated_Image_1rfyg1rfyg1rfyg1.png'),
        image: require('../../../assets/1212.jpg'),
      },
    ];

    function Artwork({ accent }) {
      return (
        <View style={Feedstyles.artwork}>
          <View style={[Feedstyles.eye, { left: "18%" }, { borderColor: accent }]}>
            <View style={[Feedstyles.eyeInner, { backgroundColor: accent }]} />
            <View style={Feedstyles.eyeHighlight} />
          </View>

          <View style={[Feedstyles.eye, { right: "18%" }, { borderColor: accent }]}>
            <View style={[Feedstyles.eyeInner, { backgroundColor: accent }]} />
            <View style={Feedstyles.eyeHighlight} />
          </View>

          <View style={Feedstyles.mouthWrap}>
            <View style={[Feedstyles.mouth, { borderColor: accent }]} />
          </View>
        </View>
      );
    }

    export default function Feed({ telaAtiva = "Feed", aoMudarTela }) {
      return (
        <LinearGradient colors={['#211645', '#181122']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex: 1, width: '100%', height: '100%',}}>
        
        <View style={Feedstyles.Main_feed}>
          <View style={Feedstyles.Header}>
            <Text style={Feedstyles.HeaderText}>Click Social</Text>

            <View style={{ marginLeft: 9, marginTop: 2 }}>
              <IconeLogoFeed tamanho={20} />
            </View>

            <TouchableOpacity
              style={Feedstyles.SearchButton}
              onPress={() => aoMudarTela && aoMudarTela("pesquisa")}
              activeOpacity={0.7}
            >
              <IconeBuscarFeed tamanho={20} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={Feedstyles.feedScroll}
            contentContainerStyle={Feedstyles.feedContent}
            showsVerticalScrollIndicator={false}
          >
            {posts.map((post) => (
              <View key={post.id} style={Feedstyles.PostCard}>
                <View style={Feedstyles.PostHeader}>
                  <View style={Feedstyles.AvatarWrap}>
                    {post.avatar ? (
                      <Image source={post.avatar} style={Feedstyles.AvatarImage} />
                    ) : (
                      <View style={Feedstyles.AvatarInner} />
                    )}
                  </View>

                  <View style={Feedstyles.UserTextWrap}>
                    <Text style={Feedstyles.UserName}>{post.user}</Text>
                    <Text style={Feedstyles.MetaText}>{post.time}</Text>
                  </View>

                  <TouchableOpacity style={Feedstyles.MenuButton} activeOpacity={0.7}>
                    <IconeMaisInformacoes tamanho={18} />
                  </TouchableOpacity>
                </View>

                <Text style={Feedstyles.PostText}>{post.text}</Text>

                {post.image ? (
                  <Image source={post.image} style={Feedstyles.PostImage} resizeMode="cover" />
                ) : (
                  <Artwork accent={post.accent} />
                )}

                <View style={Feedstyles.ActionsRow}>
                  <View style={Feedstyles.ActionItem}>
                    <TouchableOpacity activeOpacity={0.7}>
                      <IconeCoracaoFeed tamanho={20} />
                    </TouchableOpacity>
                    <Text style={Feedstyles.ActionText}>1.9K</Text>
                  </View>

                  <View style={Feedstyles.ActionItem}>
                    <TouchableOpacity activeOpacity={0.7}>
                      <IconeMensagemFeed tamanho={20} />
                    </TouchableOpacity>
                    <Text style={Feedstyles.ActionText}>120</Text>
                  </View>

                  <View style={Feedstyles.ActionItem}>
                    <TouchableOpacity activeOpacity={0.7}>
                      <IconeFrameFeed tamanho={20} />
                    </TouchableOpacity>
                  </View>

                  <View style={Feedstyles.ActionItemShare}>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={Feedstyles.ActionIconShare}>Ver mais</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        
        <NavegacaoInferior telaAtiva={telaAtiva} aoMudarTela={aoMudarTela} />

        </LinearGradient>
      );
    }