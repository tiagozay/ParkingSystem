export class Precificacao
{
    public id: number | null = null;
    private _categoria: string;
    public valorHora: number;
    public valorMensalidade: number;
    public ativa: boolean;
    public numeroDeVagas: number;
    public descontinuada: boolean;

    constructor(id: number | null, categoria: string, valorHora:number, valorMensalidade: number, numeroDeVagas: number, ativa: boolean, descontinuada: boolean)
    {   
        this.id = id;
        this.categoria = categoria;
        this.valorHora = valorHora;
        this.valorMensalidade = valorMensalidade;
        this.numeroDeVagas = numeroDeVagas;
        this.ativa = ativa;
        this.descontinuada = descontinuada;
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

    //Método chamado durante a serialização do objeto
    toJSON(){
        return {
            id: this.id,
            categoria: this.categoria,
            valorHora: this.valorHora,
            valorMensalidade: this.valorMensalidade,
            numeroDeVagas: this.numeroDeVagas,
            ativa: this.ativa,
            descontinuada: this.descontinuada
        }
    }

}
