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
                            mensalista.descontinuado
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
                mensalistaCadastradoOBJ.descontinuado
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
                mensalistaEditadoOBJ.descontinuado
            );
        } )
        .catch( () => {
            throw new Error("Erro ao editar mensalista."); 
        })        
    }

    static excluiMensalista(id: number): Promise<Mensalista | undefined>
    {
        return APIService.enviaObjeto('excluiMensalista.php', id)
            .then( mensalistaDescontinuado => {
                if(mensalistaDescontinuado){
                    return new Mensalista(
                        mensalistaDescontinuado.id,
                        mensalistaDescontinuado.nome,
                        DataService.corrigeFusoHorario(new Date(mensalistaDescontinuado.dataNascimento)),
                        mensalistaDescontinuado.cpf,
                        mensalistaDescontinuado.email,
                        mensalistaDescontinuado.celular,
                        mensalistaDescontinuado.cep,
                        mensalistaDescontinuado.uf,
                        mensalistaDescontinuado.cidade,
                        mensalistaDescontinuado.ativo,
                        mensalistaDescontinuado.descontinuado
                    );
                }
            } )
            .catch( () => {
                throw new Error("Erro ao excluír mensalista."); 
            } )
    }

}