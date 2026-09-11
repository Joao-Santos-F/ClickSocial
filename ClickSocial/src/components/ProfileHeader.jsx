import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { theme } from "../styles/theme";
import {
  IconeSetaVoltar,
  IconeVerificado,
  IconeDestaque,
  MascoteVerde,
} from "./IconesSvg";

const DESTAQUES = [
  { id: "1", rotulo: "Highlights 1" },
  { id: "2", rotulo: "Highlights 2" },
  { id: "3", rotulo: "Highlights 3" },
  { id: "4", rotulo: "Highlights 4" },
  { id: "5", rotulo: "Highlights 5" },
];

export function ProfileHeader({ onEditPress, onVoltarPress, dadosPerfil }) {
  const [bio, setBio] = useState(dadosPerfil?.bio || "");
  const [estaEditando, setEstaEditando] = useState(false);

  React.useEffect(() => {
    if (dadosPerfil?.bio !== undefined) {
      setBio(dadosPerfil.bio);
    }
  }, [dadosPerfil?.bio]);

  const lidarComVoltar = () => {
    if (onVoltarPress) {
      onVoltarPress();
    } else {
      Alert.alert("Navegação", "Retornar para a tela anterior.");
    }
  };

  const lidarComEditar = () => {
    if (onEditPress) {
      onEditPress();
    } else {
      setEstaEditando(!estaEditando);
    }
  };

  const lidarComArquivados = () => {
    Alert.alert("Arquivados", "Acessando publicações arquivadas.");
  };

  const lidarComDestaque = (id) => {
    Alert.alert("Destaque", `Abrindo story em destaque #${id}`);
  };

  const lidarComAvatar = () => {
    Alert.alert("Foto de Perfil", "Opção de trocar imagem de perfil (Demonstração).");
  };

  return (
    <View style={styles.cartao}>
      {/* Linha superior: Avatar + Info + Botão Voltar */}
      <View style={styles.linhaTopoContainer}>
        {/* Avatar Circular Interativo com borda */}
        <TouchableOpacity
          onPress={lidarComAvatar}
          activeOpacity={0.8}
          style={styles.avatarWrapper}
        >
          <MascoteVerde tamanho={72} />
        </TouchableOpacity>

        {/* Informações: Nome + Badge + Estatísticas */}
        <View style={styles.infoContainer}>
          <View style={styles.linhaNome}>
            <Text style={styles.nomeTexto}>
              {dadosPerfil?.nome || dadosPerfil?.usuario || "Arthurbr-YT"}
            </Text>
            <View style={styles.badgeContainer}>
              <IconeVerificado tamanho={18} cor="#110D20" />
            </View>
          </View>

          {/* Estatísticas com sublinhado/linha */}
          <View style={styles.estatisticasContainer}>
            <TouchableOpacity activeOpacity={0.7} style={styles.estatisticaItem}>
              <Text style={styles.estatisticaNumero}>69</Text>
              <Text style={styles.estatisticaRotulo}>Post</Text>
              <View style={styles.linhaSublinhada} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.estatisticaItem}>
              <Text style={styles.estatisticaNumero}>26,2K</Text>
              <Text style={styles.estatisticaRotulo}>Seguidores</Text>
              <View style={styles.linhaSublinhada} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.estatisticaItem}>
              <Text style={styles.estatisticaNumero}>17</Text>
              <Text style={styles.estatisticaRotulo}>Seguindo</Text>
              <View style={styles.linhaSublinhada} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão voltar */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          activeOpacity={0.6}
          onPress={lidarComVoltar}
        >
          <IconeSetaVoltar tamanho={22} cor={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Caixa de Bio / Descrição Digitável */}
      <View style={styles.bioContainer}>
        <TextInput
          style={styles.bioInput}
          placeholder="Escreva sua bio aqui..."
          placeholderTextColor={theme.colors.inputPlaceholder}
          value={bio}
          onChangeText={setBio}
          maxLength={100}
          autoCapitalize="sentences"
          autoCorrect={false}
        />
      </View>

      {/* Botões de Ação: Editar e Arquivados */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botaoAcao, estaEditando && styles.botaoAcaoAtivo]}
          activeOpacity={0.7}
          onPress={lidarComEditar}
        >
          <Text style={[styles.botaoAcaoTexto, estaEditando && styles.botaoAcaoTextoAtivo]}>
            {estaEditando ? "Concluir" : "Editar"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoAcao}
          activeOpacity={0.7}
          onPress={lidarComArquivados}
        >
          <Text style={styles.botaoAcaoTexto}>Arquivados</Text>
        </TouchableOpacity>
      </View>

      {/* 5 Círculos de Destaques Interativos */}
      <View style={styles.destaquesContainer}>
        {DESTAQUES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.destaqueCirculo}
            activeOpacity={0.7}
            onPress={() => lidarComDestaque(item.id)}
          >
            <IconeDestaque tamanho={30} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.card,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    marginHorizontal: theme.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  linhaTopoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: theme.colors.iconPrimary,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  linhaNome: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  nomeTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  badgeContainer: {
    marginLeft: 4,
  },
  estatisticasContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  estatisticaItem: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
    position: "relative",
    paddingBottom: 2,
  },
  linhaSublinhada: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: theme.colors.textPrimary,
  },
  estatisticaNumero: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  estatisticaRotulo: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  botaoVoltar: {
    padding: 6,
    marginLeft: 4,
    alignSelf: "flex-start",
  },
  bioContainer: {
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.small,
    height: 38,
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.inputBackground,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  bioInput: {
    fontSize: 13,
    color: theme.colors.textPrimary,
    padding: 0,
    margin: 0,
  },
  botoesContainer: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  botaoAcao: {
    flex: 1,
    height: 34,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.small,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.cardBackground,
  },
  botaoAcaoAtivo: {
    backgroundColor: theme.colors.buttonPrimary,
    borderColor: theme.colors.buttonPrimary,
  },
  botaoAcaoTexto: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.textSecondary,
  },
  botaoAcaoTextoAtivo: {
    color: theme.colors.buttonPrimaryText,
    fontWeight: "700",
  },
  destaquesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.md,
    paddingHorizontal: 2,
  },
  destaqueCirculo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0D0914",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
