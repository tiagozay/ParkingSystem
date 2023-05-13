import React, {useContext} from 'react'
import { Precificacao } from '../models/Precificacao';
import { useState } from 'react';
import { createContext, ReactNode } from 'react';

interface TypePrecificacaoContext 
{
    precificacoes: Precificacao[]
}

export const PrecificacaoContext = createContext<TypePrecificacaoContext>({precificacoes: []});

export default function PrecificacoesProvider({children}: {children: ReactNode}) {
    const [precificacoes, setPrecificacoes] = useState([
        new Precificacao(1, 'Carro', 20, 250, true, 20),
        new Precificacao(2, 'Moto', 10, 150, true, 25),
        new Precificacao(3, 'Jegue', 10, 150, false, 10),
        new Precificacao(4, 'Caminhão', 50, 550, true, 5),
        new Precificacao(5, 'Trator', 50, 550, true, 5),
        new Precificacao(6, 'Avião', 100, 1500, false, 2),
    ]);

    return (
        <PrecificacaoContext.Provider value={{precificacoes}}>
            {children}
        </PrecificacaoContext.Provider>
    );
}

export const usePrecificacaoContext = () => {
    const {precificacoes} = useContext(PrecificacaoContext);

    function buscaPrecificacaoPorId(id: number) 
    {
        return precificacoes.find(precificacao => precificacao.id === id);
    }

    function buscaValorHoraDeCategoria(categoria: string): number
    {
        const precificacao = precificacoes.find( precificacao => precificacao.categoria === categoria);
        
        return precificacao ? precificacao.valorHora : 0;
    }

    return {
        precificacoes,
        buscaValorHoraDeCategoria,
        buscaPrecificacaoPorId
    }
}
