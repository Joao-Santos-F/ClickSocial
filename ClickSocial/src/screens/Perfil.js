import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ProfileHeader,
  ProfileTabs,
  GradePublicacoes,
  NavegacaoInferior,
} from '../components';

export default function Perfil({ onEditar }) {
  return (
    <LinearGradient colors={['#211C52', '#211645', '#0D0914']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ProfileHeader onEditPress={onEditar} />
          <ProfileTabs />
          <GradePublicacoes />
        </ScrollView>
        <NavegacaoInferior />
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
    paddingBottom: 80,
  },
});
