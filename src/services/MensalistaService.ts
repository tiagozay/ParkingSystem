import { Mensalista } from "../models/Mensalista";
import  api_mensalistas from '../json/api_mensalistas.json';

export default abstract class MensalistaService
{
    // static buscaMensalistaPorId(id: number): Mensalista | undefined
    // {
    //     const mensalistaDados = api_mensalistas.find( mensalista => 
    //         mensalista.id = id);

    //     if(!mensalistaDados) return undefined;
    
    //     const mensalista = new Mensalista(
    //         mensalistaDados.id,
    //         mensalistaDados.nome,
    //         new Date( mensalistaDados.dataNascimento ),
    //         mensalistaDados.cpf,
    //         mensalistaDados.email,
    //         mensalistaDados.celular,
    //         mensalistaDados.cep,
    //         mensalistaDados.uf,
    //         mensalistaDados.cidade,
    //         mensalistaDados.ativo,
    //     );

    //     return mensalista;
    // }

    static buscaMensalistas(): Mensalista[] | []
    {
        return api_mensalistas.map( mensalistaDados => {
            return new Mensalista(
                mensalistaDados.id,
                mensalistaDados.nome,
                new Date(mensalistaDados.dataNascimento),
                mensalistaDados.cpf,
                mensalistaDados.email,
                mensalistaDados.celular,
                mensalistaDados.cep,
                mensalistaDados.uf,
                mensalistaDados.cidade,
                mensalistaDados.ativo,
            );
        } );
    }
}