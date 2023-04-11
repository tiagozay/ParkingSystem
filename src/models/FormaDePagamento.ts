export class FormaDePagamento
{
    public id: number | null = null;
    private _nomeFormaDePagamento: string;
    public ativa: boolean;

    constructor(id: number | null, nomeFormaDePagamento: string, ativa: boolean = true){
        this.id = id;
        this.nomeFormaDePagamento = nomeFormaDePagamento;
        this.ativa = ativa;
    }

    set nomeFormaDePagamento(nomeFormaDePagamento: string)
    {
        if(nomeFormaDePagamento.trim().length == 0){
            throw new Error("Nome para a forma de pagamento inválido.");
        }

        this._nomeFormaDePagamento = nomeFormaDePagamento;
    }

    get nomeFormaDePagamento(): string
    {
        return this._nomeFormaDePagamento;
    }

}