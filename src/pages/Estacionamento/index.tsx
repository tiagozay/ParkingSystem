import React from 'react';
import './Estacionamento.css'
import { Tiket } from '../../models/Tiket';
import { Veiculo } from '../../models/Veiculo';
import ListaDeTikets from './ListaDeTikets';
import { Link } from 'react-router-dom';
import BoasVindas from '../../components/BoasVindas';

export default function Estacionamento() {

    const tikets = [
        new Tiket(
            1,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto'),
            new Date(),
            null,
            25,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            2,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto'),
            new Date(),
            null,
            25,
            "Pago",
            null,
            null
        ),
        new Tiket(
            3,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto'),
            new Date(),
            null,
            25,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            4,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro'),
            new Date(),
            null,
            30,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            5,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto'),
            new Date(),
            null,
            25,
            "Pago",
            null,
            null
        ),
        new Tiket(
            6,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro'),
            new Date(),
            null,
            30,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            7,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto'),
            new Date(),
            null,
            25,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            8,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto'),
            new Date(),
            null,
            25,
            "Pago",
            null,
            null
        ),
        new Tiket(
            9,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto'),
            new Date(),
            null,
            25,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            10,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro'),
            new Date(),
            null,
            30,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            11,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto'),
            new Date(),
            null,
            25,
            "Pago",
            null,
            null
        ),
        new Tiket(
            12,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro'),
            new Date(),
            null,
            30,
            "Em aberto",
            null,
            null
        ),
    ]


  return (
    <section id="estacionamento">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">local_parking</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Tickets de estacionamento</h2>
                        <span>Listando tickets cadastrados</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <a className="btnTrocarDePagina" data-pagina="home"><i className="material-icons">home</i></a> 
                    <span className="barraSeparadora">/</span>
                    <a className="infoPagina">Estacionamento</a>
                </div>
             
            </div>

            <BoasVindas />

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <Link to="cadastrarTiket" id="btnAdicionarNovo" data-pagina="formularioAdcNovoTiket">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>
    
                <ListaDeTikets tikets={tikets} />
        
            </section>

        </section>
  )
}
