// src/models/Produto.ts

export interface Produto {
    id?: string;        // O ID que o MongoDB gera automaticamente
    nome: string;      // Nome do item (que será criptografado no Controller)
    quantidade: number; // Quantidade em estoque
    dataCriacao?: Date; // Opcional: data de registro
}

// Se estiver usando JavaScript puro, você pode apenas exportar um objeto de exemplo:
// const ProdutoExemplo = { nome: '', quantidade: 0 };