import React, {useContext} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Mensalista } from '../models/Mensalista';
import MensalistaService from '../services/MensalistaService';

interface TypeMensalistaContext 
{
    mensalistas: Mensalista[],
    setMensalistas: Function
}

export const MensalistaContext = createContext<TypeMensalistaContext>({mensalistas: [], setMensalistas: () => {}});

export default function MensalistasProvider({children}: {children: ReactNode}) {

    const [mensalistas, setMensalistas] = useState(MensalistaService.buscaMensalistas());

    return (
        <MensalistaContext.Provider value={{mensalistas, setMensalistas}}>
            {children}
        </MensalistaContext.Provider>
    );
}

export const useMensalistaContext = () => {
    const {mensalistas, setMensalistas} = useContext(MensalistaContext);

    function verificaSeJaTemMensalistaComCpf(cpf: string) 
    {
        return mensalistas.some( mensalista => mensalista.cpf === cpf );
    }

    function buscarMensalistaPorId(id: number)
    {
        return mensalistas.find( mensalista => mensalista.id === id );
    }

    function adicionarMensalista(mensalista: Mensalista)
    {
        if(verificaSeJaTemMensalistaComCpf(mensalista.cpf)){
            throw new Error("Já existe um mensalista com este CPF");
        }

        return MensalistaService.cadastraMensalista(mensalista)
            .then( mensalistaCadastrado => {
                setMensalistas([...mensalistas, mensalistaCadastrado] );
            });        
    }

    function removerMensalista(id: number)
    {
        setMensalistas( mensalistas.filter( mensalista => mensalista.id !== id ) );
    }

    function editarMensalista(novoMensalista: Mensalista) 
    {
        setMensalistas( 
            mensalistas.map( mensalista => {
                if(mensalista.id === novoMensalista.id){
                    return novoMensalista;
                }

                return mensalista;
            } )
        );
    }


    return {
        mensalistas,
        buscarMensalistaPorId,
        verificaSeJaTemMensalistaComCpf,
        adicionarMensalista,
        editarMensalista,
        removerMensalista
    }
}
