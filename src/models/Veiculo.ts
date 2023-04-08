import { PrecificacoesService } from "../services/PrecificacoesService";

export class Veiculo
{
    public readonly placa: string;
    public readonly marca: string;
    public readonly modelo: string;
    public readonly segmento: string;
    public readonly valorHora: number;


    constructor(placa: string, marca: string, modelo: string, segmento: string){
        if(placa.trim().length != 7 && placa.trim().length != 8){
            throw new Error("Placa inválida.");
        }

        if(marca.trim().length == 0 || modelo.trim().length == 0 || segmento.trim().length == 0){
            throw new Error("Dados inválidos.");
        }

        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.segmento = segmento;

        const precificacao = PrecificacoesService.buscaPrecificacaoDeCategoria(segmento);

        if(!precificacao){
            throw new Error("Precificacao não encotrada.");
        }

        this.valorHora = precificacao.valorHora;

    }
}