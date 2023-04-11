import { Precificacao } from "../models/Precificacao";

export abstract class PrecificacoesService
{
    static buscaTodasCategoriasAtivas(): Array<string>
    {
        const precificacoes = [
            new Precificacao(1, 'Carro', 15, 150, true, 36),
            new Precificacao(2, 'Moto', 10, 120, true, 27),
        ];

        return precificacoes
            .filter( precificacao => precificacao.ativa )
            .map( precificacao => precificacao.categoria );
    }

    static buscaPrecificacaoDeCategoria(categoria: string): Precificacao | undefined
    {
        const precificacoes = [
            new Precificacao(1, 'Carro', 15, 150, true, 36),
            new Precificacao(2, 'Moto', 10, 120, true, 27),
        ];

        return precificacoes.find( precificacao => precificacao.categoria == categoria );
    }
}