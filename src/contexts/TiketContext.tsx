import React, {useContext} from 'react'
import { Precificacao } from '../models/Precificacao';
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Tiket } from '../models/Tiket';
import { Veiculo } from '../models/Veiculo';
import { usePrecificacaoContext } from './PrecificacaoContext';

interface TypeTiketContext 
{
    tikets: Tiket[],
    setTikets: Function
}

export const TiketContext = createContext<TypeTiketContext>({tikets: [], setTikets: () => {}});

export default function TiketsProvider({children}: {children: ReactNode}) {
    const {buscaValorHoraDeCategoria} = usePrecificacaoContext();

    const [tikets, setTikets] = useState([
        new Tiket(
            1,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            new Date(),
            null,
            25,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            2,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            new Date(),
            null,
            25,
            "Pago",
            null,
            null
        ),
        new Tiket(
            3,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            new Date(),
            null,
            25,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            4,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            new Date(),
            null,
            30,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            5,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            new Date(),
            null,
            25,
            "Pago",
            null,
            null
        ),
        new Tiket(
            6,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            new Date(),
            null,
            30,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            7,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            new Date(),
            null,
            25,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            8,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            new Date(),
            null,
            25,
            "Pago",
            null,
            null
        ),
        new Tiket(
            9,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            new Date(),
            null,
            25,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            10,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            new Date(),
            null,
            30,
            "Em aberto",
            null,
            null
        ),
        new Tiket(
            11,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            new Date(),
            null,
            25,
            "Pago",
            null,
            null
        ),
        new Tiket(
            12,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            new Date(),
            null,
            30,
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

    function adicionarTiket(novoTiket: Tiket)
    {
        setTikets([...tikets, novoTiket]);
    }

    return {
        tikets,
        adicionarTiket
    }
}
