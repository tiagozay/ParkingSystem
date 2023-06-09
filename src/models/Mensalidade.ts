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
        //Se não tiver ID, é sinal de que uma nova mensalidade está sendo cadastrada, fazendo-se necessária a validação do mensalista recebido. Se tiver id, não faz a validação, pois indica que esse mensalisat já foi cadastrado da forma correta (com um mesnalista válido)
        if(!this.id){
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
        //Se o id for nulo, é sinal que está sendo criada uma nova Mensalidade, fazendo-se necessária a validação da precificação. Se não for nulo, é sinal que está sendo iniciada uma Mensalidade já cadastrada, aí não é necessária a validação da Precificação
        if(!this.id){
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
        //Se id for nulo, é sinal de que está sendo criada uma nova mensalidade, nesse caso, a forma de pagamento não pode estar inativa e nem descontinuada. Porém, se já tiver um id, a forma de pagamento pode ter qualquer estado, já que a mensalidade já foi paga anteriormente, quando a forma de pagamento era valida (ativa e não descontinuada)
        if(!this.id){
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