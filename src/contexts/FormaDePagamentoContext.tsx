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
        return FormaDePagamentoService.excluiFormaDePagamento( idFormaDePagamento )    
            .then( formaDePagamentoDescontinuada => {

                //Verifica se foi retornada uma forma de pagamento, sem sim, é sinal de que ela não foi necessariamentre excluída, e sim somente descontinuada, aí ela é modificada no context. Se não veio nada de retorno, é sinal de que foi literalmente excluída, removendo-a do context 

                if(formaDePagamentoDescontinuada){
                    setFormasDePagamento( formasDePagamento.map( formaDePagamento => {
                        if(formaDePagamento.id === formaDePagamentoDescontinuada.id){
                            return formaDePagamentoDescontinuada;
                        }
            
                        return formaDePagamento;
                    } ) );
                }else {
                    setFormasDePagamento( 
                        formasDePagamento.filter( formaDePagamento => formaDePagamento.id !== idFormaDePagamento ) 
                    )
                }
            } );
    }

    function buscarFormaDePagamentoPorId(id: number)
    {
        const formaDePagamento = formasDePagamento.find( formaDePagamento => formaDePagamento.id === id );

        return formaDePagamento ? formaDePagamento : null;
    }

    return {
        formasDePagamento,
        buscarFormaDePagamentoPorId,
        editarFormaDePagamento,
        excluirFormaDePagamento,
        adicionaFormaDePagamento
    }
}
