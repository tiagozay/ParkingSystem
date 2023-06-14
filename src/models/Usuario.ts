export class Usuario
{
    public id: number | null;
    public nome: string;
    public email: string;
    public nivelDeAcesso: "Operador" | "Administrador";
    public ativo: boolean;
    private _senha: string | null;

    constructor(
        id: number | null,
        nome: string,
        email: string,
        nivelDeAcesso: "Operador" | "Administrador",
        ativo: boolean,
        senha: string | null = null
    ){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.nivelDeAcesso = nivelDeAcesso;
        this.ativo = ativo;
        this.senha = senha;
    }   

    set senha(senha: string | null)
    {
        //Como a senha pode ser nula, antes de verificar seu tamanho, verifico se ela foi informada, para não dar erro ao tentar acessar a propriedade length se ela for nula
        if(senha && senha.length < 8){
            throw new Error("Senha muito curta.");
        }
        this._senha = senha;
    }

    get senha()
    {
        return this._senha;
    }

    //Método chamado durante a serialização do objeto
    toJSON()
    {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            nivelDeAcesso: this.nivelDeAcesso,
            ativo: this.ativo,
            senha: this._senha,
        }
    }
}