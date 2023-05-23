import { Mensalista } from "../models/Mensalista";
import  api_categorias from '../json/api_categorias.json';
import { Precificacao } from "../models/Precificacao";


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
}