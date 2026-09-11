import React from 'react';
import { StatusBar } from 'react-native';
import EditarPerfil from './screens/EditarPerfil';
// Para exibir a tela de Comentários de forma independente, descomente a linha abaixo:
// import Comentario from './screens/Comentario';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#211C52" />
      <EditarPerfil />
      {/* <Comentario /> */}
    </>
  );
}
