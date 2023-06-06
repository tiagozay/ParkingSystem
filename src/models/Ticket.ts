import { FormaDePagamento } from "./FormaDePagamento.js";
import { Mensalista } from "./Mensalista.js";
import { Precificacao } from "./Precificacao.js";
import { Veiculo } from "./Veiculo.js";

export class Ticket
{
    public id: number | null = null;
    public readonly veiculo: Veiculo;
    private _formaDePagamento: FormaDePagamento | null;
    public status: "Em aberto" | "Pago";
    public readonly precificacao: Precificacao;
    public readonly dataDeEntrada: Date;
    private _dataDeSaida: Date | null;
    public readonly numeroDaVaga: string | null;
    private _mensalista: Mensalista | null;

    constructor(
        id: number | null,
        veiculo: Veiculo, 
        dataEntrada: Date,
        dataSaida: Date | null,
        precificacao: Precificacao,
        status: "Em aberto" | "Pago", 
        numeroDaVaga: string | null,
        formaDePagamento: FormaDePagamento | null = null,
        mensalista: Mensalista | null = null
    ){
        this.id = id;

        this.veiculo = veiculo;

        this.precificacao = precificacao;
        this.dataDeEntrada = dataEntrada;
        this.formaDePagamento = formaDePagamento;
        this.status = status;
        this._dataDeSaida = dataSaida;
        this.numeroDaVaga = numeroDaVaga;
        this.mensalista = mensalista;
    }

    set formaDePagamento(formaDePagamento: FormaDePagamento | null)
    {
        if(formaDePagamento && !formaDePagamento.ativa){
            throw new Error("Forma de pagamento inativa");
        }else if(formaDePagamento && formaDePagamento.descontinuada){
            throw new Error("Forma de pagamento descontinuada");
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

    public fecharTicket(formaDePagamento: FormaDePagamento)
    {
        if(this.status == "Pago"){
            console.warn("O ticket já foi pago.");
            return;
        }

        this.formaDePagamento = formaDePagamento;
        this._dataDeSaida = new Date();

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