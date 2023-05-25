import React, {useContext} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Mensalista } from '../models/Mensalista';
import MensalistaService from '../services/MensalistaService';

interface TypeMensalistaContext 
{
    mensalistas: Mensalista[],
    setMensalistas: Function
}

export const MensalistaContext = createContext<TypeMensalistaContext>({mensalistas: [], setMensalistas: () => {}});

export default function MensalistasProvider({children}: {children: ReactNode}) {

    const [mensalistas, setMensalistas] = useState(MensalistaService.buscaMensalistas());

    // const [mensalistas, setMensalistas] = useState([
    //     new Mensalista(1, "Tiago zay", new Date('01 28 2006'), '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', '84620-000', 'PR', 'Cruz machado', true),
    //     new Mensalista(2, "Zeno zay", new Date('01 28 2006'), '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', '84620-000', 'PR', 'Cruz machado', true),
    //     new Mensalista(3, "Sueli zay", new Date('06 02 1982'), '037.765.559-71', 'suelizay@gmail.com', '(42) 99956-7084', '84620-000', 'PR', 'Cruz machado', true),
    //     new Mensalista(4, "Gustavo zay", new Date('02 11 2012'), '334.845.341-09', 'gustavozay@gmail.com', '(42) 99956-7084', '84620-000', 'PR', 'Cruz machado', true),
    //     new Mensalista(5, "Pedro souza", new Date('07 10 2004'), '978.132.362-03', 'predrosouza@gmail.com', '(42) 99931-8075', '84620-000', 'PR', 'Cruz machado', true),
    //     new Mensalista(6, "André soares", new Date('01 15 1982'), '653.061.561-00', 'adnrésoares@gmail.com', '(42) 99956-7084', '84620-000', 'PR', 'Cruz machado', true),
    // ]);

    return (
        <MensalistaContext.Provider value={{mensalistas, setMensalistas}}>
            {children}
        </MensalistaContext.Provider>
    );
}

export const useMensalistaContext = () => {
    const {mensalistas, setMensalistas} = useContext(MensalistaContext);

    function verificaSeJaTemMensalistaComCpf(cpf: string) 
    {
        return mensalistas.some( mensalista => mensalista.cpf === cpf );
    }

    function buscarMensalistaPorId(id: number)
    {
        return mensalistas.find( mensalista => mensalista.id === id );
    }

    function adicionarMensalista(mensalista: Mensalista)
    {
        if(verificaSeJaTemMensalistaComCpf(mensalista.cpf)){
            throw new Error("Já existe um mensalista com este CPF");
        }

        //Gera provisióriamente um id em sequência do ultimo registro, para simular o que um banco de dados faria
        const ultimoMensalistaCadastrado = mensalistas[mensalistas.length - 1];
        if(ultimoMensalistaCadastrado){
            mensalista.id = (ultimoMensalistaCadastrado.id as number) + 1;
        }else{
            mensalista.id = 1;
        }

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
        verificaSeJaTemMensalistaComCpf,
        adicionarMensalista,
        editarMensalista,
        removerMensalista
    }
}
