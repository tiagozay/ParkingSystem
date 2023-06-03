import  api_formasDePagamento from '../json/api_formasDePagamento.json';
import { FormaDePagamento } from "../models/FormaDePagamento";
import { APIService } from './APIService';


export default abstract class FormaDePagamentoService
{
    static buscaFormasDePagamento()
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

    static cadastraFormaDePagamento(novaFormaDePagamento: FormaDePagamento)
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
}