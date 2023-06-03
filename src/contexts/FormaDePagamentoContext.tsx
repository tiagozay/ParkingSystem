import React, {useContext} from 'react'
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

        return APIService.enviaObjeto('cadastraFormaDePagamento.php', novaFormaDePagamento)
        .then( formaDePagamentoCadastrada => {
            setFormasDePagamento([...formasDePagamento, formaDePagamentoCadastrada]);
        } )
        .catch( () => {
            throw new Error("Erro ao cadastrar forma de pagamento."); 
        })        
    }

    function editarFormaDePagamento(novaFormaDePagamento: FormaDePagamento)
    {
        setFormasDePagamento( formasDePagamento.map( formaDePagamento => {
            if(formaDePagamento.id === novaFormaDePagamento.id){
                return novaFormaDePagamento;
            }

            return formaDePagamento;
        } ) );
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
