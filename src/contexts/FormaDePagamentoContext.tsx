import React, {useContext, useEffect} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { FormaDePagamento } from '../models/FormaDePagamento';
import FormaDePagamentoService from '../services/FormaDePagamentoService';
import { APIService } from '../services/APIService';

interface TypeFormaDePagamentoContext 
{
    formasDePagamento: FormaDePagamento[],
    setFormasDePagamento: React.Dispatch<React.SetStateAction<FormaDePagamento[]>>
}

export const FormaDePagamentoContext = createContext<TypeFormaDePagamentoContext>({formasDePagamento: [], setFormasDePagamento: () => {}});

export default function FormasDePagamentoProvider({children}: {children: ReactNode}) {
    const [formasDePagamento, setFormasDePagamento] = useState<FormaDePagamento[] | []>([]);

    useEffect(() => {
        FormaDePagamentoService.buscaFormasDePagamento()
        .then( setFormasDePagamento );
    }, []);

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
        return FormaDePagamentoService.cadastraFormaDePagamento(novaFormaDePagamento)
            .then( formaDePagamentoCadastrada => {
                setFormasDePagamento([...formasDePagamento, formaDePagamentoCadastrada])
            });
    }

    function editarFormaDePagamento(novaFormaDePagamento: FormaDePagamento)
    {

        return FormaDePagamentoService.editaFormaDePagamento(novaFormaDePagamento)
            .then( formasDePagamentoEditada => {
                setFormasDePagamento( formasDePagamento.map( formaDePagamento => {
                    if(formaDePagamento.id === formasDePagamentoEditada.id){
                        return formasDePagamentoEditada;
                    }
        
                    return formaDePagamento;
                } ) );
            } );
    }

    function excluirFormaDePagamento(idFormaDePagamento: number)
    {
        const formaDePagamento = buscarFormaDePagamentoPorId(idFormaDePagamento);

        if(formaDePagamento){
            formaDePagamento.descontinuada = true;
            editarFormaDePagamento(formaDePagamento);
        }
    }

    function buscarFormaDePagamentoPorId(id: number)
    {
        return formasDePagamento.find( formaDePagamento => formaDePagamento.id === id );
    }

    return {
        formasDePagamento,
        buscarFormaDePagamentoPorId,
        editarFormaDePagamento,
        excluirFormaDePagamento,
        adicionaFormaDePagamento
    }
}
