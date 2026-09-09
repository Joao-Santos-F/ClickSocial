import { StyleSheet } from "react-native";

export const NotificationsScreenStyle = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#4C3B5A',
        backgroundImage: 'linear-gradient(to bottom, #6E5F6B, #4C3B5A)', 
    },
    caixaTextos: {
        width: "80%",
        justifyContent: "center"
    },
    Text: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 40,
        color: '#000000',
        paddingTop: 16,
        paddingBottom: 24,
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    scrollContent: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingBottom: 16,
    },
    section_card: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 24,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEF',
    },
    section_card2: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 24,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEF',
    },
    section_card3: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 24,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEF',
    },
    section_card4: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 24,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: '#EBEBEF',
    },
    section__texto3: {
        fontWeight: '700',
        fontSize: 15,
        color: 'black',
        lineHeight: 20,
    },
    info_row: {
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
    },
    info_icon: {
        width: 36,
        height: 36,
        marginRight: 20,
        resizeMode: 'contain',
    },
    info_text2: {
        fontSize: 13,
        color: '#8A8A8F',
        marginTop: 4,
    },
    info_text3: {
        fontSize: 13,
        color: '#8A8A8F',
    },
    Data_Hora: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
});
