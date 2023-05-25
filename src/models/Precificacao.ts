export class Precificacao
{
    public id: number | null = null;
    private _categoria: string;
    public valorHora: number;
    public valorMensalidade: number;
    public ativa: boolean;
    public numeroDeVagas: number;

    constructor(id: number | null, categoria: string, valorHora:number, valorMensalidade: number, ativa: boolean, numeroDeVagas: number)
    {   
        this.id = id;
        this.categoria = categoria;
        this.valorHora = valorHora;
        this.valorMensalidade = valorMensalidade;
        this.ativa = ativa;
        this.numeroDeVagas = numeroDeVagas;
    }

    set categoria(categoria: string)
    {
        if(categoria.trim().length == 0 ){
            throw new Error("Nome inválido.");
        }

        this._categoria = categoria;
    }

    get categoria(): string
    {
        return this._categoria;
    }

}
