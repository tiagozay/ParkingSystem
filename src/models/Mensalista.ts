export class Mensalista
{
    constructor(
        public id: number,
        public nome: string, 
        public cpf: string,
        public email: string,
        public celular: string,
        public ativo: boolean
    ){}
}