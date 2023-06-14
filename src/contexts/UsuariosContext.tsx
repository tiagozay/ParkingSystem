import React, {useContext} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Usuario } from '../models/Usuario';
import UsuarioService from '../services/UsuarioService';

interface TypeUsuariosContext 
{
    usuarios: Usuario[],
    setUsuarios: Function,
}

export const UsuariosContext = createContext<TypeUsuariosContext>(
    {
        usuarios: [], 
        setUsuarios: () => {},
    }
);

export default function UsuariosProvider({children}: {children: ReactNode}) {

    const [usuarios, setUsuarios] = useState([
        new Usuario(1, 'Tiago zay', 'tiagozay@gmail.com','Administrador', true),
        new Usuario(2, 'Tiago zay','pedromarques@gmail.com','Operador', true),
        new Usuario(3, 'Jose souza','josesouza@gmail.com', 'Operador', false),
        new Usuario(4, 'Tiago zay','tiagozay@gmail.com', 'Administrador', true),
        new Usuario(5, 'Tiago zay','pedromarques@gmail.com', 'Operador', true),
        new Usuario(6, 'Jose souza','josesouza@gmail.com', 'Operador', false),
    ]);

    return (
        <UsuariosContext.Provider value={{usuarios, setUsuarios}}>
            {children}
        </UsuariosContext.Provider>
    );
}

export const useUsuariosContext = () => {
    const {usuarios, setUsuarios} = useContext(UsuariosContext);

    function buscarUsuarioPorId(id: number)
    {
        return usuarios.find( usuario => usuario.id === id );
    }

    function adicionarUsuario(novoUsuario: Usuario)
    {
        return UsuarioService.cadastraUsuario(novoUsuario)
            .then( usuarioCadastrado => {
                setUsuarios([...usuarios, usuarioCadastrado] );
            }); 
    }

    function editarUsuario(usuarioEditado: Usuario)
    {
        setUsuarios(
            usuarios.map( usuario => {
                if(usuario.id === usuarioEditado.id){
                    return usuarioEditado;
                }
                return usuario;
            } )
        )
    }

    function excluirUsuario(id: number)
    {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id) );
    }

    return {
        usuarios,
        buscarUsuarioPorId,
        adicionarUsuario,
        editarUsuario,
        excluirUsuario,
    }
}
