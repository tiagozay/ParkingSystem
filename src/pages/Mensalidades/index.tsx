import React from 'react';
import "./Mensalidades.css";
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import ListaDeMensalidades from './ListaDeMensalidades';
import { Mensalidade } from '../../models/Mensalidade';
import { Mensalista } from '../../models/Mensalista';

export default function Mensalidades() {

    const mensalidades = [
        new Mensalidade(1, new Mensalista(1, "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro",  new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'),  'Vencida'),
        new Mensalidade(2, new Mensalista(2, "Tiago", '132.025.979-06', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro",  new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'),  'Ativa'),
        new Mensalidade(3, new Mensalista(3, "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro",  new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'),  'Vencida'),
        new Mensalidade(4, new Mensalista(4, "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro",  new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'),  'Vencida'),
        new Mensalidade(5, new Mensalista(5, "Tiago", '132.025.979-06', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro",  new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'),  'Ativa'),
        new Mensalidade(6, new Mensalista(6, "José", '11111111111', 'jose@gmail.com', '42999999999', false), 'Moto', 130.00, "Dinheiro",  new Date('2023-01-04T03:24:00'), new Date('2023-02-04T03:24:00'),  'Vencida'),
    ];

    return (
        <section id="mensalidades">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">payments</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Mensalidades cadastradas</h2>
                        <span>Listando todas as mensalidades cadastradas</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/mensalidades'>
                        Mensalidades
                    </Link>
                </div>
            </div>

            <BoasVindas />

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <button className="btnTrocarDePagina" data-pagina="formularioCadastroNovaMensalidade" id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </button>
                </div>

                <ListaDeMensalidades mensalidades={mensalidades}/>
            </section>


        </section>
    )
}
