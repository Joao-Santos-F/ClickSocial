import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Perfil, EditarPerfil, Comentario } from './screens';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('perfil');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#211C52" />
      
      {telaAtual === 'perfil' && (
        <Perfil onEditar={() => setTelaAtual('editarPerfil')} />
      )}
      
      {telaAtual === 'editarPerfil' && (
        <EditarPerfil onBack={() => setTelaAtual('perfil')} />
      )}
      
      {telaAtual === 'comentario' && (
        <Comentario onBack={() => setTelaAtual('perfil')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0914',
  },
});
