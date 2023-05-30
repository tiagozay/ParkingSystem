export class Sistema
{
    public razaoSocial: string;
    public nomeFantasia: string;
    public cnpj: string;
    public inscricaoEstadual: string;
    public telefoneFixo: string;
    public telefoneCelular: string;
    public cep: string;
    public endereco: string;
    public numero: string;
    public cidade: string;
    public uf: string;
    public urlSite: string;
    public email: string;
    public descricao: string;

    constructor(
        razaoSocial: string,
        nomeFantasia: string,
        cnpj: string,
        inscricaoEstadual: string,
        telefoneFixo: string,
        telefoneCelular: string,
        cep: string,
        endereco: string,
        numero: string,
        cidade: string,
        uf: string,
        urlSite: string,
        email: string,
        descricao: string
    ){
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
        this.inscricaoEstadual = inscricaoEstadual;
        this.telefoneFixo = telefoneFixo;
        this.telefoneCelular = telefoneCelular;
        this.cep = cep;
        this.endereco = endereco;
        this.numero = numero;
        this.cidade = cidade;
        this.uf = uf;
        this.urlSite = urlSite;
        this.email = email;
        this.descricao = descricao;
    }

}