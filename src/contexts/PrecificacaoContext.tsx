import React, {useContext, useEffect} from 'react'
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
    const [precificacoes, setPrecificacoes] = useState<Precificacao[] | []>([]);

    useEffect( () => {
        CategoriaService.buscaCategorias()
            .then( setPrecificacoes );
    }, [] )

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
        return CategoriaService.cadastraPrecificacao(precificacao)
            .then( (precificacaoCadastrada: Precificacao) => {
                setPrecificacoes([...precificacoes, precificacaoCadastrada]);
            } );
    }

    function removerPrecificacao(id: number)
    {
        setPrecificacoes(precificacoes.filter( precificacao => precificacao.id !== id ));
    }

    function editarPrecificacao(novaPrecificacao: Precificacao)
    {

        return CategoriaService.editaPrecificacao(novaPrecificacao)
            .then( precificacaoEditada => {
                setPrecificacoes( 
                    precificacoes.map( precificacao => {
                        if(precificacao.id === precificacaoEditada.id){
                            return precificacaoEditada;
                        }
        
                        return precificacao;
                } ) );
            } )

        
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
        editarPrecificacao,
        removerPrecificacao,
        buscaValorHoraDeCategoria,
        buscaPrecificacaoPorId,
        buscaPrecificacaoPorNome
    }
}
