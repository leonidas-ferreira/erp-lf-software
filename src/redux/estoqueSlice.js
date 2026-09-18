import { createSlice } from '@reduxjs/toolkit';

const estoqueSlice = createSlice({
    name: 'estoque',
    initialState: {
        itens: []
    },
    reducers: {
        // Ação para adicionar um novo produto vindo do formulário
        adicionarAoEstoque: (state, action) => {
            state.itens.push(action.payload);
        },
        // Ação para carregar a lista completa vinda do MongoDB
        definirEstoque: (state, action) => {
            state.itens = action.payload;
        }
    },
});

export const { adicionarAoEstoque, definirEstoque } = estoqueSlice.actions;
export default estoqueSlice.reducer;