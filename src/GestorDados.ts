// @ts-ignore
import db from './DatabaseInstance';
import { Chamado } from './Chamado';

// Comandos SQL conforme o Modelo Relacional
const sqlCreate = 'CREATE TABLE IF NOT EXISTS CHAMADOS (ID TEXT PRIMARY KEY, CLIENTE TEXT, EQUIPAMENTO TEXT)';
const sqlInsert = 'INSERT INTO CHAMADOS (ID, CLIENTE, EQUIPAMENTO) VALUES (?,?,?)';
const sqlDelete = 'DELETE FROM CHAMADOS WHERE ID=?';
const sqlSelect = 'SELECT * FROM CHAMADOS';

class GestorDados {
    constructor() {
        this.criarBanco();
    }

    // Cria a tabela no banco de dados se não existir
    private criarBanco() {
        try {
            // No op-sqlite, o execute é síncrono, não precisa de await
            (db as any).execute(sqlCreate);
            console.log("Banco LF SUPORTE: Pronto.");
        } catch (e) {
            console.log("Erro ao criar tabela:", e);
        }
    }

    // Adiciona uma nova tupla (linha) ao banco
    public adicionar(c: Chamado) {
        try {
            (db as any).execute(sqlInsert, [c.id, c.cliente, c.equipamento]);
        } catch (e) {
            console.log("Erro ao inserir chamado:", e);
        }
    }

    // Remove uma tupla baseada na Chave Primária (ID)
    public remover(id: string) {
        try {
            (db as any).execute(sqlDelete, [id]);
        } catch (e) {
            console.log("Erro ao remover chamado:", e);
        }
    }

    // Recupera todos os registros e converte em objetos para a Home
    public obterTodos(useRetorno: (lista: Chamado[]) => void) {
        try {
            // IMPORTANTE: Sem 'await' aqui. O resultado vem direto.
            const result: any = (db as any).execute(sqlSelect);
            let objetos: Chamado[] = [];

            // Mapeamento Objeto-Relacional
            if (result && result.rows && result.rows._array) {
                const dados = result.rows._array;
                for (let i = 0; i < dados.length; i++) {
                    let linha = dados[i];
                    // Criamos o objeto Chamado com os dados da tupla
                    // O banco devolve nomes em maiúsculas: ID, CLIENTE, EQUIPAMENTO
                    objetos.push(new Chamado(linha.ID, linha.CLIENTE, linha.EQUIPAMENTO));
                }
            }

            // Retorna a lista para a Home atualizar a tela
            useRetorno(objetos);

        } catch (e) {
            console.log("Erro ao buscar dados no SQLite:", e);
            useRetorno([]); // Retorna vazio em caso de erro para não travar o app
        }
    }
}

// Exporta uma única instância do gestor (Singleton)
export default new GestorDados();