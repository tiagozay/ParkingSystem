import { Mensalidade } from "../models/Mensalidade";
import  api_mensalidades from '../json/api_mensalidades.json';
import { Mensalista } from "../models/Mensalista";
import { Precificacao } from "../models/Precificacao";
import { FormaDePagamento } from "../models/FormaDePagamento";
import { APIService } from "./APIService";
import { DataService } from "./DataService";


export default abstract class MensalidadeService
{
    static buscaMensalidades(): Promise<Mensalidade[] | []>
    {
        return APIService.buscaObjetos('buscaMensalidades.php')
            .then( mensalidadesObjetos => {
                    const mensalidades = mensalidadesObjetos.map( (mensalidadeOBJ: any) => {
                        return this.instanciaMensalidadeComObjeto(mensalidadeOBJ)
                    } );

                    return mensalidades;
            });
    }

    private static instanciaMensalidadeComObjeto(mensalidadeDados: any): Mensalidade
    {
        const mensalistaDaMensalidade = new Mensalista(
            mensalidadeDados.mensalista.id,
            mensalidadeDados.mensalista.nome,
            new Date(mensalidadeDados.mensalista.dataNascimento),
            mensalidadeDados.mensalista.cpf,
            mensalidadeDados.mensalista.email,
            mensalidadeDados.mensalista.celular,
            mensalidadeDados.mensalista.cep,
            mensalidadeDados.mensalista.uf,
            mensalidadeDados.mensalista.cidade,
            mensalidadeDados.mensalista.ativo,
            false,
        );

        const categoriaDaMensalidade = new Precificacao(
            mensalidadeDados.precificacao.id,
            mensalidadeDados.precificacao.categoria,
            mensalidadeDados.precificacao.valorHora,
            mensalidadeDados.precificacao.valorMensalidade,
            mensalidadeDados.precificacao.numeroDeVagas,
            mensalidadeDados.precificacao.ativa,
            mensalidadeDados.precificacao.descontinuada,
        );

        const formaDePagamentoDaMensalidade = new FormaDePagamento(
            mensalidadeDados.formaDePagamento.id,
            mensalidadeDados.formaDePagamento.nomeFormaDePagamento,
            mensalidadeDados.formaDePagamento.ativa,
            mensalidadeDados.formaDePagamento.descontinuada
        );

        return new Mensalidade(
            mensalidadeDados.id,
            mensalistaDaMensalidade,
            categoriaDaMensalidade,
            formaDePagamentoDaMensalidade,
            mensalidadeDados.descontinuada,
            DataService.corrigeFusoHorario(new Date( mensalidadeDados.dataDeCompra )),
            DataService.corrigeFusoHorario(new Date( mensalidadeDados.dataDeVencimento )),
            mensalidadeDados.vencida ? "Vencida" : "Em dia",
        );
    }

    public static cadastraMensalidade(novaMensalidade: Mensalidade): Promise<Mensalidade>
    {
        return APIService.enviaObjeto('cadastraMensalidade.php', novaMensalidade)
        .then( (mensalidadeCadastradaOBJ) => {

            return this.instanciaMensalidadeComObjeto(mensalidadeCadastradaOBJ);

        } )
        .catch( (e) => {
            console.log(e);
            throw new Error("Erro ao cadastrar mensalidade."); 
        })        
    }

    static excluiMensalidade(id: number): Promise<Mensalidade | undefined>
    {
        return APIService.enviaObjeto('excluiMensalidade.php', id)
            .then( mensalidadeDescontinuadaOBJ => {
                if(mensalidadeDescontinuadaOBJ){
                    return this.instanciaMensalidadeComObjeto(mensalidadeDescontinuadaOBJ);
                }
            } )
            .catch( () => {
                throw new Error("Erro ao excluír mensalidade."); 
            } )
    }
}