export class Usuario
{
    constructor(
        public id: number,
        public usuario: string,
        public email: string,
        public nome: string,
        public perfilDeAcesso: string,
        public ativo: boolean
    ){}
}