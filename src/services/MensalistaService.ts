import { Mensalista } from "../models/Mensalista";
import  api_mensalistas from '../json/api_mensalistas.json';
import { APIService } from "./APIService";
import { DataService } from "./DataService";

export default abstract class MensalistaService
{
    static buscaMensalistas(): Mensalista[] | []
    {
        return api_mensalistas.map( mensalistaDados => {
            return new Mensalista(
                mensalistaDados.id,
                mensalistaDados.nome,
                new Date(mensalistaDados.dataNascimento),
                mensalistaDados.cpf,
                mensalistaDados.email,
                mensalistaDados.celular,
                mensalistaDados.cep,
                mensalistaDados.uf,
                mensalistaDados.cidade,
                mensalistaDados.ativo,
            );
        } );
    }

    static cadastraMensalista(novoMensalista: Mensalista): Promise<Mensalista>
    {
        return APIService.enviaObjeto('cadastraMensalista.php', novoMensalista)
        .then( (mensalistaCadastradoOBJ) => {
            return new Mensalista(
                mensalistaCadastradoOBJ.id,
                mensalistaCadastradoOBJ.nome,
                DataService.corrigeFusoHorario(new Date(mensalistaCadastradoOBJ.dataNascimento)),
                mensalistaCadastradoOBJ.cpf,
                mensalistaCadastradoOBJ.email,
                mensalistaCadastradoOBJ.celular,
                mensalistaCadastradoOBJ.cep,
                mensalistaCadastradoOBJ.uf,
                mensalistaCadastradoOBJ.cidade,
                mensalistaCadastradoOBJ.ativo,
            );
        } )
        .catch( () => {
            throw new Error("Erro ao cadastrar mensalista."); 
        })        
    }

}