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

    static editarUsuario(novoUsuario: Usuario): Promise<Usuario>
    {
        return APIService.enviaObjeto('editarUsuario.php', novoUsuario)
            .then( (usuarioEditadoOBJ) => {
                return new Usuario(
                    usuarioEditadoOBJ.id,
                    usuarioEditadoOBJ.nome,
                    usuarioEditadoOBJ.email,
                    usuarioEditadoOBJ.nivelDeAcesso,
                    usuarioEditadoOBJ.ativo
                );
            } )
            .catch( () => {
                throw new Error("Erro ao editar usuário."); 
            })        
    }

    static excluiUsuario(id: number): Promise<void>
    {
        return APIService.enviaObjeto('excluiUsuario.php', id)
            .catch( () => {
                throw new Error("Erro ao excluír usuário."); 
            } )
    }

}