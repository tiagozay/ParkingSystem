import { Mensalista } from "./Mensalista";

export class Mensalidade
{
    constructor(
        public id: number,
        public mensalista: Mensalista,
        public categoria: string,
        public valor: number,
        public formaDePagamento: string,
        public dataDeCompra: Date,
        public dataDeVencimento: Date,
        public status: string,
    ){}

}