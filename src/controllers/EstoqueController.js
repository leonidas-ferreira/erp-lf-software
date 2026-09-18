import * as Crypto from 'expo-crypto';
import { Alert } from 'react-native';

export class EstoqueController {
    async cadastrarProduto(nome, quantidade) {
        try {
            if (!nome || !quantidade) {
                Alert.alert("Erro", "Preencha todos os campos!");
                return null;
            }

            // GERAÇÃO DO HASH (Requisito Técnico Tema 6)
            const dadosParaHash = `PRODUTO:${nome.toUpperCase()}|QTD:${quantidade}|LOJA:SABOR_REAL`;

            const hashGerado = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                dadosParaHash
            );

            // LOG PARA EVIDÊNCIA (VS Code Terminal)
            console.log("=========================================");
            console.log("      EVIDÊNCIA TEMA 6: HASH GERADO      ");
            console.log(`Hash: ${hashGerado}`);
            console.log("=========================================");

            // ALERTA PARA EVIDÊNCIA (Print do Telemóvel)
            Alert.alert(
                "Segurança Confirmada (Tema 6)",
                `Produto: ${nome}\n\nAssinatura Digital (SHA-256):\n${hashGerado.substring(0, 32)}...`,
                [{ text: "OK" }]
            );

            return hashGerado;

        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Falha na criptografia dos dados.");
            return null;
        }
    }
}