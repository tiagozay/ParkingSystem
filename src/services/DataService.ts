export abstract class DataService {
    static formataCpf(cpf: string): string {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        return cpf;
    }

    static formataValorMonetario(valor: number): string
    {
        const valorFormatado = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

          return valorFormatado;
    }

    static formataData(data: Date)
    {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = String(data.getFullYear());
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    }
}