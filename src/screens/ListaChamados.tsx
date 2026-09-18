import React, { useState, useEffect } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';

import { buscarChamados, apagarChamado, concluirChamado } from '../services/api';

export default function ListaChamados({ navigation }: any) {
    const [chamados, setChamados] = useState<any[]>([]);
    const [busca, setBusca] = useState('');

    const carregarDados = async () => {
        const dados = await buscarChamados();
        setChamados(dados);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            carregarDados();
        });
        return unsubscribe;
    }, [navigation]);

    const formatarData = (dataString: string) => {
        if (!dataString) return "Registo recente";
        try {
            const data = new Date(dataString);
            if (isNaN(data.getTime())) return "Registo recente";
            return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        } catch {
            return "Registo recente";
        }
    };

    const gerarOS = async (chamado: any) => {
        // Link direto da sua logo hospedada
        const logoUrl = "https://i.postimg.cc/qvytWhzB/LF.png";

        const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; color: #333; }
              .header { text-align: center; border-bottom: 3px solid #F59E0B; padding-bottom: 15px; margin-bottom: 25px; }
              .logo-img { width: 150px; height: auto; margin-bottom: 5px; }
              .phone { font-size: 15px; color: #495057; font-weight: bold; margin-bottom: 15px; }
              .title { font-size: 18px; color: #7F8C8D; letter-spacing: 1px; }
              .info-box { background-color: #F8F9FA; border: 1px solid #E9ECEF; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
              .row { margin-bottom: 12px; font-size: 16px; line-height: 1.5; }
              .label { font-weight: bold; color: #2C3E50; display: inline-block; width: 120px; }
              .value { color: #495057; }
              .highlight { font-weight: bold; color: #27AE60; }
              .signature-area { margin-top: 80px; text-align: center; }
              .signature-line { border-top: 1px solid #000; width: 250px; margin: 0 auto 10px auto; }
              .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #95A5A6; }
            </style>
          </head>
          <body>
            <div class="header">
              <img src="${logoUrl}" class="logo-img" alt="LF Suporte Logo" />
              <div class="phone">WhatsApp: (91) 98949-6854</div>
              <div class="title">ORDEM DE SERVIÇO</div>
            </div>

            <div class="info-box">
              <div class="row"><span class="label">Equipamento:</span> <span class="value">${chamado.equipamento || 'Não informado'}</span></div>
              <div class="row"><span class="label">Data:</span> <span class="value">${formatarData(chamado.dataCriacao || chamado.dataAbertura)}</span></div>
              <div class="row"><span class="label">Cliente:</span> <span class="value">${chamado.cliente?.nome || 'Sem Cliente'}</span></div>
              <div class="row"><span class="label">Contato:</span> <span class="value">${chamado.cliente?.telefone || 'Sem contato'}</span></div>
            </div>

            <div class="info-box">
              <div class="row"><span class="label">Defeito:</span> <span class="value">${chamado.defeitoRelatado || 'Não informado'}</span></div>
              <div class="row"><span class="label">Solução:</span> <span class="value">${chamado.solucaoTecnica || 'A definir'}</span></div>
              <div class="row"><span class="label">Status:</span> <span class="value">${chamado.status ? chamado.status.replace('_', ' ') : 'EM ANALISE'}</span></div>
              <div class="row"><span class="label">Valor Total:</span> <span class="value highlight">R$ ${Number(chamado.valor || 0).toFixed(2)}</span></div>
            </div>

            <div class="signature-area">
              <div class="signature-line"></div>
              <p>Assinatura do Cliente</p>
            </div>

            <div class="footer">
              LF SUPORTE TECNOLOGIA E INFORMAÇÃO<br>
              Serviço com garantia e qualidade.
            </div>
          </body>
        </html>
        `;

        try {
            // 1. Gera o PDF e pede os dados diretamente na memória (base64) em vez de apenas o ficheiro
            const { base64 } = await Print.printToFileAsync({
                html,
                base64: true
            });

            // 2. Define o caminho na pasta oficial de documentos
            const caminhoSeguro = `${(FileSystem as any).documentDirectory || ''}OS_LF_Suporte_${Date.now()}.pdf`;

            // 3. Grava o ficheiro novo diretamente a partir da memória (contorna o bloqueio de leitura)
            await (FileSystem as any).writeAsStringAsync(caminhoSeguro, base64, {
                encoding: (FileSystem as any).EncodingType.Base64
            });

            // 4. Partilha o ficheiro autorizado
            await Sharing.shareAsync(caminhoSeguro, {
                dialogTitle: 'Partilhar O.S.',
                mimeType: 'application/pdf',
                UTI: 'com.adobe.pdf'
            });

        } catch (error) {
            console.error("Erro ao gerar O.S.", error);
            Alert.alert("Erro", "Não foi possível gerar o PDF.");
        }
    };

    const handleConcluir = async (chamado: any) => {
        const sucesso = await concluirChamado(chamado);
        if (sucesso) {
            setChamados(chamadosAtuais =>
                chamadosAtuais.map(item => {
                    const itemId = item.id || item._id;
                    const chamadoId = chamado.id || chamado._id;
                    return itemId === chamadoId ? { ...item, status: 'CONCLUIDO' } : item;
                })
            );
            Alert.alert("Maravilha", "Chamado marcado como CONCLUÍDO!");
        } else {
            Alert.alert("Ops", "Erro ao concluir chamado.");
        }
    };

    const handleApagar = async (idParaApagar: any) => {
        Alert.alert(
            "Apagar Chamado",
            "Tem a certeza de que deseja apagar esta ordem de serviço?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Apagar",
                    style: "destructive",
                    onPress: async () => {
                        const sucesso = await apagarChamado(idParaApagar);
                        if (sucesso) {
                            setChamados(chamadosAtuais => chamadosAtuais.filter(item => {
                                const itemId = item.id || item._id;
                                return itemId !== idParaApagar;
                            }));
                        } else {
                            Alert.alert("Ops", "Erro ao apagar chamado.");
                        }
                    }
                }
            ]
        );
    };

    const chamadosFiltrados = chamados.filter(item => {
        const textoBusca = busca.toLowerCase();
        const nomeCliente = item.cliente?.nome?.toLowerCase() || '';
        const equipamento = item.equipamento?.toLowerCase() || '';
        return nomeCliente.includes(textoBusca) || equipamento.includes(textoBusca);
    });

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.cabecalhoCard}>
                <Text style={styles.titulo}>{item.equipamento}</Text>
                <Text style={styles.dataRegistro}>
                    📅 {formatarData(item.dataCriacao || item.dataAbertura)}
                </Text>
            </View>

            <Text style={styles.texto}>👤 <Text style={styles.negrito}>Cliente:</Text> {item.cliente ? item.cliente.nome : "Sem Cliente"}</Text>

            {item.cliente && item.cliente.telefone && (
                <Text style={styles.texto}>📱 <Text style={styles.negrito}>Contacto:</Text> {item.cliente.telefone}</Text>
            )}

            <Text style={styles.defeito}>⚠️ <Text style={styles.negrito}>Defeito:</Text> {item.defeitoRelatado}</Text>

            {item.solucaoTecnica ? (
                <Text style={styles.texto}>🔧 <Text style={styles.negrito}>Solução:</Text> {item.solucaoTecnica}</Text>
            ) : null}

            {item.valor ? (
                <Text style={styles.valorTexto}>💰 <Text style={styles.negrito}>Valor:</Text> R$ {Number(item.valor).toFixed(2)}</Text>
            ) : null}

            <Text style={[styles.status, item.status === 'CONCLUIDO' && styles.statusConcluido]}>
                STATUS: {item.status ? item.status.replace('_', ' ') : 'EM ANALISE'}
            </Text>

            <View style={styles.botoesContainer}>
                {item.status !== 'CONCLUIDO' && (
                    <TouchableOpacity style={styles.botaoConcluir} onPress={() => handleConcluir(item)}>
                        <Text style={styles.textoBotaoAcao}>Concluir</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={[styles.botaoApagar, { backgroundColor: '#F59E0B' }]} onPress={() => gerarOS(item)}>
                    <Text style={styles.textoBotaoAcao}>Gerar O.S.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoApagar} onPress={() => handleApagar(item.id || item._id)}>
                    <Text style={styles.textoBotaoAcao}>Apagar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Painel de Chamados</Text>

            <TextInput
                style={styles.inputBusca}
                placeholder="🔍 Buscar por cliente ou equipamento..."
                value={busca}
                onChangeText={setBusca}
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.botaoNovo} onPress={() => navigation.navigate('NovoChamado')}>
                <Text style={styles.textoBotao}>+ NOVO CHAMADO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoCliente} onPress={() => navigation.navigate('NovoCliente')}>
                <Text style={styles.textoBotao}>+ NOVO CLIENTE</Text>
            </TouchableOpacity>

            <FlatList
                data={chamadosFiltrados}
                keyExtractor={(item, index) => String(item.id || item._id || index)}
                renderItem={renderItem}
                contentContainerStyle={styles.lista}
                onRefresh={carregarDados}
                refreshing={false}
                ListEmptyComponent={<Text style={styles.textoVazio}>Nenhum chamado encontrado.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F4F8', paddingTop: 40 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: 15 },
    inputBusca: { backgroundColor: '#FFF', marginHorizontal: 20, marginBottom: 15, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CCC', fontSize: 16, color: '#333' },
    botaoNovo: { backgroundColor: '#F29924', marginHorizontal: 20, padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10, elevation: 3 },
    botaoCliente: { backgroundColor: '#333333', marginHorizontal: 20, padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20, elevation: 3 },
    textoBotao: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    lista: { paddingHorizontal: 20, paddingBottom: 20 },
    textoVazio: { textAlign: 'center', color: '#777', fontStyle: 'italic', marginTop: 20 },
    card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#333', elevation: 2 },
    cabecalhoCard: { borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 8, marginBottom: 8 },
    titulo: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
    dataRegistro: { fontSize: 12, color: '#777', marginTop: 4 },
    texto: { fontSize: 14, color: '#444', marginBottom: 4 },
    negrito: { fontWeight: 'bold', color: '#222' },
    defeito: { fontSize: 14, color: '#D9534F', marginBottom: 4 },
    valorTexto: { fontSize: 14, color: '#28A745', marginBottom: 4, fontWeight: 'bold' },
    status: { fontSize: 13, fontWeight: 'bold', color: '#F29924', marginTop: 6 },
    statusConcluido: { color: '#28A745' },
    botoesContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12, gap: 10 },
    botaoConcluir: { backgroundColor: '#28A745', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5 },
    botaoApagar: { backgroundColor: '#D9534F', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5 },
    textoBotaoAcao: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});