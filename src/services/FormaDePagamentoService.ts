import  api_formasDePagamento from '../json/api_formasDePagamento.json';
import { FormaDePagamento } from "../models/FormaDePagamento";


export default abstract class FormaDePagamentoService
{
    static buscaFormasDePagamento(): FormaDePagamento[] | []
    {
        return api_formasDePagamento.map( formaDePagamentoDados => {
            return new FormaDePagamento(
                formaDePagamentoDados.id,
                formaDePagamentoDados.nome,
                formaDePagamentoDados.ativa
            );
        } );
    }
}