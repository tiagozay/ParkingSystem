import { CpfService } from "../services/CpfService";

export class Mensalista
{
    public id: number | null;
    public nome: string;
    public dataNascimento: Date | null;
    private _cpf: string;
    public email: string | null;
    public celular: string;
    public cep: string;
    public uf: string;
    public cidade: string;
    public ativo: boolean;

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
        cep: string,
        uf: string,
        cidade: string,
        ativo: boolean,
    ) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.celular = celular;
        this.cep = cep;
        this.uf = uf;
        this.cidade = cidade;
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

    //Método chamado durante a serialização do objeto
    toJSON()
    {
        return {
            id: this.id,
            nome: this.nome,
            dataNascimento: this.dataNascimento,
            cpf: this._cpf,
            email: this.email, 
            celular: this.celular,
            cep: this.cep,
            uf: this.uf,
            cidade: this.cidade,
            ativo: this.ativo,
        }
    }
}