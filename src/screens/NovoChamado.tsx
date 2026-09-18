import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

import { criarChamado, buscarClientes } from '../services/api';

export default function NovoChamado({ navigation }: any) {
    const [equipamento, setEquipamento] = useState('');
    const [defeito, setDefeito] = useState('');
    const [valor, setValor] = useState('');
    const [solucao, setSolucao] = useState('');

    const [clientes, setClientes] = useState<any[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState<string | null>(null);

    useEffect(() => {
        const carregarClientes = async () => {
            const dados = await buscarClientes();
            setClientes(dados);
        };
        carregarClientes();
    }, []);

    const handleCadastrar = async () => {
        if (!equipamento || !defeito || !clienteSelecionado) {
            Alert.alert("Atenção", "Preencha o equipamento, defeito e selecione um cliente!");
            return;
        }

        const sucesso = await criarChamado(equipamento, defeito, clienteSelecionado, valor, solucao);
        if (sucesso) {
            // Navegação segura após o clique no botão OK
            Alert.alert(
                "Sucesso",
                "Chamado aberto com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('ListaChamados')
                    }
                ]
            );
        } else {
            Alert.alert("Ops", "Erro ao cadastrar chamado. Tente novamente.");
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 60 }} // Garante que a tela rola até o fundo
            keyboardShouldPersistTaps="handled" // Fecha o teclado ao clicar fora
        >
            <Text style={styles.label}>Equipamento:</Text>
            <TextInput
                style={styles.input}
                value={equipamento}
                onChangeText={setEquipamento}
                placeholder="Ex: Notebook Lenovo Ideapad"
            />

            <Text style={styles.label}>Defeito Relatado:</Text>
            <TextInput
                style={[styles.input, { height: 70 }]}
                value={defeito}
                onChangeText={setDefeito}
                placeholder="Ex: Não liga após queda de energia"
                multiline
            />

            <Text style={styles.label}>Valor do Serviço (R$) [Opcional]:</Text>
            <TextInput
                style={styles.input}
                value={valor}
                onChangeText={setValor}
                placeholder="Ex: 150.00"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Solução / Observação [Opcional]:</Text>
            <TextInput
                style={[styles.input, { height: 70 }]}
                value={solucao}
                onChangeText={setSolucao}
                placeholder="Ex: Troca de regulador de tensão ou limpeza"
                multiline
            />

            <Text style={styles.label}>Selecione o Dono do Equipamento:</Text>

            {clientes.length === 0 ? (
                <Text style={styles.textoVazio}>Nenhum cliente registado. Cadastre um cliente primeiro.</Text>
            ) : (
                clientes.map((cliente) => (
                    <TouchableOpacity
                        key={cliente.id}
                        style={[
                            styles.cartaoCliente,
                            clienteSelecionado === cliente.id && styles.cartaoClienteSelecionado
                        ]}
                        onPress={() => setClienteSelecionado(cliente.id)}
                    >
                        <Text style={[
                            styles.textoCliente,
                            clienteSelecionado === cliente.id && styles.textoClienteSelecionado
                        ]}>
                            {cliente.nome} {cliente.telefone ? `(${cliente.telefone})` : ''}
                        </Text>
                    </TouchableOpacity>
                ))
            )}

            <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
                <Text style={styles.textoBotao}>SALVAR CHAMADO</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F4F8',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        textAlignVertical: 'top',
    },
    cartaoCliente: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCC',
        marginBottom: 8,
    },
    cartaoClienteSelecionado: {
        backgroundColor: '#F29924',
        borderColor: '#F29924',
    },
    textoCliente: {
        fontSize: 15,
        color: '#333',
    },
    textoClienteSelecionado: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    textoVazio: {
        fontStyle: 'italic',
        color: '#777',
        marginTop: 5,
        marginBottom: 15,
    },
    botao: {
        backgroundColor: '#F29924',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        elevation: 3,
    },
    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});