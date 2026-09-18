export class Chamado {
    id: string;
    cliente: string;
    equipamento: string;

    constructor(id: string, cliente: string, equipamento: string) {
        this.id = id;
        this.cliente = cliente;
        this.equipamento = equipamento;
    }
}