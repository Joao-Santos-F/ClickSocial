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
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function EditarPerfil({ perfil, onVoltar, onSalvar }) {
  const [nome, setNome] = useState(perfil?.nome || 'Arthur Batista');
  const [usuario, setUsuario] = useState(perfil?.usuario || 'Arthurbr-YT');
  const [bio, setBio] = useState(
    perfil?.bio || 'Criador de conteúdo e explorador de ideias.'
  );

  const obterFonteInicial = () => {
    if (perfil?.fotoUri) return { uri: perfil.fotoUri };
    if (perfil?.imagemPerfil) {
      if (typeof perfil.imagemPerfil === 'string') {
        if (perfil.imagemPerfil.startsWith('data:') || perfil.imagemPerfil.startsWith('http')) {
          return { uri: perfil.imagemPerfil };
        }
        if (perfil.imagemPerfil.includes('top amigo')) return require('../../assets/top amigo 2.png');
        if (perfil.imagemPerfil.includes('WhatsApp')) return require('../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png');
      }
      return perfil.imagemPerfil;
    }
    return require('../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png');
  };

  const [imagemPerfil, setImagemPerfil] = useState(obterFonteInicial);

  const selecionarImagem = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar sua galeria!'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        let uriPermanente = asset.base64
          ? `data:image/jpeg;base64,${asset.base64}`
          : asset.uri;

        // Se for blob temporário de navegador, converte imediatamente para Data URL Base64 persistente
        if (uriPermanente && uriPermanente.startsWith('blob:')) {
          try {
            const resp = await fetch(uriPermanente);
            const blob = await resp.blob();
            uriPermanente = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                  resolve(reader.result);
                } else {
                  resolve(uriPermanente);
                }
              };
              reader.onerror = () => resolve(uriPermanente);
              reader.readAsDataURL(blob);
            });
          } catch (err) {
            console.log('Erro ao converter blob para base64:', err);
          }
        }

        setImagemPerfil({ uri: uriPermanente });
      }
    } catch (error) {
      console.log('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const obterFonteAvatar = () => {
    if (!imagemPerfil) {
      return require('../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png');
    }
    if (typeof imagemPerfil === 'object' && imagemPerfil?.uri) {
      return { uri: imagemPerfil.uri };
    }
    if (typeof imagemPerfil === 'string') {
      if (imagemPerfil.startsWith('data:') || imagemPerfil.startsWith('http') || imagemPerfil.startsWith('blob:')) {
        return { uri: imagemPerfil };
      }
      if (imagemPerfil.includes('top amigo')) {
        return require('../../assets/top amigo 2.png');
      }
      if (imagemPerfil.includes('WhatsApp')) {
        return require('../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png');
      }
    }
    if (typeof imagemPerfil === 'number') {
      return imagemPerfil;
    }
    return require('../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png');
  };

  const lidarSalvar = () => {
    if (onSalvar) {
      const uriFinal = typeof imagemPerfil === 'object' && imagemPerfil?.uri ? imagemPerfil.uri : imagemPerfil;
      onSalvar({
        nome,
        usuario,
        bio,
        imagemPerfil,
        fotoUri: typeof uriFinal === 'string' && (uriFinal.startsWith('data:') || uriFinal.startsWith('http')) ? uriFinal : null,
      });
    } else if (onVoltar) {
      onVoltar();
    }
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
                onPress={onVoltar}
                activeOpacity={0.7}
              >
                <Image
                  source={require('../../assets/incon_seta-esquerda.png')}
                  style={styles.backIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.title}>Editar Perfil</Text>
            </View>

            {/* Foto de Perfil */}
            <View style={styles.profileContainer}>
              <TouchableOpacity
                style={styles.avatarWrapper}
                onPress={selecionarImagem}
                activeOpacity={0.8}
              >
                <Image
                  source={obterFonteAvatar()}
                  style={styles.avatar}
                  resizeMode="cover"
                />
                <View style={styles.cameraBadge}>
                  <Image
                    source={require('../../assets/incon_img.png')}
                    style={styles.cameraIcon}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Formulário */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#999999"
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Usuário</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu usuário"
                placeholderTextColor="#999999"
                value={usuario}
                onChangeText={setUsuario}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Bio (máx. 80 caracteres)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Digite algo para sua Bio"
                placeholderTextColor="#999999"
                multiline={true}
                numberOfLines={4}
                maxLength={80}
                textAlignVertical="top"
                value={bio}
                onChangeText={setBio}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Temas</Text>
              <TouchableOpacity style={styles.selectInput} activeOpacity={0.8}>
                <Text style={styles.selectText}>Selecione seu tema</Text>
              </TouchableOpacity>
            </View>

            {/* Botão Salvar */}
            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.8}
              onPress={lidarSalvar}
            >
              <Text style={styles.saveButtonText}>Salvar alterações</Text>
            </TouchableOpacity>
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    width: 90,
    height: 90,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E2DAEB',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#E8E1F0',
    borderRadius: 8,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4C9E0',
  },
  cameraIcon: {
    width: 14,
    height: 14,
    tintColor: '#444444',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A3A3A',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FAF8FC',
    borderWidth: 1,
    borderColor: '#E4DCED',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333333',
  },
  textArea: {
    height: 90,
  },
  selectInput: {
    backgroundColor: '#FAF8FC',
    borderWidth: 1,
    borderColor: '#E4DCED',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
    justifyContent: 'center',
  },
  selectText: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  saveButton: {
    backgroundColor: '#181122',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
