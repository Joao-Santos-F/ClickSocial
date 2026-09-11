import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { DetalhesPost, Comentario } from './screens';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('publicacao');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#211645" />
      
      {telaAtual === 'publicacao' && (
        <DetalhesPost
          onVoltar={() => console.log('Voltar')}
          onVerComentarios={() => setTelaAtual('comentario')}
        />
      )}

      {telaAtual === 'comentario' && (
        <Comentario onBack={() => setTelaAtual('publicacao')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181122',
  },
});
