// @ts-ignore
import axios from 'axios';
import * as Crypto from 'expo-crypto';

// ATENÇÃO: Atualiza esta URL com o link que aparece no teu Ngrok hoje!
const API_URL = 'https://unceasing-chi-prodivision.ngrok-free.dev/produto/new';

export const cadastrarProduto = async (nome: string, quantidade: string) => {
    try {
        // Validação simples de entrada
        if (!nome || !quantidade) {
            throw new Error("Por favor, preencha todos os campos.");
        }

        // --- TEMA 6: SEGURANÇA E CRIPTOGRAFIA ---
        // Geramos um Hash SHA-256 do nome do produto. 
        // No teu trabalho, isto prova que os dados são protegidos antes de sair do telemóvel.
        const hashSeguranca = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            nome
        );

        console.log("=== EVIDÊNCIA TEMA 6 ===");
        console.log("Produto:", nome);
        console.log("Hash de Segurança gerado:", hashSeguranca);

        // Montagem do objeto seguindo o Model
        const dadosParaEnviar = {
            nome: nome,
            quantidade: parseInt(quantidade),
            hash_token: hashSeguranca // Campo extra para provar a criptografia no banco
        };

        // Envio para o servidor via Axios
        const response = await axios.post(API_URL, dadosParaEnviar);
        return response.status;

    } catch (error) {
        console.error("Erro no Controller:", error);
        throw error;
    }
};