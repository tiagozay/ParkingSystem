export class Usuario
{
    public id: number | null;
    public nome: string;
    public email: string;
    public nivelDeAcesso: string;
    public ativo: boolean;

    constructor(
        id: number | null,
        nome: string,
        email: string,
        nivelDeAcesso: string,
        ativo: boolean
    ){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.nivelDeAcesso = nivelDeAcesso;
        this.ativo = ativo;
    }   
}