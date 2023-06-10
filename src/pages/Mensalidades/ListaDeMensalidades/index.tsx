import React from 'react';
import SelectFiltros from '../../../components/SelectFiltros';
import { Mensalidade } from '../../../models/Mensalidade';
import { DataService } from '../../../services/DataService';
import { useState } from 'react';
import PaginacaoService from '../../../services/PaginacaoService';
import LinksPaginacoes from '../../../components/LinksPaginacoes';
import { CpfService } from '../../../services/CpfService';
import ListaDeDados from '../../../components/ListaDeDados';
import { useMensalidadeContext } from '../../../contexts/MensalidadesContext';

interface ListaDeMensalidadesProps {
    mensalidades: Mensalidade[], 
    setSucessoExcluir: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ListaDeMensalidades({ mensalidades, setSucessoExcluir }: ListaDeMensalidadesProps) {
    const [statusFiltro, setStatusFiltro] = useState('Todas');
    const [filtroNome, setFiltroNome] = useState('');

    const {excluirMensalidade} = useMensalidadeContext();

    mensalidades = mensalidades.filter( mensalidade => !mensalidade.descontinuada );

    if (statusFiltro !== "Todas") {
        mensalidades = mensalidades.filter(mensalidade => mensalidade.status === statusFiltro);
    }

    const regExp = new RegExp(filtroNome, 'i');
    mensalidades = mensalidades.filter(mensalidade => regExp.test(mensalidade.mensalista.nome));

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>) {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>) {
        setFiltroNome(event.target.value.trim());
    }

    function aoClicarEmExcluir(id: number)
    {
        const confirm = window.confirm("Excluír esta mensalidade?");
        if(!confirm) return;

        excluirMensalidade(id)
            .then( () => {
                setSucessoExcluir(true);
            }) 
    }

    const jsxThead = (
        <thead>
            <tr>
                <td>Mensalista</td>
                <td>CPF</td>
                <td>Categoria</td>
                <td>Valor</td>
                <td>Forma de pagamento</td>
                <td>Data de compra</td>
                <td>Data de vencimento</td>
                <td>Status</td>
                <td className='campoDeAcoes'>Ações</td>
            </tr>
        </thead>
    );

    function paraCadaRegistro(mensalidade: Mensalidade) {
        return (
            <tr key={mensalidade.id}>
                <td>{mensalidade.mensalista.nome}</td>
                <td>{CpfService.formataCpf(mensalidade.mensalista.cpf)}</td>
                <td>{mensalidade.categoria.categoria}</td>
                <td>{DataService.formataValorMonetario(mensalidade.valor)}</td>
                <td>{mensalidade.formaDePagamento.nomeFormaDePagamento}</td>
                <td>{DataService.formataData(mensalidade.dataDeCompra)}</td>
                <td>{DataService.formataData(mensalidade.dataDeVencimento)}</td>
                <td>
                    {
                        mensalidade.status == 'Em dia' ?
                            <p className='statusAtivo'>{mensalidade.status}</p> :
                            <p className='statusVencido'>{mensalidade.status}</p>
                    }
                </td>
                <td className='campoDeAcoes'>
                    <button className='material-icons tabela__btnExcluir' onClick={() => aoClicarEmExcluir(mensalidade.id as number)}>delete</button>
                </td>
            </tr>
        )
    }

    return (
        <>
            <div className="divCamposSelectEBuscaDaTabela">
                <label>
                    Somente mensalidades
                    <SelectFiltros onChange={aoSelecionarFiltro} value={statusFiltro}>
                        <option value="Todas">Todas</option>
                        <option value="Em dia">Em dia</option>
                        <option value="Vencida">Vencidas</option>
                    </SelectFiltros>

                </label>

                <label>
                    Pesquisar
                    <input type="text" className="inputPesquisar" onChange={aoDigitarNome} />
                </label>
            </div>

            <ListaDeDados
                dados={mensalidades}
                registrosPorPagina={5}
                jsxThead={jsxThead}
                paraCadaRegistro={paraCadaRegistro}
            />
        </>
    )
}
