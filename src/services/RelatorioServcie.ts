import { Mensalidade } from "../models/Mensalidade";
import { Mensalista } from "../models/Mensalista";
import { Precificacao } from "../models/Precificacao";
import { Ticket } from "../models/Ticket";

export default abstract class RelatorioService
{
    private static mensalistasNaoDescontinuados(mensalistas: Mensalista[]): Mensalista[]
    {
        return mensalistas.filter( mensalistas => !mensalistas.descontinuado );
    }

    private static precificacoesNaoDescontinuadas( precificacoes: Precificacao[] ): Precificacao[]
    {
        return precificacoes.filter( precificacao => !precificacao.descontinuada );
    }

    public static totalDeMensalistas(mensalistas: Mensalista[]): number
    {
        return this.mensalistasNaoDescontinuados(mensalistas).length;
    }

    public static totalDeMensalistasAtivos(mensalistas: Mensalista[]): number
    {
        return this.mensalistasNaoDescontinuados(mensalistas).filter( mensalista => mensalista.ativo ).length;
    }

    public static totalDeMensalistasInativos(mensalistas: Mensalista[]): number
    {
        return this.mensalistasNaoDescontinuados(mensalistas).filter( mensalista => !mensalista.ativo ).length;
    }

    public static valorTotalFaturadoDeTicketsAvulsos(tickets: Ticket[]): number
    {
        const ticketsPagosAvulsos = tickets.filter( ticket => ticket.status === "Pago" && !ticket.mensalista );

        return ticketsPagosAvulsos.reduce( (previusValue, ticket) =>  ticket.calculaTotalAPagar(ticket.valorHora) + previusValue , 0 );
    }

    public static totalTicketsEmAberto(tickets: Ticket[]): number
    {
        return tickets.filter( ticket => ticket.status === "Em aberto" ).length;
    }

    public static totalTicketsPagos(tickets: Ticket[]): number
    {
        return tickets.filter( ticket => ticket.status === "Pago" ).length;
    }

    public static valorTotalFaturadoDeMensalidades(mensalidades: Mensalidade[]): number
    {
        return mensalidades.reduce( (previusValue, mensalidade) => mensalidade.valor + previusValue , 0 );
    }

    public static totalDeMensalidadesEmDia(mensalidades: Mensalidade[]): number
    {
        return mensalidades.filter( mensalidade => mensalidade.status === "Em dia" ).length;
    }

    public static totalDeMensalidadesVencidas(mensalidades: Mensalidade[]): number
    {
        return mensalidades.filter( mensalidade => mensalidade.status === "Vencida" ).length;
    }

    public static totalDeVagasEstacionamento(precificacoes: Precificacao[]): number
    {
        const precificacoesNaoDescontinuadas = this.precificacoesNaoDescontinuadas(precificacoes);

        return precificacoesNaoDescontinuadas.reduce( (previusValue, precificacao) => precificacao.numeroDeVagas + previusValue, 0 );
    }

    public static calculaTotalDeVagasLivresDeDeterminadaCategoria(categoria: Precificacao, tickets: Ticket[]): number
    {
        const ticketsEmAbertoDeCategoria = tickets.filter( ticket => ticket.status === "Em aberto" && ticket.precificacao.id === categoria.id );

        return categoria.numeroDeVagas - ticketsEmAbertoDeCategoria.length;
    }
    public static calculaTotalDeVagasOcupadasDeDeterminadaCategoria(categoria: Precificacao, tickets: Ticket[]): number
    {
        const vagasLivresDaCategoria = this.calculaTotalDeVagasLivresDeDeterminadaCategoria(categoria,tickets);
        const totalVagasCategoria = categoria.numeroDeVagas;

        return totalVagasCategoria - vagasLivresDaCategoria;
    }

    public static totalDeVagasLivresEstacionamento(precificacoes: Precificacao[], tickets: Ticket[]): number
    {
        const vagasLivresDeCadaCategoria = precificacoes.map( precificacao => {

            if(precificacao.descontinuada){
                return 0;
            }

            return this.calculaTotalDeVagasLivresDeDeterminadaCategoria(precificacao, tickets) 
        });

        return vagasLivresDeCadaCategoria.reduce( (previusValue, vagasLivres) => vagasLivres + previusValue, 0 );
    }

    public static totalDeVagasOcupadasEstacionamento(precificacoes: Precificacao[], tickets: Ticket[]): number
    {
        const totalDeVagasEstacionamento = this.totalDeVagasEstacionamento(precificacoes);

        const vagasLivresEstacionamento  = this.totalDeVagasLivresEstacionamento(precificacoes, tickets);

        return totalDeVagasEstacionamento - vagasLivresEstacionamento;

    }
}