import { FormaDePagamento } from "./FormaDePagamento.js";
import { Mensalista } from "./Mensalista.js";
import { Precificacao } from "./Precificacao.js";

export class Ticket
{
    public id: number | null = null;
    public placaVeiculo: string;
    public marcaVeiculo: string;
    public modeloVeiculo: string;
    private _formaDePagamento: FormaDePagamento | null;
    public status: "Em aberto" | "Pago";
    public precificacao: Precificacao;
    public dataDeEntrada: Date;
    private _dataDeSaida: Date | null;
    public numeroDaVaga: string | null;
    private _mensalista: Mensalista | null;

    constructor(
        id: number | null,
        placaVeiculo: string,
        marcaVeiculo: string,
        modeloVeiculo: string,
        dataEntrada: Date,
        dataSaida: Date | null,
        precificacao: Precificacao,
        status: "Em aberto" | "Pago", 
        numeroDaVaga: string | null,
        formaDePagamento: FormaDePagamento | null = null,
        mensalista: Mensalista | null = null
    ){
        this.id = id;
        this.placaVeiculo = placaVeiculo;
        this.marcaVeiculo = marcaVeiculo;
        this.modeloVeiculo = modeloVeiculo;
        this.precificacao = precificacao;
        this.dataDeEntrada = dataEntrada;
        this.formaDePagamento = formaDePagamento;
        this.status = status;
        this._dataDeSaida = dataSaida;
        this.numeroDaVaga = numeroDaVaga;
        this.mensalista = mensalista;
    }

    public editar(
        placaVeiculo: string,
        marcaVeiculo: string,
        modeloVeiculo: string,
        dataSaida: Date | null,
        precificacao: Precificacao,
        formaDePagamento: FormaDePagamento | null = null,
        mensalista: Mensalista | null = null
    ){
        this.placaVeiculo = placaVeiculo;
        this.marcaVeiculo = marcaVeiculo;
        this.modeloVeiculo = modeloVeiculo;
        this.precificacao = precificacao;
        this.mensalista = mensalista;

        //Se o ticket ainda não foi pago e a data de saída e a forma de pagamento foi recebida nessa função de editar, é sinal que o operador realizou o pagamento deste ticket, aí defino a data de saída e a forma de pagamento e mudo seu status para "Pago"
        if(this.status === "Em aberto" && dataSaida && formaDePagamento){
            this._dataDeSaida = dataSaida;
            this.formaDePagamento = formaDePagamento;
            this.status = "Pago";
        }

    }

    set formaDePagamento(formaDePagamento: FormaDePagamento | null)
    {
        //Recebo uma forma de pagamento que preciso verificar se ela é válida (ativa e não é descontinuada) somente quando eu estiver criando um um novo ticket (quando o id for nulo) ou quando eu já tiver um ticket, porém, em aberto, que nesse caso é sinal que estou editando um ticket. Nesses dois casos tenho que fazer a validação. Caso contrário (quando o ticket já está pago), não preciso fazer as validações da forma de pagamento.
        if(!this.id || (this.id && this.status === "Em aberto") ){
            if(formaDePagamento && !formaDePagamento.ativa){
                throw new Error("Forma de pagamento inativa");
            }else if(formaDePagamento && formaDePagamento.descontinuada){
                throw new Error("Forma de pagamento descontinuada");
            }
        }

        this._formaDePagamento = formaDePagamento;
    }

    get formaDePagamento(): FormaDePagamento | null
    {
        return this._formaDePagamento;
    }

    get dataDeSaida(): Date | null
    {
        return this._dataDeSaida;
    }

    set mensalista(mensalista: Mensalista | null)
    {
        if(mensalista && !mensalista.ativo){
            throw new Error("Mensalista inativo!");
        }

        this._mensalista = mensalista;
    }

    get mensalista()
    {
        return this._mensalista;
    } 

    calculaTotalAPagar(valorPorHora: number): number
    {
        const tempoDecorrido = this.tempoDecorrido;

        const tempoDividido = tempoDecorrido.split(":");

        const horas = Number(tempoDividido[0]);
        const minutos = Number(tempoDividido[1]);

        return (horas * valorPorHora) + (minutos / 60 * valorPorHora);
    }


    get tempoDecorrido(): string
    {

        let dataParaOCalculo = new Date();

        if(this._dataDeSaida){
            dataParaOCalculo = this._dataDeSaida;
        }

        // Calculando a diferença de tempo em milissegundos
        let diferenca = dataParaOCalculo.getTime() - this.dataDeEntrada.getTime();

        // Calculando o tempo decorrido em horas, minutos e segundos
        let horas = Math.floor(diferenca / (1000 * 60 * 60));
        let minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

        //Formata a data para que numeros de apenas 1 digito tenham 0 antes, ex 1 vira 01
        let horaFormatada = String(horas).length == 1 ? "0"+horas : String(horas);
        let minutosFormatados = String(minutos).length == 1 ? "0"+minutos : String(minutos);
        return `${horaFormatada}:${minutosFormatados}`;
    }
}