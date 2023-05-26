import React, {useContext} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Mensalidade } from '../models/Mensalidade';
import { useMensalistaContext } from './MensalistasContext';
import { usePrecificacaoContext } from './PrecificacaoContext';
import { useFormaDePagamentoContext } from './FormaDePagamentoContext';
import { Mensalista } from '../models/Mensalista';
import { Precificacao } from '../models/Precificacao';
import { FormaDePagamento } from '../models/FormaDePagamento';
import MensalidadeService from '../services/MensalidadeService';

interface TypeMensalidadeContext 
{
    mensalidades: Mensalidade[],
    setMensalidades: Function
}

export const MensalidadeContext = createContext<TypeMensalidadeContext>({mensalidades: [], setMensalidades: () => {}});

export default function MensalidadesProvider({children}: {children: ReactNode}) {
    const {buscarMensalistaPorId} = useMensalistaContext();
    const {buscaPrecificacaoPorId} = usePrecificacaoContext();
    const {buscarFormaDePagamentoPorId} = useFormaDePagamentoContext();

    const [mensalidades, setMensalidades] = useState(MensalidadeService.buscaMensalidades());

    // const [mensalidades, setMensalidades] = useState([
    //     new Mensalidade(
    //         1,
    //         buscarMensalistaPorId(1) as Mensalista,
    //         buscaPrecificacaoPorId(1) as Precificacao,
    //         buscarFormaDePagamentoPorId(1) as FormaDePagamento,
    //         new Date(),
    //     ),
    //     new Mensalidade(
    //         2,
    //         buscarMensalistaPorId(2) as Mensalista,
    //         buscaPrecificacaoPorId(2) as Precificacao,
    //         buscarFormaDePagamentoPorId(1) as FormaDePagamento,
    //         new Date(),
    //     ),
    //     new Mensalidade(
    //         3,
    //         buscarMensalistaPorId(3) as Mensalista,
    //         buscaPrecificacaoPorId(2) as Precificacao,
    //         buscarFormaDePagamentoPorId(2) as FormaDePagamento,
    //         new Date(),
    //     ),
    //     new Mensalidade(
    //         4,
    //         buscarMensalistaPorId(4) as Mensalista,
    //         buscaPrecificacaoPorId(1) as Precificacao,
    //         buscarFormaDePagamentoPorId(3) as FormaDePagamento,
    //         new Date(),
    //     ),
    //     new Mensalidade(
    //         5,
    //         buscarMensalistaPorId(1) as Mensalista,
    //         buscaPrecificacaoPorId(1) as Precificacao,
    //         buscarFormaDePagamentoPorId(3) as FormaDePagamento,
    //         new Date(' 04 12 2023 '),
    //     ),
    //     new Mensalidade(
    //         6,
    //         buscarMensalistaPorId(2) as Mensalista,
    //         buscaPrecificacaoPorId(1) as Precificacao,
    //         buscarFormaDePagamentoPorId(3) as FormaDePagamento,
    //         new Date(' 04 05 2023 '),
    //     ),
    // ]);

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

        //Gera provisióriamente um id em sequência do ultimo registro, para simular o que um banco de dados faria
        const ultimaMensalidadeCadastrada = mensalidades[mensalidades.length - 1];
        if(ultimaMensalidadeCadastrada){
            mensalidade.id = (ultimaMensalidadeCadastrada.id as number) + 1;
        }else{
            mensalidade.id = 1;
        }

        setMensalidades([...mensalidades, mensalidade] );
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
