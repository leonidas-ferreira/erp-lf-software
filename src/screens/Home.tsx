import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// Importando a instância 'api' configurada acima
import api from '../services/api';

export default function Home() {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleSalvarRemoto = async () => {
    // Validação de segurança
    if (!codigo || !nome || !quantidade) {
      Alert.alert('Aviso', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const produto = {
        codigo: Number(codigo),
        nome: nome,
        quantidade: Number(quantidade)
      };

      // Executa o POST para a rota definida no seu index.js
      const response = await api.post('/produto/new', produto);

      // Verifica se o servidor retornou sucesso (200 ou 201)
      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso!', 'Produto salvo no MongoDB com sucesso.');
        // Limpa os campos para o próximo cadastro
        setCodigo('');
        setNome('');
        setQuantidade('');
      }
    } catch (err: any) {
      console.log("Erro de conexão:", err.message);
      Alert.alert(
        'Erro de Conexão',
        'Não foi possível alcançar o servidor. Verifique o ngrok e o terminal do Node.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>📦 Cadastro LF SUPORTE</Text>

          <TextInput
            style={styles.input}
            placeholder="Código"
            value={codigo}
            onChangeText={setCodigo}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Nome do Produto"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleSalvarRemoto}>
            <Text style={styles.buttonText}>CADASTRAR NO SERVIDOR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    color: '#000'
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});