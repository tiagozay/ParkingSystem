import React, {useContext} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { FormaDePagamento } from '../models/FormaDePagamento';

interface TypeFormaDePagamentoContext 
{
    formasDePagamento: FormaDePagamento[]
}

export const FormaDePagamentoContext = createContext<TypeFormaDePagamentoContext>({formasDePagamento: []});

export default function FormasDePagamentoProvider({children}: {children: ReactNode}) {
    const [formasDePagamento, setFormasDePagamento] = useState([
        new FormaDePagamento(1, "Dinheiro", true),
        new FormaDePagamento(2, "Cartão de crédito", true),
        new FormaDePagamento(3, "Cartão de débito", true),
        new FormaDePagamento(4, "Cheque", false),
    ]);

    return (
        <FormaDePagamentoContext.Provider value={{formasDePagamento}}>
            {children}
        </FormaDePagamentoContext.Provider>
    );
}

export const useFormaDePagamentoContext = () => {
    const {formasDePagamento} = useContext(FormaDePagamentoContext);

    function buscarFormaDePagamentoPorId(id: number)
    {
        return formasDePagamento.find( formaDePagamento => formaDePagamento.id === id );
    }

    return {
        formasDePagamento,
        buscarFormaDePagamentoPorId
    }
}
