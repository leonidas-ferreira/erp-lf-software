import { configureStore } from '@reduxjs/toolkit';
import estoqueReducer from './estoqueSlice';

export const store = configureStore({
    reducer: {
        estoque: estoqueReducer,
    },
});