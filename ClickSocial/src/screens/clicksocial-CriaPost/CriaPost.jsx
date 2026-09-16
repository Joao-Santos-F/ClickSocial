import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

import { CriaPost } from "./CriaPost.js";
import setaE from "../../../assets/incon_seta-esquerda.png";
import iconLocal from "../../../assets/icon_local.png";
import iconCamera from "../../../assets/incon_camera.png";
import iconImg from "../../../assets/incon_img.png";

const TAGS_SUGERIDAS = ["#ClickSocial", "#Tech", "#Fotografia", "#EstradaCataPreta", "#Ideias"];

export const CriarPost = ({ onVoltar, onPublicarSucesso, dadosPerfil }) => {
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);
  const [tagsSelecionadas, setTagsSelecionadas] = useState(["#ClickSocial"]);
  const [inputTag, setInputTag] = useState("");

  // Selecionar imagem da galeria
  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de acesso às suas fotos para você escolher uma imagem."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
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

        if (uriPermanente && uriPermanente.startsWith("blob:")) {
          try {
            const resp = await fetch(uriPermanente);
            const blob = await resp.blob();
            uriPermanente = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (reader.result && typeof reader.result === "string") {
                  resolve(reader.result);
                } else {
                  resolve(uriPermanente);
                }
              };
              reader.onerror = () => resolve(uriPermanente);
              reader.readAsDataURL(blob);
            });
          } catch (e) {}
        }
        setImagem({ uri: uriPermanente });
      }
    } catch (error) {
      console.log("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível abrir a galeria.");
    }
  };

  // Abrir câmera
  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de acesso à câmera para você tirar uma foto."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
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

        if (uriPermanente && uriPermanente.startsWith("blob:")) {
          try {
            const resp = await fetch(uriPermanente);
            const blob = await resp.blob();
            uriPermanente = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (reader.result && typeof reader.result === "string") {
                  resolve(reader.result);
                } else {
                  resolve(uriPermanente);
                }
              };
              reader.onerror = () => resolve(uriPermanente);
              reader.readAsDataURL(blob);
            });
          } catch (e) {}
        }
        setImagem({ uri: uriPermanente });
      }
    } catch (error) {
      console.log("Erro ao abrir câmera:", error);
      Alert.alert("Erro", "Não foi possível abrir a câmera.");
    }
  };

  // Alternar localização
  const handleToggleLocalizacao = () => {
    if (localizacao) {
      setLocalizacao(null);
    } else {
      setLocalizacao("São Paulo, SP");
    }
  };

  // Alternar tag
  const handleToggleTag = (tag) => {
    if (tagsSelecionadas.includes(tag)) {
      setTagsSelecionadas(tagsSelecionadas.filter((t) => t !== tag));
    } else {
      setTagsSelecionadas([...tagsSelecionadas, tag]);
    }
  };

  const handleAdicionarTagCustom = () => {
    if (!inputTag.trim()) return;
    const tagFormatada = inputTag.startsWith("#") ? inputTag.trim() : `#${inputTag.trim()}`;
    if (!tagsSelecionadas.includes(tagFormatada)) {
      setTagsSelecionadas([...tagsSelecionadas, tagFormatada]);
    }
    setInputTag("");
  };

  // Remover imagem
  const handleRemoveImage = () => {
    setImagem(null);
  };

  // Ação de voltar
  const handleBack = () => {
    if (onVoltar) {
      onVoltar();
    } else {
      setTexto("");
      setLocalizacao(null);
    }
  };

  // Enviar publicação
  const handleEnviar = () => {
    if (!texto.trim() && !imagem) {
      Alert.alert(
        "Publicação vazia",
        "Por favor, escreva uma mensagem ou selecione uma imagem para publicar."
      );
      return;
    }

    const avatarPostAtual =
      (dadosPerfil?.fotoUri ? { uri: dadosPerfil.fotoUri } : null) ||
      dadosPerfil?.imagemPerfil ||
      require("../../../assets/WhatsApp Image 2026-08-25 at 11.25.57 2.png");

    const novoPost = {
      id: String(Date.now()),
      user: dadosPerfil?.nome || dadosPerfil?.usuario || "Arthurbr-YT",
      time: "Agora",
      text: texto.trim(),
      accent: "#5ef9d6",
      avatar: avatarPostAtual,
      image: imagem ? imagem.uri : null,
      localizacao: localizacao || null,
      curtidas: 0,
      curtido: false,
      comentariosCount: 0,
      comentarios: [],
      republicado: false,
      tags: tagsSelecionadas,
    };

    setTexto("");
    setLocalizacao(null);
    setImagem(null);
    setTagsSelecionadas(["#ClickSocial"]);

    // Executa a publicação diretamente e retorna ao feed
    if (onPublicarSucesso) {
      onPublicarSucesso(novoPost);
    } else if (onVoltar) {
      onVoltar();
    }
  };

  return (
    <LinearGradient
      colors={["#211645", "#181122"]}
      style={CriaPost.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={CriaPost.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={CriaPost.Card}>
              {/* Cabeçalho */}
              <View style={CriaPost.header}>
                <TouchableOpacity
                  onPress={handleBack}
                  style={CriaPost.headerIconBtn}
                  activeOpacity={0.7}
                >
                  <Image source={setaE} style={CriaPost.headerIcon} />
                </TouchableOpacity>
                <Text style={CriaPost.headerTitle}>Nova Publicação</Text>
                <View style={CriaPost.headerPlaceholder} />
              </View>

              {/* Label e Input do Post */}
              <Text style={CriaPost.label}>O que você está pensando</Text>
              <TextInput
                style={CriaPost.textArea}
                placeholder="Digite o que deseja..."
                placeholderTextColor="#9E9BA7"
                multiline
                value={texto}
                onChangeText={setTexto}
              />

              {/* Tag de Localização (se ativa) */}
              {localizacao && (
                <TouchableOpacity
                  style={CriaPost.locationBadge}
                  onPress={handleToggleLocalizacao}
                  activeOpacity={0.8}
                >
                  <Text style={CriaPost.locationText}>📍 {localizacao}</Text>
                  <Text style={CriaPost.locationRemove}>✕</Text>
                </TouchableOpacity>
              )}

              {/* Ícones de ação */}
              <View style={CriaPost.iconsRow}>
                <TouchableOpacity
                  style={CriaPost.actionIconBtn}
                  onPress={handleToggleLocalizacao}
                  activeOpacity={0.7}
                >
                  <Image source={iconLocal} style={CriaPost.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={CriaPost.actionIconBtn}
                  onPress={handleTakePhoto}
                  activeOpacity={0.7}
                >
                  <Image source={iconCamera} style={CriaPost.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={CriaPost.actionIconBtn}
                  onPress={handlePickImage}
                  activeOpacity={0.7}
                >
                  <Image source={iconImg} style={CriaPost.actionIcon} />
                </TouchableOpacity>
              </View>

              {/* Seção Imagem */}
              <Text style={CriaPost.imageLabel}>Imagem</Text>
              <TouchableOpacity
                style={CriaPost.imagePreviewContainer}
                onPress={handlePickImage}
                activeOpacity={0.9}
              >
                {imagem ? (
                  <>
                    <Image
                      source={imagem}
                      style={CriaPost.imagePreview}
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      style={CriaPost.removeImageBtn}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={CriaPost.removeImageText}>✕</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={CriaPost.emptyPreviewText}>
                    selecione uma imagem
                  </Text>
                )}
              </TouchableOpacity>

              {/* Botão Enviar */}
              <TouchableOpacity
                style={CriaPost.sendButton}
                onPress={handleEnviar}
                activeOpacity={0.85}
              >
                <Text style={CriaPost.sendButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CriarPost;