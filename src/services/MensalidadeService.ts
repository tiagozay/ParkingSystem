import { Mensalidade } from "../models/Mensalidade";
import  api_mensalidades from '../json/api_mensalidades.json';
import { Mensalista } from "../models/Mensalista";
import { Precificacao } from "../models/Precificacao";
import { FormaDePagamento } from "../models/FormaDePagamento";


export default abstract class MensalidadeService
{
    static buscaMensalidades(): Mensalidade[] | []
    {

        return api_mensalidades.map( mensalidadeDados => {

            const mensalistaDaMensalidade = new Mensalista(
                mensalidadeDados.mensalista.id,
                mensalidadeDados.mensalista.nome,
                new Date(mensalidadeDados.mensalista.dataNascimento),
                mensalidadeDados.mensalista.cpf,
                mensalidadeDados.mensalista.email,
                mensalidadeDados.mensalista.celular,
                mensalidadeDados.mensalista.cep,
                mensalidadeDados.mensalista.uf,
                mensalidadeDados.mensalista.cidade,
                mensalidadeDados.mensalista.ativo
            );

            const categoriaDaMensalidade = new Precificacao(
                mensalidadeDados.categoria.id,
                mensalidadeDados.categoria.nome,
                mensalidadeDados.categoria.valorHora,
                mensalidadeDados.categoria.valorMensalidade,
                mensalidadeDados.categoria.ativa,
                mensalidadeDados.categoria.numeroDeVagas
            );

            const formaDePagamentoDaMensalidade = new FormaDePagamento(
                mensalidadeDados.formaDePagamento.id,
                mensalidadeDados.formaDePagamento.nome,
                mensalidadeDados.formaDePagamento.ativa,
                mensalidadeDados.formaDePagamento.descontinuada
            );

            return new Mensalidade(
                mensalidadeDados.id,
                mensalistaDaMensalidade,
                categoriaDaMensalidade,
                formaDePagamentoDaMensalidade,
                new Date( mensalidadeDados.dataDeCompra ),
                mensalidadeDados.status as "Em dia" | "Vencida"
            );

        } );
    }
}