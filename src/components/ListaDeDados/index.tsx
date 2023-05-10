import { ReactNode, useState } from "react";
import PaginacaoService from "../../services/PaginacaoService";
import LinksPaginacoes from "../LinksPaginacoes";

interface ListaDeDadosProps {
    dados: Array<any>,
    registrosPorPagina: number,
    jsxThead: ReactNode,
    paraCadaRegistro: (value: any, index: number, array: any[]) => ReactNode
}

export default function ListaDeDados({ dados, registrosPorPagina, jsxThead, paraCadaRegistro }: ListaDeDadosProps) {
    const [paginaAtiva, setPaginaAtiva] = useState(1);

    //Verifica se a página que está sendo exibida é 0 e se há dados, se isso acontecer é sinal que a tabela passou por uma remoção total de seus registro (geralmente por um filtro de pesquisa) e o filtro foi removido, trazendo novamente seus dados, nesse caso, a posição da página é restaurada para a primeira página
    if (paginaAtiva === 0 && dados.length !== 0) {
        setPaginaAtiva(1);
    }

    const dadosDivididosEmPaginas = PaginacaoService.divideArrayEmPaginas(dados, registrosPorPagina);

    const quantidadeDePaginas = dadosDivididosEmPaginas.length;

    /* 
        Verifica se a pagina ativa é maior que a quantidade de páginas, se for, é sinal que o usuário está em uma página que não há mais registros porque ele excluiu, fazendo com que a página deixe de existir, com isso é nescessário navegar para uma página anterior. Se não for maior, exibe uma página normalmente.
        Independente do caso, é nescessário subtrair 1 do valor da página exibida, pois se estamos na página 1, o indice do array para ser acessado deve ser 0 (primeira página), se for dois, o índice para acessarmos deve ser 1 (segunda página), e assim sucessivamente
    */
    const indiceDaPaginaParaExibir = paginaAtiva > quantidadeDePaginas ?
        voltarUmaPagina() :
        paginaAtiva - 1;

    let dadosParaExibir = dadosDivididosEmPaginas[indiceDaPaginaParaExibir];

    function voltarUmaPagina() {
        setPaginaAtiva(paginaAtiva - 1);
        return paginaAtiva - 2;
    }

    return (
        <div className="containerTabela">
            <table id="tabelaTikets" className="tabelaPadrao">
                {jsxThead}
                <tbody>

                    {dadosParaExibir?.map(paraCadaRegistro)}

                </tbody>

                <tfoot>
                    {
                        dados.length > 0 ?
                            (
                                <LinksPaginacoes
                                    quantidadeDePaginas={quantidadeDePaginas}
                                    paginaAtiva={paginaAtiva}
                                    setPaginaAtiva={setPaginaAtiva}
                                />
                            ) :
                            (
                                <tr aria-rowspan={10}>
                                    <td colSpan={10}>
                                        <p className="mensagemSemRegistros">Nenhum registro encontrado!</p>
                                    </td>
                                </tr>

                            )
                    }

                </tfoot>
            </table>
        </div>
    )
}