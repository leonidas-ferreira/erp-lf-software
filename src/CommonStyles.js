import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        backgroundColor: '#1C1C1C',
        padding: 30,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    headerAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    companyName: { color: '#FF8C00', fontSize: 26, fontWeight: 'bold' },
    subtitle: { color: '#FFF', fontSize: 14 },

    // ESTILOS DO CARTÃO (Onde estava dando erro)
    card: {
        backgroundColor: '#FFF',
        margin: 20,
        padding: 25,
        borderRadius: 15,
        elevation: 8
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    cardTitle: { fontSize: 16, marginLeft: 10, color: '#444', fontWeight: '600' },
    cardNumber: { fontSize: 40, fontWeight: 'bold', color: '#1C1C1C', textAlign: 'center' },

    // BOTÕES E SEÇÕES
    button: {
        backgroundColor: '#FF8C00',
        marginHorizontal: 20,
        padding: 18,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
    sectionTitle: { margin: 20, fontSize: 18, fontWeight: 'bold', color: '#1C1C1C' },

    // ITENS DA LISTA
    recentItem: {
        marginHorizontal: 20,
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderLeftWidth: 6,
        borderLeftColor: '#FF8C00',
        marginBottom: 10,
        elevation: 2
    },
    itemContent: { flexDirection: 'row', alignItems: 'center' },
    itemTitle: { fontWeight: 'bold', color: '#333', fontSize: 16 },
    itemSubtitle: { color: '#666', fontSize: 13 }
});