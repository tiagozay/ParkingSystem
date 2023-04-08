export default class PaginacaoService {
    static divideArrayEmPaginas(array: any[], registrosPorPagina: number)
    {
        const quantidadeDePaginas = Math.ceil(array.length / registrosPorPagina);

        let dadosDivididosEmPaginas = [];

        let start = 0;

        for (let i = 0; i < quantidadeDePaginas; i++) {
            dadosDivididosEmPaginas.push(array.slice(start, start + registrosPorPagina));
            start += registrosPorPagina;
        }

        return dadosDivididosEmPaginas;
    }
}