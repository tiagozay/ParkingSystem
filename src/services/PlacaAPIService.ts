import veiculos from '../json/db.json';

interface VeiculoAPI {
    id: number,
    placa: string, 
    segmento: string,
    marca: string, 
    modelo: string, 
    ano: number
}

export abstract class PlacaAPIService
{   
    static buscarVeiculoPorPlaca(placa: string): VeiculoAPI | null
    {
        const veiuclosEncontrados = veiculos.filter( veiculo => veiculo.placa === placa );

        return veiuclosEncontrados.length === 1 ? veiuclosEncontrados[0] : null;
    }
}