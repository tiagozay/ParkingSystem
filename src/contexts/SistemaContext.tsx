import React, {useContext} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Sistema } from '../models/Sistema';

interface TypeSistemaContext 
{
    sistema: Sistema | {}
    setSistema: React.Dispatch<React.SetStateAction<Sistema>>
}

export const SistemaContext = createContext<TypeSistemaContext>({sistema: {}, setSistema: () => {}});

export default function SistemaProvider({children}: {children: ReactNode}) {
    const [sistema, setSistema] = useState(new Sistema(
        "ParkScape Estacionamento",
        "ParkScape",
        "97.153.682/0001-04",
        "1928192",
        "(42) 3522-2937",
        "(42) 99931-8075",
        "84620-000",
        "Avenida paulista",
        "27",
        "União da vitória",
        "PR",
        "www.parkscape.com",
        "parkscape@gmail.com",
        "Estacionando seus momentos"
    ));

    return (
        <SistemaContext.Provider value={{sistema, setSistema}}>
            {children}
        </SistemaContext.Provider>
    );
}

export const useSistemaContext = () => {
    const {sistema, setSistema} = useContext(SistemaContext);

    function editarConfiguracoesDoSistema(novoSistema: Sistema)
    {
        setSistema(novoSistema);
    }

    return {
        sistema,
        editarConfiguracoesDoSistema,
    }
}
