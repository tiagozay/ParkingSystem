import { FormaDePagamento } from "./FormaDePagamento.js";
import { Veiculo } from "./Veiculo.js";

export class Tiket
{
    public id: number | null = null;
    public readonly veiculo: Veiculo;
    private _formaDePagamento: FormaDePagamento | null;
    public status: "Em aberto" | "Pago";
    public readonly valorPorHora: number;
    public readonly dataDeEntrada: Date;
    private _dataDeSaida: Date | null;
    public readonly numeroDaVaga: string | null;

    constructor(
        id: number | null,
        veiculo: Veiculo, 
        dataEntrada: Date,
        dataSaida: Date | null,
        valorPorHora: number,
        status: "Em aberto" | "Pago", 
        formaDePagamento: FormaDePagamento | null = null,
        numeroDaVaga: string | null,
    ){
        this.id = id;

        this.veiculo = veiculo;

        this.valorPorHora = valorPorHora;
        this.dataDeEntrada = dataEntrada;
        this.formaDePagamento = formaDePagamento;
        this.status = status;
        this._dataDeSaida = dataSaida;
        this.numeroDaVaga = numeroDaVaga;
    }

    set formaDePagamento(formaDePagamento: FormaDePagamento | null)
    {
        if(formaDePagamento && !formaDePagamento.ativa){
            throw new Error("Forma de pagamento intativa");
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

    public fecharTiket(formaDePagamento: FormaDePagamento)
    {
        if(this.status == "Pago"){
            console.warn("O tiket já foi pago.");
            return;
        }

        this.formaDePagamento = formaDePagamento;
        this._dataDeSaida = new Date();

    }

    calculaTotalAPagar(valorPorHora: number): number
    {
        const horas = Math.floor(this.tempoDecorrido);
        const minutos = (this.tempoDecorrido - horas) * 100;

        const tempoFracao = horas + (minutos / 60);

        return tempoFracao * valorPorHora;
    }


    get tempoDecorrido(): number
    {
        let dataParaOCalculo = new Date();

        if(this._dataDeSaida){
            dataParaOCalculo = this._dataDeSaida;
        }

        const diff = dataParaOCalculo.getTime() - this.dataDeEntrada.getTime();

        const totalMinutos = diff / 1000 / 60;

        const horas = Math.trunc(totalMinutos / 60);

        const minutos = Math.floor(totalMinutos % 60);

        return Number(`${horas}.${minutos}`);
    }
}