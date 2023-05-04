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
        new Mensalista(1, "Tiago zay", new Date('01 28 2006'), '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', true, '84620-000', 'PR', 'Cruz machado'),
        new Mensalista(2, "Zeno zay", new Date('01 28 2006'), '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', true, '84620-000', 'PR', 'Cruz machado'),
        new Mensalista(3, "Tiago zay", new Date('01 28 2006'), '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', false, '84620-000', 'PR', 'Cruz machado'),
        new Mensalista(4, "Zeno zay", new Date('01 28 2006'), '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', true, '84620-000', 'PR', 'Cruz machado'),
        new Mensalista(5, "Tiago zay", new Date('01 28 2006'), '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', true, '84620-000', 'PR', 'Cruz machado'),
        new Mensalista(6, "Zeno zay", new Date('01 28 2006'), '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', true, '84620-000', 'PR', 'Cruz machado'),
    ]);

    return (
        <MensalistaContext.Provider value={{mensalistas, setMensalistas}}>
            {children}
        </MensalistaContext.Provider>
    );
}

export const useMensalistaContext = () => {
    const {mensalistas, setMensalistas} = useContext(MensalistaContext);

    function buscarMensalistaPorId(id: number)
    {
        return mensalistas.find( mensalista => mensalista.id === id );
    }

    function adicionarMensalista(mensalista: Mensalista)
    {
        setMensalistas([...mensalistas, mensalista] );
    }

    function removerMensalista(id: number)
    {
        setMensalistas( mensalistas.filter( mensalista => mensalista.id !== id ) );
    }

    function editarMensalista(novoMensalista: Mensalista) 
    {
        setMensalistas( 
            mensalistas.map( mensalista => {
                if(mensalista.id === novoMensalista.id){
                    return novoMensalista;
                }

                return mensalista;
            } )
        );
    }


    return {
        mensalistas,
        buscarMensalistaPorId,
        adicionarMensalista,
        editarMensalista,
        removerMensalista
    }
}
