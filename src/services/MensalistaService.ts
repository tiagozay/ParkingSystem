import { Mensalista } from "../models/Mensalista";
import  api_mensalistas from '../json/api_mensalistas.json';
import { APIService } from "./APIService";
import { DataService } from "./DataService";

export default abstract class MensalistaService
{
    static buscaMensalistas(): Promise<Mensalista[] | []>
    {
        return APIService.buscaObjetos('buscaMensalistas.php')
            .then( mensalistasObjeto => {
                    const mensalistas = mensalistasObjeto.map( (mensalista: any) => {
                        return new Mensalista(
                            mensalista.id,
                            mensalista.nome,
                            DataService.corrigeFusoHorario(new Date(mensalista.dataNascimento)),
                            mensalista.cpf,
                            mensalista.email,
                            mensalista.celular,
                            mensalista.cep,
                            mensalista.uf,
                            mensalista.cidade,
                            mensalista.ativo,
                        );
                    } );

                    return mensalistas;
            });
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

    static editaMensalista(novoMensalista: Mensalista): Promise<Mensalista>
    {
        return APIService.enviaObjeto('editarMensalista.php', novoMensalista)
        .then( (mensalistaEditadoOBJ) => {
            return new Mensalista(
                mensalistaEditadoOBJ.id,
                mensalistaEditadoOBJ.nome,
                DataService.corrigeFusoHorario(new Date(mensalistaEditadoOBJ.dataNascimento)),
                mensalistaEditadoOBJ.cpf,
                mensalistaEditadoOBJ.email,
                mensalistaEditadoOBJ.celular,
                mensalistaEditadoOBJ.cep,
                mensalistaEditadoOBJ.uf,
                mensalistaEditadoOBJ.cidade,
                mensalistaEditadoOBJ.ativo,
            );
        } )
        .catch( () => {
            throw new Error("Erro ao editar mensalista."); 
        })        
    }

}