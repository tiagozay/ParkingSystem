import { Mensalista } from "../models/Mensalista";
import { Usuario } from "../models/Usuario";
import { APIService } from "./APIService";
import { DataService } from "./DataService";

export default abstract class UsuarioService
{
    static buscaUsuarios(): Promise<Usuario[] | []>
    {
        return APIService.buscaObjetos('buscaUsuarios.php')
            .then( usuariosOBJ => {
                    const usuarios = usuariosOBJ.map( (usuario: any) => {
                        return new Usuario(
                            usuario.id,
                            usuario.nome,
                            usuario.email,
                            usuario.nivelDeAcesso,
                            usuario.ativo,
                            null
                        );
                    } );

                    return usuarios;
            });
    }

    static cadastraUsuario(novoUsuario: Usuario): Promise<Usuario>
    {
        return APIService.enviaObjeto('cadastraUsuario.php', novoUsuario)
        .then( (usuarioCadastradoOBJ) => {
            return new Usuario(
                usuarioCadastradoOBJ.id,
                usuarioCadastradoOBJ.nome,
                usuarioCadastradoOBJ.email,
                usuarioCadastradoOBJ.nivelDeAcesso,
                usuarioCadastradoOBJ.ativo,
            )
        } )
        .catch( () => {
            throw new Error("Erro ao cadastrar usuário."); 
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