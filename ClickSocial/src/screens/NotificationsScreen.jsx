import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { NotificationsScreenStyle } from '../styles/NotificationScreenStyle';

export default function NotificationsScreen() {
    return (
        <View style={NotificationsScreenStyle.Container}>

            <Text style={NotificationsScreenStyle.Text}>Notificações</Text>
            
            <ScrollView contentContainerStyle={NotificationsScreenStyle.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Notificacao 1 */}
                <View style={NotificationsScreenStyle.section_card}>
                    <View style={NotificationsScreenStyle.info_row}>
                        <Image
                            style={NotificationsScreenStyle.info_icon}
                            source={require("../../assets/incon_coracao.png")}
                        />
                        <View style={NotificationsScreenStyle.caixaTextos}>
                            <Text style={NotificationsScreenStyle.section__texto3}>
                                Arthurbr-YT Curitiu sua publicação
                            </Text>
                            <View style={NotificationsScreenStyle.Data_Hora}>
                                <Text style={NotificationsScreenStyle.info_text2}>
                                    10:38
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Notificacao 2 */}
                <View style={NotificationsScreenStyle.section_card2}>
                    <View style={NotificationsScreenStyle.info_row}>
                        <Image
                            style={NotificationsScreenStyle.info_icon}
                            source={require("../../assets/incon_notificacao.png")}
                        />
                        <View style={NotificationsScreenStyle.caixaTextos}>
                            <Text style={NotificationsScreenStyle.section__texto3}>
                                Arthurbr-YT Comentou em sua publicação
                            </Text>
                            <View style={NotificationsScreenStyle.Data_Hora}>
                                <Text style={NotificationsScreenStyle.info_text2}>
                                    10:37
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Notificacao 3 */}
                <View style={NotificationsScreenStyle.section_card3}>
                    <View style={NotificationsScreenStyle.info_row}>
                        <Image
                            style={NotificationsScreenStyle.info_icon}
                            source={require("../../assets/incon_seguidor.png")}
                        />
                        <View style={NotificationsScreenStyle.caixaTextos}>
                            <Text style={NotificationsScreenStyle.section__texto3}>
                                Arthurbr-YT Começou a te seguir
                            </Text>
                            <View style={NotificationsScreenStyle.Data_Hora}>
                                <Text style={NotificationsScreenStyle.info_text2}>
                                    10:36
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Notificacao  */}
                <View style={NotificationsScreenStyle.section_card4}>
                    <View style={NotificationsScreenStyle.info_row}>
                        <Image
                            style={NotificationsScreenStyle.info_icon}
                            source={require("../../assets/incon_coracao.png")}
                        />
                        <View style={NotificationsScreenStyle.caixaTextos}>
                            <Text style={NotificationsScreenStyle.section__texto3}>
                                Cauhê S. Curitiu sua publicação
                            </Text>
                            <View style={NotificationsScreenStyle.Data_Hora}>
                                <Text style={NotificationsScreenStyle.info_text2}>
                                    10:38
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={NotificationsScreenStyle.section_card4}>
                    <View style={NotificationsScreenStyle.info_row}>
                        <Image
                            style={NotificationsScreenStyle.info_icon}
                            source={require("../../assets/incon_seguidor.png")}
                        />
                        <View style={NotificationsScreenStyle.caixaTextos}>
                            <Text style={NotificationsScreenStyle.section__texto3}>
                                Cauhê S. Começou a te seguir
                            </Text>
                            <View style={NotificationsScreenStyle.Data_Hora}>
                                <Text style={NotificationsScreenStyle.info_text2}>
                                    10:36
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        
        </View>
    );
}
