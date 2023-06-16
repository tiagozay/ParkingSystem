CREATE TABLE FormaDePagamento (id INT AUTO_INCREMENT NOT NULL,
 nomeFormaDePagamento VARCHAR(50) NOT NULL,
 ativa TINYINT(1) NOT NULL,
 descontinuada TINYINT(1) NOT NULL,
 PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Mensalidade (id INT AUTO_INCREMENT NOT NULL,
 mensalista_id INT NOT NULL,
 precificacao_id INT NOT NULL,
 valor DOUBLE PRECISION NOT NULL,
 dataDeCompra DATE NOT NULL,
 dataDeVencimento DATE NOT NULL,
 vencida TINYINT(1) NOT NULL,
 descontinuada TINYINT(1) NOT NULL,
 formaDePagamento_id INT DEFAULT NULL,
 INDEX IDX_F026810EA08AF81E (mensalista_id),
 INDEX IDX_F026810E32ECAA14 (precificacao_id),
 INDEX IDX_F026810E8EE8B6DE (formaDePagamento_id),
 PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Mensalista (id INT AUTO_INCREMENT NOT NULL,
 nome VARCHAR(100) NOT NULL,
 dataNascimento DATE DEFAULT NULL,
 cpf VARCHAR(14) NOT NULL,
 email VARCHAR(256) DEFAULT NULL,
 celular VARCHAR(15) NOT NULL,
 ativo TINYINT(1) NOT NULL,
 cep VARCHAR(9) NOT NULL,
 uf VARCHAR(2) NOT NULL,
 cidade VARCHAR(100) NOT NULL,
 descontinuado TINYINT(1) NOT NULL,
 UNIQUE INDEX UNIQ_78CE9DBD3E3E11F0 (cpf),
 PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Precificacao (id INT AUTO_INCREMENT NOT NULL,
 categoria VARCHAR(50) NOT NULL,
 valorHora DOUBLE PRECISION NOT NULL,
 valorMensalidade DOUBLE PRECISION NOT NULL,
 numeroDeVagas INT NOT NULL,
 ativa TINYINT(1) NOT NULL,
 descontinuada TINYINT(1) NOT NULL,
 PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Ticket (id INT AUTO_INCREMENT NOT NULL,
 precificacao_id INT NOT NULL,
 mensalista_id INT DEFAULT NULL,
 mensalidade_id INT DEFAULT NULL,
 placaVeiculo VARCHAR(8) NOT NULL,
 marcaVeiculo VARCHAR(30) NOT NULL,
 modeloVeiculo VARCHAR(30) NOT NULL,
 ehPagoPorMensalidade TINYINT(1) NOT NULL,
 pago TINYINT(1) NOT NULL,
 dataDeEntrada DATETIME NOT NULL,
 dataDeSaida DATETIME DEFAULT NULL,
 numeroDaVaga VARCHAR(10) DEFAULT NULL,
 formaDePagamento_id INT DEFAULT NULL,
 INDEX IDX_900CA8958EE8B6DE (formaDePagamento_id),
 INDEX IDX_900CA89532ECAA14 (precificacao_id),
 INDEX IDX_900CA895A08AF81E (mensalista_id),
 INDEX IDX_900CA895512EBCE5 (mensalidade_id),
 PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

CREATE TABLE Usuario (id INT AUTO_INCREMENT NOT NULL,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(256) NOT NULL,
 nivelDeAcesso VARCHAR(20) NOT NULL,
 ativo TINYINT(1) NOT NULL,
 senha VARCHAR(60) NOT NULL,
 PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB;

ALTER TABLE Mensalidade ADD CONSTRAINT FK_F026810EA08AF81E FOREIGN KEY (mensalista_id) REFERENCES Mensalista (id);

ALTER TABLE Mensalidade ADD CONSTRAINT FK_F026810E32ECAA14 FOREIGN KEY (precificacao_id) REFERENCES Precificacao (id);

ALTER TABLE Mensalidade ADD CONSTRAINT FK_F026810E8EE8B6DE FOREIGN KEY (formaDePagamento_id) REFERENCES FormaDePagamento (id);

ALTER TABLE Ticket ADD CONSTRAINT FK_900CA8958EE8B6DE FOREIGN KEY (formaDePagamento_id) REFERENCES FormaDePagamento (id);

ALTER TABLE Ticket ADD CONSTRAINT FK_900CA89532ECAA14 FOREIGN KEY (precificacao_id) REFERENCES Precificacao (id);

ALTER TABLE Ticket ADD CONSTRAINT FK_900CA895A08AF81E FOREIGN KEY (mensalista_id) REFERENCES Mensalista (id);

ALTER TABLE Ticket ADD CONSTRAINT FK_900CA895512EBCE5 FOREIGN KEY (mensalidade_id) REFERENCES Mensalidade (id);



/** Não mapeada pelo Doctrine */
CREATE TABLE config_sistema(
	razaoSocial VARCHAR(100) NOT NULL,
    nomeFantasia VARCHAR(100) NOT NULL,
    cnpj VARCHAR(20) NOT NULL,
    inscricaoEstadual VARCHAR(20) NOT NULL,
    telefoneFixo VARCHAR(20) NOT NULL,
    telefoneCelular VARCHAR(20) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    urlSite VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    descricao VARCHAR(200) NOT NULL
);

INSERT INTO config_sistema VALUES (
	"Park Estacionamento",
    "Park Estacionamento",
    "79.785.722/0001-59",
    "1238938-09",
    "(42) 3522-2907",
    "(42) 99976-0987",
    "84620-000",
    "Rua das alvoradas",
    "104",
    "Serranópolis",
    "PR",
    "parkestacionamento.com.br",
    "parkestacionamento@gmail.com",
    "Estacionando seus momentos!"
);