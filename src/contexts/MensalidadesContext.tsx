import React, {useContext, useEffect} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Mensalidade } from '../models/Mensalidade';
import { Mensalista } from '../models/Mensalista';
import MensalidadeService from '../services/MensalidadeService';

interface TypeMensalidadeContext 
{
    mensalidades: Mensalidade[],
    setMensalidades: Function
}

export const MensalidadeContext = createContext<TypeMensalidadeContext>({mensalidades: [], setMensalidades: () => {}});

export default function MensalidadesProvider({children}: {children: ReactNode}) {
    const [mensalidades, setMensalidades] = useState<Mensalidade[] | []>([]);

    useEffect(() => {
        MensalidadeService.buscaMensalidades()
            .then( setMensalidades );
    }, []);

    return (
        <MensalidadeContext.Provider value={{mensalidades, setMensalidades}}>
            {children}
        </MensalidadeContext.Provider>
    );
}

export const useMensalidadeContext = () => {
    const {mensalidades, setMensalidades} = useContext(MensalidadeContext);

    //Verifica se já tem uma mensalidade para a mesma categoria e mensalista que esteja em dia
    function verificaSeJaTemMensalidade(novaMensalidade : Mensalidade)
    {
        return mensalidades.some( mensalidade => {
            if( 
                mensalidade.mensalista.id === novaMensalidade.mensalista.id &&  
                mensalidade.categoria.id === novaMensalidade.categoria.id && 
                mensalidade.status === "Em dia"
            ){
                return true;
            }

            return false;
        } )
    }

    function verificaSeTemMensalidadesEmDiaDePrecificacao(idPrecificacao : number)
    {
        return mensalidades.some( mensalidade => {
            return mensalidade.categoria.id === idPrecificacao && mensalidade.status === "Em dia";
        } )
    }

    function buscarMensalidadePorId(id: number)
    {
        return mensalidades.find( mensalidade => mensalidade.id === id );
    }

    function buscaMensalidadesDeMensalista(mensalista: Mensalista)
    {
        return mensalidades.filter( mensalidade => mensalidade.mensalista.id === mensalista.id);
    }

    function buscaMensalidadesDeMensalistaPorId(id: number)
    {
        return mensalidades.filter( mensalidade => mensalidade.mensalista.id === id);
    }

    function adicionarMensalidade(mensalidade: Mensalidade)
    {

        if(verificaSeJaTemMensalidade(mensalidade)){
            throw new Error("Este mensalista já tem esta mensalidade");
        }

        return MensalidadeService.cadastraMensalidade(mensalidade)
            .then( mensalidadeCadastrada => {
                setMensalidades([...mensalidades, mensalidadeCadastrada] );
            });        

    }

    function removerMensalidade(id: number)
    {
        setMensalidades( mensalidades.filter( mensalidade => mensalidade.id !== id ) );
    }

    return {
        mensalidades,
        buscarMensalidadePorId,
        buscaMensalidadesDeMensalista,
        buscaMensalidadesDeMensalistaPorId,
        verificaSeTemMensalidadesEmDiaDePrecificacao,
        adicionarMensalidade,
        removerMensalidade
    }
}
