// Apontando diretamente para a API na nuvem (Render)
const BASE_URL = 'https://erp-lf-suporte-backend.onrender.com';

export const buscarChamados = async () => {
    try {
        const resposta = await fetch(`${BASE_URL}/ordens-servico`);
        if (!resposta.ok) return [];
        return await resposta.json();
    } catch (error) {
        console.error("Erro ao buscar chamados:", error);
        return [];
    }
};

export const buscarClientes = async () => {
    try {
        const resposta = await fetch(`${BASE_URL}/clientes`);
        if (!resposta.ok) return [];
        return await resposta.json();
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        return [];
    }
};

export const criarChamado = async (equipamento: string, defeitoRelatado: string, clienteId: string, valor: string, solucaoTecnica: string) => {
    try {
        const response = await fetch(`${BASE_URL}/ordens-servico`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                equipamento: equipamento,
                status: 'EM_ANALISE',
                defeitoRelatado: defeitoRelatado,
                dataCriacao: new Date().toISOString(),
                valor: valor ? parseFloat(valor.replace(',', '.')) : 0.0,
                solucaoTecnica: solucaoTecnica || '',
                cliente: { id: clienteId }
            }),
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Erro ao salvar:", error);
        return null;
    }
};

export const concluirChamado = async (chamado: any) => {
    try {
        const chamadoAtualizado = {
            equipamento: chamado.equipamento,
            defeitoRelatado: chamado.defeitoRelatado,
            status: 'CONCLUIDO',
            valor: chamado.valor || 0.0,
            solucaoTecnica: chamado.solucaoTecnica || '',
            dataCriacao: chamado.dataCriacao || ''
        };

        // BLINDAGEM: Usa o _id do Atlas se o id normal não existir
        const idParaAtualizar = chamado.id || chamado._id;

        const response = await fetch(`${BASE_URL}/ordens-servico/${idParaAtualizar}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chamadoAtualizado),
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao concluir:", error);
        return false;
    }
};

export const apagarChamado = async (id: any) => {
    try {
        const response = await fetch(`${BASE_URL}/ordens-servico/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao apagar:", error);
        return false;
    }
};

export const cadastrarCliente = async (cliente: { nome: string; email: string; telefone: string }) => {
    try {
        const response = await fetch(`${BASE_URL}/clientes`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        return false;
    }
};