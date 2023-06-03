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
}