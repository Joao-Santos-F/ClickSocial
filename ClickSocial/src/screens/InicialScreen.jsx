import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { InicialScreenStyle } from '../styles/InicialScreenStyle';

export default function InicialScreen({ aoNavegarLogin, aoNavegarCadastro, onLogin, onCadastro }) {
    const lidarLogin = aoNavegarLogin || onLogin;
    const lidarCadastro = aoNavegarCadastro || onCadastro;

    return (
        <View style={InicialScreenStyle.Container}>
            <View style={{ flex: 1 }} />
            <View style={InicialScreenStyle.card_central}>
                <Image 
                    style={InicialScreenStyle.logo_icon}
                    source={require("../../assets/incon_logo.png")} 
                />

                <Text style={InicialScreenStyle.title}>ClickSocial</Text>

                <Text style={InicialScreenStyle.subtitle}>
                    Conecte-se com pessoas e compartilhe momentos
                </Text>

                <TouchableOpacity style={InicialScreenStyle.btn_entrar} onPress={lidarLogin}>
                    <Text style={InicialScreenStyle.text_btn_entrar}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={InicialScreenStyle.btn_criar_conta} onPress={lidarCadastro}>
                    <Text style={InicialScreenStyle.text_btn_criar_conta}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }} />
        </View>
    );
}
