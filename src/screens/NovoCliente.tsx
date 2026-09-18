import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { cadastrarCliente } from '../services/api';

export default function NovoCliente({ navigation }: any) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleCadastrar = async () => {
        if (!nome || !email || !telefone) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        const sucesso = await cadastrarCliente({ nome, email, telefone });
        if (sucesso) {
            // O alerta agora tem um botão OK que direciona para a tela principal
            Alert.alert(
                "Sucesso",
                "Cliente cadastrado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('ListaChamados')
                    }
                ]
            );
        } else {
            Alert.alert("Ops", "Erro ao cadastrar o cliente. Verifique a conexão.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome Completo:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Ex: João da Silva"
            />

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Ex: joao@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Telefone / WhatsApp:</Text>
            <TextInput
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                placeholder="Ex: 91900000000"
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
                <Text style={styles.textoBotao}>SALVAR CLIENTE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F4F8',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    botao: {
        backgroundColor: '#F29924',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
        elevation: 3,
    },
    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});