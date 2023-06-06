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
                        precificacaoObjeto.ativa,
                        precificacaoObjeto.numeroDeVagas
                    );
                } );

                return precificacoes;
            } );
    }

    static cadastraPrecificacao(novaPrecificacao: Precificacao)
    {
        return APIService.enviaObjeto('cadastraPrecificacao.php', novaPrecificacao)
        .then( (precificacaoCadastradaObjeto) => {
            return new Precificacao(
                precificacaoCadastradaObjeto.id,
                precificacaoCadastradaObjeto.categoria,
                precificacaoCadastradaObjeto.valorHora,
                precificacaoCadastradaObjeto.valorMensalidade,
                precificacaoCadastradaObjeto.ativa,
                precificacaoCadastradaObjeto.numeroDeVagas           
            )
        } )
        .catch( (e) => {
            throw new Error("Erro ao cadastrar precificação. "); 
        })  
    }
}