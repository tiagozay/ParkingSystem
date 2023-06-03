export class FormaDePagamento
{
    public id: number | null = null;
    private _nomeFormaDePagamento: string;
    public ativa: boolean;
    public descontinuada: boolean;

    constructor(id: number | null, nomeFormaDePagamento: string, ativa: boolean, descontinuada: boolean){
        this.id = id;
        this.nomeFormaDePagamento = nomeFormaDePagamento;
        this.ativa = ativa;
        this.descontinuada = descontinuada;
    }

    public set nomeFormaDePagamento(nomeFormaDePagamento: string)
    {
        if(nomeFormaDePagamento.trim().length == 0){
            throw new Error("Nome para a forma de pagamento inválido.");
        }

        this._nomeFormaDePagamento = nomeFormaDePagamento;
    }

    public get nomeFormaDePagamento(): string
    {
        return this._nomeFormaDePagamento;
    }

    //Método chamado durante a serialização do objeto
    toJSON(){
        return {
            id: this.id,
            nomeFormaDePagamento: this._nomeFormaDePagamento,
            ativa: this.ativa,
            descontinuada: this.descontinuada
        }
    }

}