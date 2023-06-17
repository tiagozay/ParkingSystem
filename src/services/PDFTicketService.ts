import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ContentStack, ContentTocItem, Margins } from 'pdfmake/interfaces';
import { Sistema } from '../models/Sistema';
import { DataService } from './DataService';
import { Ticket } from '../models/Ticket';
import { FormaDePagamento } from '../models/FormaDePagamento';

export default abstract class PDFTicketService {
    public static gerarPDFTicekt(sistema: Sistema, ticket: Ticket) {

        if(!(sistema instanceof Sistema)){
            return;
        }
        
        const nomeEstacionamento = sistema.razaoSocial;
        const cnpj = sistema.cnpj;
        const endereco = sistema.endereco;
        const numero = sistema.numero;
        const cidade = sistema.cidade;
        const cep = sistema.cep;
        const telefoneFixo = sistema.telefoneFixo;
        const telefoneCelular = sistema.telefoneCelular;
        const email = sistema.email;
        const nomeFantasia = sistema.nomeFantasia;
        const descricao = sistema.descricao;
        const dataAtual = DataService.formataDataComHorario(new Date());

        const tipoCliente = ticket.mensalista ? "Mensalista" : "Avuslo";
        const placaVeiculo = ticket.placaVeiculo;
        const marcaVeiculo = ticket.marcaVeiculo;
        const modeloVeiculo = ticket.modeloVeiculo;
        const categoriaVeiculo = ticket.precificacao.categoria;
        const valorHora = ticket.valorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const dataDeEntrada = DataService.formataDataComHorario(ticket.dataDeEntrada);
        const dataDeSaida = ticket.dataDeSaida ? DataService.formataDataComHorario(ticket.dataDeSaida) : "Em aberto";
        const tempoDecorrido = ticket.tempoDecorrido;
        const valorPago = ticket.calculaTotalAPagar(ticket.valorHora).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        let formaDePagamento = "Em aberto";

        if(ticket.formaDePagamento){
            formaDePagamento = ticket.formaDePagamento instanceof FormaDePagamento ? ticket.formaDePagamento.nomeFormaDePagamento : ticket.formaDePagamento;
        }

        pdfMake.vfs = pdfFonts.pdfMake.vfs;


        function linhaInformacaoEmpresa(conteudo: string) {
            return {
                text: conteudo,
                alignment: "center",
                fontSize: 9,
                margin: [0, 0, 0, 2]
            } as ContentTocItem;
        }


        function linhaSeparadora() {
            return {
                stack: [
                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0,
                                y1: 0,
                                x2: 155,
                                y2: 0,
                                lineWidth: 1,
                                lineColor: '#000000',
                            },
                        ],
                    },
                ],
                margin: [0, 20, 0, 20],
            } as ContentStack;
        }

        function linhaInformacaoVeiculo(titulo: string, conteudo: string) {
            return {
                text: [
                    { text: titulo, bold: true, fontSize: 8 },
                    { text: conteudo, fontSize: 8 },
                ],
                margin: [12, 0, 0, 2],
            } as ContentTocItem;
        }

        function linhaRodape(conteudo: string) {
            return {
                text: conteudo,
                alignment: "center",
                fontSize: 10,
                margin: [0, 0, 0, 2],
            } as ContentTocItem;
        }

        const documentDefinition = {
            pageSize: {
                width: 155,  // Convertido para pixels (5.5 cm * 72 DPI)
                height: 396, // Convertido para pixels (14 cm * 72 DPI)
            },
            pageMargins: [1, 20, 1, 1] as Margins,
            content: [
                linhaInformacaoEmpresa(nomeEstacionamento),
                linhaInformacaoEmpresa("CNPJ: " + cnpj),
                linhaInformacaoEmpresa(endereco + " - " + numero),
                linhaInformacaoEmpresa(cidade + "  " + cep),
                linhaInformacaoEmpresa(telefoneFixo + "  " + telefoneCelular),
                linhaInformacaoEmpresa(email),

                linhaSeparadora(),

                linhaInformacaoVeiculo("Tipo cliente: ", tipoCliente),
                linhaInformacaoVeiculo("Placa veículo: ", placaVeiculo),
                linhaInformacaoVeiculo("Marca veículo: ", marcaVeiculo),
                linhaInformacaoVeiculo("Modelo veículo: ", modeloVeiculo),
                linhaInformacaoVeiculo("Categoria veiculo: ", categoriaVeiculo),
                linhaInformacaoVeiculo("Valor hora: ", valorHora),
                linhaInformacaoVeiculo("Data de entrada: ", dataDeEntrada),
                linhaInformacaoVeiculo("Data de saída: ", dataDeSaida),
                linhaInformacaoVeiculo("Tempo decorrido(hh:mm): ", tempoDecorrido),
                linhaInformacaoVeiculo("Valor pago: ", valorPago),
                linhaInformacaoVeiculo("Forma de pagamento: ", formaDePagamento),

                linhaSeparadora(),

                {
                    stack: [
                        linhaRodape(nomeFantasia),
                        linhaRodape(descricao),
                        linhaRodape(dataAtual),
                    ],
                    margin: [0, 40, 0, 0]
                }as ContentStack
            
            ],
        };

        pdfMake.createPdf(documentDefinition).open();
    }
}