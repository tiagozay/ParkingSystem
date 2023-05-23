import { Mensalista } from "../models/Mensalista";
import  api_categorias from '../json/api_categorias.json';
import { Precificacao } from "../models/Precificacao";


export default abstract class CategoriaService
{
    static buscaCategoriaPorId(id: number): Precificacao | undefined
    {
        const categoriaDados = api_categorias.find( categoria => 
            categoria.id = id);

        if(!categoriaDados) return undefined;
    
        const categoria = new Precificacao(
            categoriaDados.id,
            categoriaDados.nome,
            categoriaDados.valorHora,
            categoriaDados.valorMensalidade,
            categoriaDados.ativa,
            categoriaDados.numeroDeVagas,
        );
        
        return categoria;
    }

    static buscaMensalistas(): Mensalista[] | []
    {
        return [];
    }
}