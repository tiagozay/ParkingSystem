import React, {useContext} from 'react'
import { Precificacao } from '../models/Precificacao';
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import CategoriaService from '../services/CategoriaService';

interface TypePrecificacaoContext 
{
    precificacoes: Precificacao[]
    setPrecificacoes: React.Dispatch<React.SetStateAction<Precificacao[] | []>>
}

export const PrecificacaoContext = createContext<TypePrecificacaoContext>({precificacoes: [], setPrecificacoes: () => {}});

export default function PrecificacoesProvider({children}: {children: ReactNode}) {
    const [precificacoes, setPrecificacoes] = useState(CategoriaService.buscaCategorias());


    // const [precificacoes, setPrecificacoes] = useState([
    //     new Precificacao(1, 'Carro', 20, 250, true, 20),
    //     new Precificacao(2, 'Moto', 10, 150, true, 25),
    //     new Precificacao(3, 'Jegue', 10, 150, false, 10),
    //     new Precificacao(4, 'Caminhão', 50, 550, true, 5),
    //     new Precificacao(5, 'Trator', 50, 550, true, 5),
    //     new Precificacao(6, 'Avião', 100, 1500, false, 2),
    // ]);

    return (
        <PrecificacaoContext.Provider value={{precificacoes, setPrecificacoes}}>
            {children}
        </PrecificacaoContext.Provider>
    );
}

export const usePrecificacaoContext = () => {
    const {precificacoes, setPrecificacoes} = useContext(PrecificacaoContext);

    function adicionarPrecificacao(precificacao: Precificacao)
    {
        //Gera provisióriamente um id em sequência do ultimo registro, para simular o que um banco de dados faria
        const ultimaPrecificacaoCadastrada = precificacoes[precificacoes.length - 1];
        if(ultimaPrecificacaoCadastrada){
            precificacao.id = (ultimaPrecificacaoCadastrada.id as number) + 1;
        }else{
            precificacao.id = 1;
        }

        setPrecificacoes([...precificacoes, precificacao] );
    }

    function removerPrecificacao(id: number)
    {
        setPrecificacoes(precificacoes.filter( precificacao => precificacao.id !== id ));
    }

    function buscaPrecificacaoPorId(id: number) 
    {
        return precificacoes.find(precificacao => precificacao.id === id);
    }

    function buscaPrecificacaoPorNome(nome: string) 
    {
        return precificacoes.find(precificacao => precificacao.categoria === nome);
    }

    function buscaValorHoraDeCategoria(categoria: string): number
    {
        const precificacao = precificacoes.find( precificacao => precificacao.categoria === categoria);
        
        return precificacao ? precificacao.valorHora : 0;
    }

    return {
        precificacoes,
        adicionarPrecificacao,
        removerPrecificacao,
        buscaValorHoraDeCategoria,
        buscaPrecificacaoPorId,
        buscaPrecificacaoPorNome
    }
}
