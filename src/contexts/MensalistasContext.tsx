import React, {useContext, useEffect} from 'react'
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
    const [mensalistas, setMensalistas] = useState<Mensalista[] | []>([]);

    useEffect(() => {
        MensalistaService.buscaMensalistas()
            .then( setMensalistas );
    }, []);

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

        return MensalistaService.editaMensalista(novoMensalista)
            .then( mensalistaEditado => {
                setMensalistas( mensalistas.map( mensalista => {
                    if(mensalista.id === mensalistaEditado.id){
                        return mensalistaEditado;
                    }
        
                    return mensalista;
                } ) );
            } );
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
