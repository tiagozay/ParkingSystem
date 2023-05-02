import { CpfService } from "../services/CpfService";
import { DataService } from "../services/DataService";

export class Mensalista
{
    public readonly id: number | null;
    public nome: string;
    public dataNascimento: Date | null;
    public _cpf: string;
    public email: string | null;
    public celular: string;
    public ativo: boolean;

    constructor(
        id: number | null,
        nome: string,
        dataNascimento: Date | null,
        cpf: string,
        email: string | null, 
        celular: string,
        ativo: boolean
    ){
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.celular = celular;
        this.ativo = ativo;
    }

    get cpf()
    {
        return this._cpf;
    }

    set cpf(cpf: string)
    {
        if(!CpfService.validaCpf( CpfService.removeFormatacaoCpf(cpf) )){
            throw new Error("Cpf inválido!");
        }

        this._cpf = cpf;
    }
}