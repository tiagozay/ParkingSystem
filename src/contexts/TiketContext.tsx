import React, {useContext} from 'react'
import { Precificacao } from '../models/Precificacao';
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Tiket } from '../models/Tiket';
import { Veiculo } from '../models/Veiculo';
import { usePrecificacaoContext } from './PrecificacaoContext';

function geraDataA15min()
{
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() - 15);
    return agora;
}

interface TypeTiketContext 
{
    tikets: Tiket[],
    setTikets: Function,
}

export const TiketContext = createContext<TypeTiketContext>(
    {
        tikets: [], 
        setTikets: () => {},
    }
);

export default function TiketsProvider({children}: {children: ReactNode}) {
    const {buscaValorHoraDeCategoria} = usePrecificacaoContext();

    const [tikets, setTikets] = useState([
        new Tiket(
            1,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            10,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            2,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            10,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            3,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            10,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            4,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            geraDataA15min(),
            null,
            20,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            5,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            10,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            6,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            geraDataA15min(),
            null,
            20,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            7,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            10,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            8,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            10,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            9,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            10,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            10,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            geraDataA15min(),
            null,
            20,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            11,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            10,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            12,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            geraDataA15min(),
            null,
            20,
            "Em aberto",
            null,
            null
        ),
    ]);

    return (
        <TiketContext.Provider value={{tikets, setTikets}}>
            {children}
        </TiketContext.Provider>
    );
}

export const useTiketContext = () => {
    const {tikets, setTikets} = useContext(TiketContext);

    function buscarTiketPorId(id: number)
    {
        return tikets.find( tiket => tiket.id === id );
    }

    function adicionarTiket(novoTiket: Tiket)
    {
        //Gera provisióriamente um id em sequência do ultimo registro, para simular o que um banco de dados faria
        const ultimoTiketCadastrado = tikets[tikets.length - 1];
        if(ultimoTiketCadastrado){
            novoTiket.id = (ultimoTiketCadastrado.id as number) + 1;
        }else{
            novoTiket.id = 1;
        }

        setTikets([...tikets, novoTiket]);
    }

    function editarTiket(tiketEditado: Tiket)
    {
        setTikets(
            tikets.map( tiket => {
                if(tiket.id === tiketEditado.id){
                    return tiketEditado;
                }
                return tiket;
            } )
        )
    }

    function excluirTiket(id: number)
    {
        setTikets(tikets.filter(tiket => tiket.id !== id) );
    }

    return {
        tikets,
        buscarTiketPorId,
        adicionarTiket,
        editarTiket,
        excluirTiket,
    }
}
