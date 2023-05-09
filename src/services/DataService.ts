export abstract class DataService {

    static formataValorMonetario(valor: number): string
    {
        const valorFormatado = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

          return valorFormatado;
    }

    static corrigeFusoHorario(data : Date)
    {
        //Pega a diferença de fuso horário e adiciona na data, corrigindo o atraso, transformando na data correta novamente 
        return new Date(data.getTime() + (data.getTimezoneOffset() * 60 * 1000));
    }

    static formataData(data: Date)
    {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = String(data.getFullYear());
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    }

    static formataDataPadraoInput(data: Date)
    {
        const ano = String(data.getFullYear());
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`;
        return dataFormatada;
    }

    static formataDataComHorario(data: Date)
    {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = String(data.getFullYear());
        const hora = String(data.getHours()).padStart(2, '0');
        const minuto = String(data.getMinutes()).padStart(2, '0');
        const segundo = String(data.getSeconds()).padStart(2, '0');
        const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
        return dataFormatada;
    }
}