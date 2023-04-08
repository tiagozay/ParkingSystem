import React from 'react';
import './LinksPaginacoes.css';

interface LinksPaginacoesProps {
    quantidadeDePaginas: number,
    paginaAtiva: number,
    setPaginaAtiva: (pagina: number) => void, 
}

export default function LinksPaginacoes({
        quantidadeDePaginas, 
        paginaAtiva,
        setPaginaAtiva,
    }: LinksPaginacoesProps) {

    const arrayDeNumeros = [];

    for (let i = 1; i <= quantidadeDePaginas; i++) {
        arrayDeNumeros.push(i);
    }

    function clickSelecionarPagina(numeroPagina: number)
    {
        setPaginaAtiva(numeroPagina);
    }

    function clickAvancarPagina()
    {
        if(paginaAtiva === quantidadeDePaginas){
            return;
        }
        setPaginaAtiva(paginaAtiva + 1);
    }

    function clickVoltarPagina()
    {
        if(paginaAtiva === 1){
            return;
        }
        setPaginaAtiva(paginaAtiva - 1);
    }

    return (
        <tr>
            <td colSpan={20}>
                <nav id='navPaginacao'>
                    <a 
                        className={`
                            material-icons 
                            btnVoltarOuAvancarPagina 
                            ${paginaAtiva === 1 && 'btnDesativado'}
                        `} 
                        onClick={clickVoltarPagina}>
                            arrow_back_ios_new
                    </a>

                    {arrayDeNumeros.map( numero => (
                        <a 
                            key={numero} 
                            className={`
                                numeroDaPagina 
                                ${paginaAtiva == numero ? 'btnPaginacaoAtivado' : ""}
                            `} 
                            onClick={() => clickSelecionarPagina(numero)}
                        >
                            {numero}
                        </a>
                    ) )}
                    
                    <a 
                        className={`
                            material-icons 
                            btnVoltarOuAvancarPagina 
                            ${paginaAtiva === quantidadeDePaginas && 'btnDesativado'}
                        `} 
                        onClick={clickAvancarPagina}>
                            arrow_forward_ios
                    </a>
                </nav>
            </td>
        </tr>
    )
}
