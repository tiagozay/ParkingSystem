import { Mensalista } from "../models/Mensalista";
import  api_formasDePagamento from '../json/api_formasDePagamento.json';
import { Precificacao } from "../models/Precificacao";
import { FormaDePagamento } from "../models/FormaDePagamento";


export default abstract class FormaDePagamentoService
{
    static buscaFormaDePagamentoPorId(id: number): FormaDePagamentoService | undefined
    {
        const formaDePagamentoDados = api_formasDePagamento.find( formaDePagamento => 
            formaDePagamento.id = id);

        if(!formaDePagamentoDados) return undefined;
    
        const formaDePagamento = new FormaDePagamento(
            formaDePagamentoDados.id,
            formaDePagamentoDados.nome,
            formaDePagamentoDados.ativa,
        );
        
        return formaDePagamento;
    }

    static buscaMensalistas(): Mensalista[] | []
    {
        return [];
    }
}