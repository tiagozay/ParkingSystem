<?php
    namespace ParkSistem\Domain\Model;

    use Doctrine\ORM\Mapping\Column;
    use Doctrine\ORM\Mapping\Entity;
    use Doctrine\ORM\Mapping\GeneratedValue;
    use Doctrine\ORM\Mapping\Id;
    use DateTime;
    use DomainException;
    use JsonSerializable;
    use ParkSistem\Service\CPFService;

    #[Entity]
    class Mensalista implements JsonSerializable
    {
        #[Id]
        #[GeneratedValue]
        #[Column()]
        public ?int $id;
    
        #[Column(length:100)]
        private string $nome ;

        #[Column(nullable:true, type: "date")]
        private ?DateTime $dataNascimento;

        #[Column(unique:true, length:14)]
        private string $cpf;

        #[Column(length:256, nullable:true)]
        private ?string $email;

        #[Column(length:15)]
        private string $celular;

        #[Column()]
        private bool $ativo;

        #[Column(length:9)]
        private string $cep;

        #[Column(length:2)]
        private string $uf;

        #[Column(length:100)]
        private string $cidade;

        #[Column()]
        private bool $descontinuado;

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
            bool $descontinuado,
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
            $this->descontinuado = $descontinuado;
        }   

        public function editar(
            string $nome ,
            ?DateTime $dataNascimento,
            string $cpf,
            ?string $email,
            string $celular,
            bool $ativo,
            string $cep,
            string $uf,
            string $cidade,
        ){
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

        public function descontinuar()
        {
            $this->descontinuado = true;
        }

        public function tornarVigente()
        {
            $this->descontinuado = false;
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

        public function getDescontinuado()
        {
            return $this->descontinuado;
        }

        public function jsonSerialize(): mixed
        {
            return [
                "id" => $this->id,
                "nome" => $this->nome,
                "dataNascimento" => $this->dataNascimento->format('Y-m-d'),
                "cpf" => $this->cpf,
                "email" => $this->email,
                "celular" => $this->celular,
                "ativo" => $this->ativo,
                "cep" => $this->cep,
                "uf" => $this->uf,
                "cidade" => $this->cidade,
                "descontinuado" => $this->descontinuado,
            ];
        }
    }
