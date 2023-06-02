<?php
    namespace ParkSistem\Domain\Model;

    use DateTime;
    use DomainException;
    use ParkSistem\Service\CPFService;

    class Mensalista
    {
        public readonly ?int $id;
        private string $nome ;
        private ?DateTime $dataNascimento;
        private string $cpf;
        private ?string $email;
        private string $celular;
        private bool $ativo;
        private string $cep;
        private string $uf;
        private string $cidade;


        /**
         * @throws DomainException
         */
        public function __construct(
            ?int $id,
            string $nome ,
            ?DateTime $dataNascimento,
            string $cpf,
            ?string $email,
            string $celular,
            bool $ativo,
            string $cep,
            string $uf,
            string $cidade,
        )
        {
            $this->id = $id;
            $this->nome = $nome;
            $this->dataNascimento = $dataNascimento;
            $this->setCpf($cpf);
            $this->email = $email;
            $this->celular = $celular;
            $this->ativo = $ativo;
            $this->cep = $cep;
            $this->uf = $uf;
            $this->cidade = $cidade;
        }   

        /**
         * @throws DomainException
         */
        private function setCpf(string $cpf)
        {
            if(!CPFService::validaCpf($cpf)){
                throw new DomainException("Cpf inválido");
            }
            $this->cpf = $cpf;
        }

        public function getAtivo()
        {
            return $this->ativo;
        }
    }
?>