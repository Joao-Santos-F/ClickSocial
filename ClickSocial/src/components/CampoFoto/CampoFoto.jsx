import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../../styles/theme";

export function CampoFoto({ rotulo = "Foto de Perfil", textoAjuda = "Insira sua Foto", aoSelecionarFoto }) {
  const [imagemUri, setImagemUri] = useState(null);

  const escolherImagem = async () => {
    const permissaoResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissaoResult.granted) {
      Alert.alert("Permissão necessária", "É necessário permitir o acesso à galeria de fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImagemUri(uri);
      if (aoSelecionarFoto) {
        aoSelecionarFoto(uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      {rotulo && <Text style={styles.rotulo}>{rotulo}</Text>}
      <TouchableOpacity style={styles.campo} onPress={escolherImagem} activeOpacity={0.8}>
        {imagemUri ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imagemUri }} style={styles.previewFoto} />
            <Text style={styles.textoPreview}>Alterar foto</Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>{textoAjuda}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: theme.spacing.md,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  campo: {
    width: "100%",
    height: 48,
    backgroundColor: theme.colors.inputBackground,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    fontSize: 14,
    color: theme.colors.inputPlaceholder,
  },
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewFoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  textoPreview: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
});
