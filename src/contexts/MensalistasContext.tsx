import React, {useContext} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Mensalista } from '../models/Mensalista';

interface TypeMensalistaContext 
{
    mensalistas: Mensalista[],
    setMensalistas: Function
}

export const MensalistaContext = createContext<TypeMensalistaContext>({mensalistas: [], setMensalistas: () => {}});

export default function MensalistasProvider({children}: {children: ReactNode}) {
    const [mensalistas, setMensalistas] = useState([
        new Mensalista(1, "Tiago zay", new Date('28-01-2006'), '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', true),
        new Mensalista(2, "Zeno zay", new Date('28-01-2006'), '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', true),
        new Mensalista(3, "Tiago zay", new Date('28-01-2006'), '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', false),
        new Mensalista(4, "Zeno zay", new Date('28-01-2006'), '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', true),
        new Mensalista(5, "Tiago zay", new Date('28-01-2006'), '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', true),
        new Mensalista(6, "Zeno zay", new Date('28-01-2006'), '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', true),
    ]);

    return (
        <MensalistaContext.Provider value={{mensalistas, setMensalistas}}>
            {children}
        </MensalistaContext.Provider>
    );
}

export const useMensalistaContext = () => {
    const {mensalistas, setMensalistas} = useContext(MensalistaContext);

    function adicionarMensalista(mensalista: Mensalista)
    {
        setMensalistas([...mensalistas, mensalista] );
    }

    function removerMensalista(id: number)
    {
        setMensalistas( mensalistas.filter( mensalista => mensalista.id !== id ) );
    }


    return {
        mensalistas,
        adicionarMensalista,
        removerMensalista
    }
}
