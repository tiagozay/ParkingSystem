import { convertCompilerOptionsFromJson } from "typescript";
import { FormaDePagamento } from "./FormaDePagamento.js";
import { Mensalista } from "./Mensalista.js";
import { Precificacao } from "./Precificacao.js";
import { Mensalidade } from "./Mensalidade.js";

export class Ticket {
    public id: number | null = null;
    public placaVeiculo: string;
    public marcaVeiculo: string;
    public modeloVeiculo: string;
    private _formaDePagamento: FormaDePagamento | "Mensalidade" | null;
    public status: "Em aberto" | "Pago";
    public _precificacao: Precificacao;
    public dataDeEntrada: Date;
    private _dataDeSaida: Date | null;
    public numeroDaVaga: string | null;
    private _mensalista: Mensalista | null;
    private _mensalidade: Mensalidade | null;

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
        formaDePagamento: FormaDePagamento | "Mensalidade" | null = null,
        mensalista: Mensalista | null = null,
        mensalidade: Mensalidade | null = null
    ) {
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
        this.mensalidade = mensalidade;
    }

    public editar(
        placaVeiculo: string,
        marcaVeiculo: string,
        modeloVeiculo: string,
        dataSaida: Date | null,
        precificacao: Precificacao,
        status: "Em aberto" | "Pago",
        formaDePagamento: FormaDePagamento | null = null,
        mensalista: Mensalista | null = null,
        mensalidade: Mensalidade | null = null
    ) {
        this.placaVeiculo = placaVeiculo;
        this.marcaVeiculo = marcaVeiculo;
        this.modeloVeiculo = modeloVeiculo;
        this.precificacao = precificacao;
        this.mensalista = mensalista;
        this.mensalidade = mensalidade;

        this.validaStatus(formaDePagamento, dataSaida, status);

    }

    private validaStatus(
        formaDePagamento: FormaDePagamento | null = null, 
        dataSaida: Date | null,
        status: "Em aberto" | "Pago", 
    ) {
        const ehEmAberto = this.status === "Em aberto";

        //Quando o operador seleciona uma forma de pagamento no formulário de editar, aí chega para essa função a forma de pagamento selecionada, a data de saída e o status, indicando que é para marcar este ticket como pago
        const fechamentoDeTiketAvulsoEfetuadoPeloOperador = formaDePagamento && dataSaida && status === "Pago" ? true : false;

        //Quando o cliente do ticket é um mensalista, ao invés de selecionar a forma de pagamento, selecionamos diretamente o status, já que não faz sentido selecionar a forma de pagamento, já que o cliente pagou a mensalidade, aí nesse caso recebemos a data de saída e o status, e verificamos também se realmente há um mensalista e uma mensalidade
        const fechamentoDeTiketMensalistaEfetuadoPeloOperador = dataSaida && this.mensalista && this.mensalidade && status === "Pago" ? true : false;

        if (ehEmAberto && fechamentoDeTiketAvulsoEfetuadoPeloOperador) {
            this._dataDeSaida = dataSaida;
            this.formaDePagamento = formaDePagamento;
            this.status = "Pago";
        } else if (ehEmAberto && fechamentoDeTiketMensalistaEfetuadoPeloOperador) {
            this._dataDeSaida = dataSaida;
            this._formaDePagamento = "Mensalidade";
            this.status = "Pago";
        }
    }

    set precificacao(precificacao: Precificacao) {
        const ehNovoTiket = !this.id;

        //Indica se este setter não foi chamado a partir do construtor, e sim da função editar, que é chamada quando a propriedade já foi incializada (quando ela não é undefined)
        const ehChamadaDeEdicao = this._mensalista !== undefined;

        const ehPrecificacaoDiferenteDaJaCadastrada = this._precificacao?.id !== precificacao?.id;

        if (
            (ehNovoTiket) ||
            (ehChamadaDeEdicao && ehPrecificacaoDiferenteDaJaCadastrada)
        ) {
            if (!precificacao.ativa || precificacao.descontinuada) {
                throw new Error("Precificação inválida (inativa ou descontinuada)");
            }
        }

        this._precificacao = precificacao;
    }

    set formaDePagamento(formaDePagamento: FormaDePagamento | "Mensalidade" | null) {
        const ehNovoTiket = !this.id;

        if (formaDePagamento && formaDePagamento !== "Mensalidade") {
            if (ehNovoTiket || this.status === "Em aberto") {
                if (!formaDePagamento.ativa || formaDePagamento.descontinuada) {
                    throw new Error("Forma de pagamento inválida (inativa ou descontinuada)");
                }
            }
        }

        this._formaDePagamento = formaDePagamento;
    }

    set mensalista(mensalista: Mensalista | null) {
        const ehNovoTiket = !this.id;

        //Indica se este setter não foi chamado a partir do construtor, e sim da função editar, que é chamada quando a propriedade já foi incializada (quando ela não é undefined)
        const ehChamadaDeEdicao = this._mensalista !== undefined;

        const ehMensalistaDiferenteDoJaCadastrado = this._mensalista?.id !== mensalista?.id;

        //Só é realizada a verificação se for um novo tiket ou se estiver editando e for passado um mensalista diferente do já cadastrado
        if (mensalista) {
            if (
                (ehNovoTiket) ||
                (ehChamadaDeEdicao && ehMensalistaDiferenteDoJaCadastrado)
            ) {
                if (!mensalista.ativo || mensalista.descontinuado) {
                    throw new Error("Mensalista inválido (inativo ou descontinuado)");
                }
            }
        }

        this._mensalista = mensalista;
    }

    set mensalidade(mensalidade: Mensalidade | null) {
        if (this.mensalista && !mensalidade) {
            throw new Error("Informe a mensalidade corretamente!");
        }

        const ehNovoTiket = !this.id;

        //Indica se este setter não foi chamado a partir do construtor, e sim da função editar, que é chamada quando a propriedade já foi incializada (quando ela não é undefined)
        const ehChamadaDeEdicao = this._mensalidade !== undefined;

        const ehMensalidadeDiferenteDaJaCadastrada = this._mensalidade?.id !== mensalidade?.id;

        if (
            (ehNovoTiket) ||
            (ehChamadaDeEdicao && ehMensalidadeDiferenteDaJaCadastrada)
        ) {

            if (mensalidade?.status === 'Vencida' || mensalidade?.descontinuada) {
                throw new Error("Mensalidade inválida (vencida ou descontinuada)");
            }

        }

        this._mensalidade = mensalidade;
    }

    get precificacao(): Precificacao {
        return this._precificacao;
    }

    get formaDePagamento(): FormaDePagamento | "Mensalidade" | null {
        return this._formaDePagamento;
    }

    get dataDeSaida(): Date | null {
        return this._dataDeSaida;
    }

    get mensalista() {
        return this._mensalista;
    }

    get mensalidade() {
        return this._mensalidade;
    }

    get valorHora(){
        if(this.mensalista){
            return 0;
        }

        return this.precificacao.valorHora;
    }

    calculaTotalAPagar(valorPorHora: number): number {
        if(this.mensalista){
            return 0;
        }

        const tempoDecorrido = this.tempoDecorrido;

        const tempoDividido = tempoDecorrido.split(":");

        const horas = Number(tempoDividido[0]);
        const minutos = Number(tempoDividido[1]);

        return (horas * valorPorHora) + (minutos / 60 * valorPorHora);
    }


    get tempoDecorrido(): string {

        let dataParaOCalculo = new Date();

        if (this._dataDeSaida) {
            dataParaOCalculo = this._dataDeSaida;
        }

        // Calculando a diferença de tempo em milissegundos
        let diferenca = dataParaOCalculo.getTime() - this.dataDeEntrada.getTime();

        // Calculando o tempo decorrido em horas, minutos e segundos
        let horas = Math.floor(diferenca / (1000 * 60 * 60));
        let minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

        //Formata a data para que numeros de apenas 1 digito tenham 0 antes, ex 1 vira 01
        let horaFormatada = String(horas).length == 1 ? "0" + horas : String(horas);
        let minutosFormatados = String(minutos).length == 1 ? "0" + minutos : String(minutos);
        return `${horaFormatada}:${minutosFormatados}`;
    }

    //Método chamado durante a serialização do objeto
    toJSON()
    {
        return {
            id: this.id,
            placaVeiculo: this.placaVeiculo,
            marcaVeiculo: this.marcaVeiculo,
            modeloVeiculo: this.modeloVeiculo,
            precificacao: this.precificacao,
            dataDeEntrada: this.dataDeEntrada,
            formaDePagamento: this.formaDePagamento,
            pago: this.status === 'Pago',
            dataDeSaida: this._dataDeSaida,
            numeroDaVaga: this.numeroDaVaga,
            mensalista: this.mensalista,
            mensalidade: this.mensalidade,
        }
    }
}