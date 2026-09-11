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
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

import { CriaPost } from "./CriaPost";
import setaE from "../../../assets/incon_seta-esquerda.png";
import iconLocal from "../../../assets/icon_local.png";
import iconCamera from "../../../assets/incon_camera.png";
import iconImg from "../../../assets/incon_img.png";
import defaultPreview from "../../../assets/post_preview.jpg";

export const CriarPost = ({ onVoltar, onPublicarSucesso }) => {
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);

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
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImagem({ uri: result.assets[0].uri });
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
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImagem({ uri: result.assets[0].uri });
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

  // Remover imagem
  const handleRemoveImage = () => {
    setImagem(null);
  };

  // Ação de voltar
  const handleBack = () => {
    if (onVoltar) {
      onVoltar();
    } else {
      Alert.alert("Voltar", "Deseja descartar as alterações?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Descartar",
          style: "destructive",
          onPress: () => {
            setTexto("");
            setLocalizacao(null);
          },
        },
      ]);
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

    Alert.alert(
      "Publicado com sucesso!",
      "Sua publicação foi compartilhada na ClickSocial.",
      [
        {
          text: "OK",
          onPress: () => {
            setTexto("");
            setLocalizacao(null);
            setImagem(null);
            if (onPublicarSucesso) {
              onPublicarSucesso();
            } else if (onVoltar) {
              onVoltar();
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#211645", "#181122"]}
      style={CriaPost.container}
    >
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
    </LinearGradient>
  );
};

export default CriarPost;