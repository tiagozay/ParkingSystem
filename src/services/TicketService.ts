import { Mensalidade } from "../models/Mensalidade";
import { Mensalista } from "../models/Mensalista";
import { Precificacao } from "../models/Precificacao";
import { FormaDePagamento } from "../models/FormaDePagamento";
import { APIService } from "./APIService";
import { Ticket } from "../models/Ticket";


export default abstract class TicketService
{
    static buscaTickets(): Promise<Ticket[] | []>
    {
        return APIService.buscaObjetos('buscaTickets.php')
            .then( ticketsObjetos => {
                    const tickets = ticketsObjetos.map( (ticketOBJ: any) => {
                        return this.instanciaTicketComObjeto(ticketOBJ)
                    } );

                    return tickets;
            });
    }

    private static instanciaTicketComObjeto(ticketDados: any): Ticket
    {
        const precificacaoDoTicket = new Precificacao(
            ticketDados.precificacao.id,
            ticketDados.precificacao.categoria,
            ticketDados.precificacao.valorHora,
            ticketDados.precificacao.valorMensalidade,
            ticketDados.precificacao.numeroDeVagas,
            ticketDados.precificacao.ativa,
            ticketDados.precificacao.descontinuada,
        );

        let formaDePagamentoDoTicket: FormaDePagamento | "Mensalidade" | null = null;

        if(ticketDados.formaDePagamento){
            if(formaDePagamentoDoTicket === "Mensalidade"){
                formaDePagamentoDoTicket = "Mensalidade";
            }else {
                formaDePagamentoDoTicket = new FormaDePagamento(
                    ticketDados.formaDePagamento.id,
                    ticketDados.formaDePagamento.nomeFormaDePagamento,
                    ticketDados.formaDePagamento.ativa,
                    ticketDados.formaDePagamento.descontinuada
                )
            }
        }

        const mensalistaDoTicket = ticketDados.mensalista ? new Mensalista(
            ticketDados.mensalista.id,
            ticketDados.mensalista.nome,
            new Date(ticketDados.mensalista.dataNascimento),
            ticketDados.mensalista.cpf,
            ticketDados.mensalista.email,
            ticketDados.mensalista.celular,
            ticketDados.mensalista.cep,
            ticketDados.mensalista.uf,
            ticketDados.mensalista.cidade,
            ticketDados.mensalista.ativo,
            ticketDados.mensalista.descontinuado,
        ) : null;

        const mensalidadeDoTicekt = ticketDados.mensalidade && mensalistaDoTicket ? new Mensalidade(
            ticketDados.mensalidade.id,
            mensalistaDoTicket,
            precificacaoDoTicket,
            new FormaDePagamento(
                ticketDados.mensalidade.formaDePagamento.id,
                ticketDados.mensalidade.formaDePagamento.nomeFormaDePagamento,
                ticketDados.mensalidade.formaDePagamento.ativa,
                ticketDados.mensalidade.formaDePagamento.descontinuada,
            ),
            ticketDados.mensalidade.descontinuada,
            ticketDados.mensalidade.dataDeCompra,
            ticketDados.mensalidade.dataDeVencimento,
            ticketDados.mensalidade.vencida ? "Vencida" : "Em dia",
        ) : null;

        const ticket = new Ticket(
            ticketDados.id,
            ticketDados.placaVeiculo,
            ticketDados.marcaVeiculo,
            ticketDados.modeloVeiculo,
            new Date(ticketDados.dataDeEntrada),
            ticketDados.dataDeSaida ? new Date(ticketDados.dataDeSaida) : null,
            precificacaoDoTicket,
            ticketDados.pago ? "Pago" : "Em aberto",
            ticketDados.numeroDaVaga,
            formaDePagamentoDoTicket,
            mensalistaDoTicket,
            mensalidadeDoTicekt
        );

        return ticket;
    }

    public static cadastraTiket(novoTiecket: Ticket): Promise<Ticket>
    {
        return APIService.enviaObjeto('cadastraTicket.php', novoTiecket)
            .then( (ticketCadastradoOBJ) => {

                return this.instanciaTicketComObjeto(ticketCadastradoOBJ);

            } )
            .catch( (e) => {
                console.log(e);
                throw new Error("Erro ao cadastrar ticket."); 
            });  
    }

    static excluiTicket(id: number): Promise<void>
    {
        return APIService.enviaObjeto('excluiTicket.php', id)
            .catch( () => {
                throw new Error("Erro ao excluír ticket."); 
            } )
    }
}