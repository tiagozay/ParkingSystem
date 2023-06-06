import { Mensalista } from "../models/Mensalista";
import  api_categorias from '../json/api_categorias.json';
import { Precificacao } from "../models/Precificacao";
import { FormaDePagamento } from "../models/FormaDePagamento";
import { APIService } from "./APIService";


export default abstract class CategoriaService
{
    static buscaCategorias(): Precificacao[] | []
    {
        return api_categorias.map( categoriaDados => {
            return new Precificacao(
                categoriaDados.id,
                categoriaDados.nome,
                categoriaDados.valorHora,
                categoriaDados.valorMensalidade,
                categoriaDados.ativa,
                categoriaDados.numeroDeVagas,
            )
        } )
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
            throw new Error("Erro ao cadastrar precificação."); 
        })  
    }
}