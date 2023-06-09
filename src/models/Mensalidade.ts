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
        status: "Em dia" | "Vencida" | undefined = undefined
    ){
        this.id = id;
        this.mensalista = mensalista;
        this.categoria = categoria;
        this.valor = categoria.valorMensalidade;
        this.formaDePagamento = formaDePagamento;
        this.dataDeCompra = dataDeCompra;
        this.dataDeVencimento = DataService.acrescenta1MesE1DiaAData(this.dataDeCompra);

        //Se não for passado status no construtor, é usada a lógica de verificar as datas para calcular
        if(!status) {
            if(new Date() > this.dataDeVencimento){
                this.status = "Vencida";
            }else{
                this.status = "Em dia";
            }
        }else {
            this.status = status;
        }

        
    }

    set mensalista(mensalista: Mensalista)
    {
    
        const ehMensalidadeNova = !this.id;

        if(ehMensalidadeNova){
            if(!mensalista.ativo || mensalista.descontinuado){
                throw new Error("Mensalista inváldo (inativo ou descontinuado)");
            }
        }

        this._mensalista = mensalista;
    }

    get mensalista()
    {
        return this._mensalista;
    }

    set categoria(categoria: Precificacao)
    {
        const ehMensalidadeNova = !this.id;

        if(ehMensalidadeNova){
            if(!categoria.ativa || categoria.descontinuada){
                throw new Error("Categoria inválida (inativa ou descontinuada)");
            }
        }
        

        this._categoria = categoria;
    }

    get categoria()
    {
        return this._categoria;
    }

    set formaDePagamento(formaDePagamento: FormaDePagamento)
    {   
        const ehMensalidadeNova = !this.id;

        if(ehMensalidadeNova){
            if(!formaDePagamento.ativa){
                throw new Error("Forma de pagamento inativa!");
            }else if(formaDePagamento.descontinuada){
                throw new Error("Forma de pagamento descontinuada");
            }
        }
        

        this._formaDePagamento = formaDePagamento    
    }

    get formaDePagamento()
    {
        return this._formaDePagamento;
    }

    //Método chamado durante a serialização do objeto
    toJSON()
    {
        return {
            id: this.id,
            mensalista: this._mensalista,
            categoria: this._categoria,
            valor: this.valor,
            formaDePagamento: this._formaDePagamento,
            dataDeCompra: this.dataDeCompra,
            dataDeVencimento: this.dataDeVencimento,
            status: this.status
        }
    }

}