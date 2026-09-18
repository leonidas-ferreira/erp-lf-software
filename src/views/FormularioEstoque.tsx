import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { enviarProdutoCriptografado } from '../controllers/EstoqueController';

const FormularioEstoque = () => {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const handleSalvar = async () => {
        const produto = { nome, quantidade };

        // A View chama o Controller, que faz a criptografia e o envio
        try {
            await enviarProdutoCriptografado(produto);
            Alert.alert("Sucesso", "Produto salvo com criptografia!");
        } catch (error) {
            Alert.alert("Erro", "Falha ao enviar dados.");
        }
    };

    return (
        <View>
            <TextInput placeholder="Nome do Produto" onChangeText={setNome} />
            <TextInput placeholder="Quantidade" onChangeText={setQuantidade} keyboardType="numeric" />
            <Button title="Salvar no Estoque" onPress={handleSalvar} />
        </View>
    );
};

export default FormularioEstoque;