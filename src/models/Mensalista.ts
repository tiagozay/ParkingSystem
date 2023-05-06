import { throws } from "assert";
import { CpfService } from "../services/CpfService";
import { DataService } from "../services/DataService";

export class Mensalista
{
    public id: number | null;
    public nome: string;
    public dataNascimento: Date | null;
    private _cpf: string;
    public email: string | null;
    public celular: string;
    public ativo: boolean;
    public cep: string;
    public uf: string;
    public cidade: string;

    /** 
     * @throws {Error}
     */
    constructor (
        id: number | null,
        nome: string,
        dataNascimento: Date | null,
        cpf: string,
        email: string | null, 
        celular: string,
        ativo: boolean,
        cep: string,
        uf: string,
        cidade: string
    ) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.celular = celular;
        this.ativo = ativo;
        this.cep = cep;
        this.uf = uf;
        this.cidade = cidade;
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