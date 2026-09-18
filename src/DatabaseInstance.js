import { open } from '@op-engineering/op-sqlite';

// Criando a instância do banco de dados
const db = open({ name: 'LF_Suporte.db' });

// Log para confirmar que o objeto foi instanciado no JS
console.log("-----------------------------------------");
console.log("SISTEMA: Inicializando Banco de Dados...");
console.log("STATUS: Objeto DB criado com sucesso!", db);
console.log("-----------------------------------------");

export default db;