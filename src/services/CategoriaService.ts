import { Mensalista } from "../models/Mensalista";
import  api_categorias from '../json/api_categorias.json';
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
        .then( (precificacaoCadastrada) => {
            return new Precificacao(
                precificacaoCadastrada.id,
                precificacaoCadastrada.categoria,
                precificacaoCadastrada.valorHora,
                precificacaoCadastrada.valorMensalidade,
                precificacaoCadastrada.numeroDeVagas,
                precificacaoCadastrada.ativa,
                precificacaoCadastrada.descontinuada,
            );
        } )
        .catch( () => {
            throw new Error("Erro ao editar precificação."); 
        })        
    }
}