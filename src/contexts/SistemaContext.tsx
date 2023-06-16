import React, {useContext, useEffect} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Sistema } from '../models/Sistema';
import { APIService } from '../services/APIService';
import ConfigSistemaService from '../services/ConfigSistemaService';

interface TypeSistemaContext 
{
    sistema: Sistema | {}
    setSistema: React.Dispatch<React.SetStateAction<Sistema>>
}

export const SistemaContext = createContext<TypeSistemaContext>({sistema: {}, setSistema: () => {}});

export default function SistemaProvider({children}: {children: ReactNode}) {
    const [sistema, setSistema] = useState<Sistema | {}>({});

    useEffect(() => {
        
        ConfigSistemaService.buscaConfigDoSistema()
            .then( setSistema );

    }, []);

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
