import { Mensalista } from "../models/Mensalista";
import { Precificacao } from "../models/Precificacao";
import { FormaDePagamento } from "../models/FormaDePagamento";
import { APIService } from "./APIService";


export default abstract class CategoriaService
{
    static buscaCategorias(): Promise<Precificacao[] | []>
    {   
        return APIService.buscaObjetos('buscaPrecificacoes.php')
            .then( precificacoesObjetos => {
                const precificacoes = precificacoesObjetos.map( (precificacaoObjeto : any) => {
                    return new Precificacao(
                        precificacaoObjeto.id,
                        precificacaoObjeto.categoria,
                        precificacaoObjeto.valorHora,
                        precificacaoObjeto.valorMensalidade,
                        precificacaoObjeto.numeroDeVagas,
                        precificacaoObjeto.ativa,
                        precificacaoObjeto.descontinuada,
                    );
                } );

                return precificacoes;
            } );
    }

    static cadastraPrecificacao(novaPrecificacao: Precificacao): Promise<Precificacao>
    {
        return APIService.enviaObjeto('cadastraPrecificacao.php', novaPrecificacao)
        .then( (precificacaoCadastradaObjeto) => {
            return new Precificacao(
                precificacaoCadastradaObjeto.id,
                precificacaoCadastradaObjeto.categoria,
                precificacaoCadastradaObjeto.valorHora,
                precificacaoCadastradaObjeto.valorMensalidade,
                precificacaoCadastradaObjeto.numeroDeVagas,    
                precificacaoCadastradaObjeto.ativa,       
                precificacaoCadastradaObjeto.descontinuada,           
            )
        } )
        .catch( (e) => {
            throw new Error("Erro ao cadastrar precificação. "); 
        })  
    }

    static editaPrecificacao(novaPrecificacao: Precificacao): Promise<Precificacao>
    {
        return APIService.enviaObjeto('editarPrecificacao.php', novaPrecificacao)
        .then( (precificacaoEditada) => {
            return new Precificacao(
                precificacaoEditada.id,
                precificacaoEditada.categoria,
                precificacaoEditada.valorHora,
                precificacaoEditada.valorMensalidade,
                precificacaoEditada.numeroDeVagas,
                precificacaoEditada.ativa,
                precificacaoEditada.descontinuada,
            );
        } )
        .catch( () => {
            throw new Error("Erro ao editar precificação."); 
        })        
    }

    static excluiCategoria(id: number): Promise<Precificacao | undefined>
    {
        return APIService.enviaObjeto('excluiPrecificacao.php', id)
            .then( precificacaoDescontinuada => {
                if(precificacaoDescontinuada){
                    return new Precificacao(
                        precificacaoDescontinuada.id,
                        precificacaoDescontinuada.categoria,
                        precificacaoDescontinuada.valorHora,
                        precificacaoDescontinuada.valorMensalidade,
                        precificacaoDescontinuada.numeroDeVagas,
                        precificacaoDescontinuada.ativa,
                        precificacaoDescontinuada.descontinuada,
                    );
                }
            } )
            .catch( () => {
                throw new Error("Erro ao excluír precificação."); 
            } )
    }
}