import { DataService } from "../services/DataService";
import { FormaDePagamento } from "./FormaDePagamento";
import { Mensalista } from "./Mensalista";
import { Precificacao } from "./Precificacao";

export class Mensalidade
{
    public id: number | null;
    private _mensalista: Mensalista;
    private _categoria: Precificacao;
    public valor: number;
    private _formaDePagamento: FormaDePagamento;
    public dataDeCompra: Date;
    public dataDeVencimento: Date;
    public status: "Em dia" | "Vencida";

    constructor(
        id: number | null,
        mensalista: Mensalista,
        categoria: Precificacao,
        formaDePagamento: FormaDePagamento,
        dataDeCompra: Date,
    ){
        this.id = id;
        this.mensalista = mensalista;
        this.categoria = categoria;
        this.valor = categoria.valorMensalidade;
        this.formaDePagamento = formaDePagamento;
        this.dataDeCompra = dataDeCompra;
        this.dataDeVencimento = DataService.acrescenta1MesE1DiaAData(this.dataDeCompra);

        if(new Date() > this.dataDeVencimento){
            this.status = "Vencida";
        }else{
            this.status = "Em dia";
        }
    }

    set mensalista(mensalista: Mensalista)
    {
        this._mensalista = mensalista;
    }

    get mensalista()
    {
        return this._mensalista;
    }

    set categoria(categoria: Precificacao)
    {
        if(!categoria.ativa){
            throw new Error("Categoria intativa");
        }

        this._categoria = categoria;
    }

    get categoria()
    {
        return this._categoria;
    }

    set formaDePagamento(formaDePagamento: FormaDePagamento)
    {
        if(!formaDePagamento.ativa){
            throw new Error("Forma de pagamento inativa!");
        }

        this._formaDePagamento = formaDePagamento    
    }

    get formaDePagamento()
    {
        return this._formaDePagamento;
    }

}