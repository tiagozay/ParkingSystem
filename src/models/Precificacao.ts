export class Precificacao
{
    private _categoria: string;
    public valorHora: number;
    public valorMensalidade: number;
    public ativa: boolean;
    public numeroDeVagas: number;

    constructor(categoria: string, valorHora:number, valorMensalidade: number, ativa: boolean, numeroDeVagas: number)
    {   
        this.categoria = categoria;
        this.valorHora = valorHora;
        this.valorMensalidade = valorMensalidade;
        this.ativa = ativa;
        this.numeroDeVagas = numeroDeVagas;
    }

    set categoria(categoria: string)
    {
        if(categoria.trim().length == 0 ){
            throw new Error("Categoria inválida.");
        }

        this._categoria = categoria;
    }

    get categoria(): string
    {
        return this._categoria;
    }

}
