import { FormMethod } from 'react-router-dom';
import  api_formasDePagamento from '../json/api_formasDePagamento.json';
import { FormaDePagamento } from "../models/FormaDePagamento";
import { APIService } from './APIService';


export default abstract class FormaDePagamentoService
{
    static buscaFormasDePagamento(): Promise<FormaDePagamento[] | []>
    {
        return APIService.buscaObjetos('buscaFormasDePagamento.php')
            .then( formasDePagamentoObjeto => {
                    const formasDePagamento = formasDePagamentoObjeto.map( (formaDePagamento: any) => {
                        return new FormaDePagamento(
                            formaDePagamento.id,
                            formaDePagamento.nomeFormaDePagamento,
                            formaDePagamento.ativa,
                            formaDePagamento.descontinuada
                        );
                    } );

                    return formasDePagamento;
            });
    }

    static cadastraFormaDePagamento(novaFormaDePagamento: FormaDePagamento): Promise<FormaDePagamento>
    {
        return APIService.enviaObjeto('cadastraFormaDePagamento.php', novaFormaDePagamento)
        .then( (formaDePagamentoCadastrada) => {
            return new FormaDePagamento(
                formaDePagamentoCadastrada.id,
                formaDePagamentoCadastrada.nomeFormaDePagamento,
                formaDePagamentoCadastrada.ativa,
                formaDePagamentoCadastrada.descontinuada,                
            )
        } )
        .catch( () => {
            throw new Error("Erro ao cadastrar forma de pagamento."); 
        })        
    }

    static editaFormaDePagamento(novaFormaDePagamento: FormaDePagamento): Promise<FormaDePagamento>
    {
        return APIService.enviaObjeto('editarFormaDePagamento.php', novaFormaDePagamento)
        .then( (formaDePagamentoCadastrada) => {
            return new FormaDePagamento(
                formaDePagamentoCadastrada.id,
                formaDePagamentoCadastrada.nomeFormaDePagamento,
                formaDePagamentoCadastrada.ativa,
                formaDePagamentoCadastrada.descontinuada,                
            )
        } )
        .catch( () => {
            throw new Error("Erro ao editar forma de pagamento."); 
        })        
    }

    static excluiFormaDePagamento(id: number): Promise<FormaDePagamento | undefined>
    {
        return APIService.enviaObjeto('excluiFormaDePagamento.php', id)
            .then( formaDePagamentoDescontinuada => {
                if(formaDePagamentoDescontinuada){
                    return new FormaDePagamento(
                        formaDePagamentoDescontinuada.id,
                        formaDePagamentoDescontinuada.nomeFormaDePagamento,
                        formaDePagamentoDescontinuada.ativa,
                        formaDePagamentoDescontinuada.descontinuada,                
                    );
                }
            } )
            .catch( () => {
                throw new Error("Erro ao excluír forma de pagamento."); 
            } )
    }
}