import React, {useContext} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { FormaDePagamento } from '../models/FormaDePagamento';
import FormaDePagamentoService from '../services/FormaDePagamentoService';

interface TypeFormaDePagamentoContext 
{
    formasDePagamento: FormaDePagamento[],
    setFormasDePagamento: React.Dispatch<React.SetStateAction<FormaDePagamento[]>>
}

export const FormaDePagamentoContext = createContext<TypeFormaDePagamentoContext>({formasDePagamento: [], setFormasDePagamento: () => {}});

export default function FormasDePagamentoProvider({children}: {children: ReactNode}) {
    const [formasDePagamento, setFormasDePagamento] = useState(FormaDePagamentoService.buscaFormasDePagamento());

    // const [formasDePagamento, setFormasDePagamento] = useState([
    //     new FormaDePagamento(1, "Dinheiro", true),
    //     new FormaDePagamento(2, "Cartão de crédito", true),
    //     new FormaDePagamento(3, "Cartão de débito", true),
    //     new FormaDePagamento(4, "Cheque", false),
    // ]);

    return (
        <FormaDePagamentoContext.Provider value={{formasDePagamento, setFormasDePagamento}}>
            {children}
        </FormaDePagamentoContext.Provider>
    );
}

export const useFormaDePagamentoContext = () => {
    const {formasDePagamento, setFormasDePagamento} = useContext(FormaDePagamentoContext);

    function adicionaFormaDePagamento(novaFormaDePagamento: FormaDePagamento)
    {
        //Gera provisióriamente um id em sequência do ultimo registro, para simular o que um banco de dados faria
        const ultimaFormaDePagamentoCadastrada = formasDePagamento[formasDePagamento.length - 1];
        if(ultimaFormaDePagamentoCadastrada){
            novaFormaDePagamento.id = (ultimaFormaDePagamentoCadastrada.id as number) + 1;
        }else{
            novaFormaDePagamento.id = 1;
        }

        setFormasDePagamento([...formasDePagamento, novaFormaDePagamento] );
    }

    function buscarFormaDePagamentoPorId(id: number)
    {
        return formasDePagamento.find( formaDePagamento => formaDePagamento.id === id );
    }

    return {
        formasDePagamento,
        buscarFormaDePagamentoPorId,
        adicionaFormaDePagamento
    }
}
