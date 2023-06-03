<?php
    namespace ParkSistem\Domain\Model;

    use Doctrine\ORM\Mapping\Column;
    use Doctrine\ORM\Mapping\Entity;
    use Doctrine\ORM\Mapping\GeneratedValue;
    use Doctrine\ORM\Mapping\Id;
    use DomainException;

    #[Entity()]
    class Usuario
    {
        #[Id]
        #[GeneratedValue]
        #[Column()]
        public readonly ?int $id;

        #[Column(length:100)]
        private string $nome;

        #[Column(length:256)]
        private string $email;

        #[Column(length: 20)]
        private string $nivelDeAcesso;

        #[Column()]
        private bool $ativo;

        /**
         * @throws DomainException
         */
        public function __construct(
            ?int $id,
            string $nome,
            string $email,
            string $nivelDeAcesso,
            bool $ativo,
        )
        {
            $this->id = $id;
            $this->nome = $nome;
            $this->email = $email;
            $this->setNivelDeAcesso($nivelDeAcesso);
            $this->ativo = $ativo;
        }   

        public function getAtivo(): bool
        {
            return $this->ativo;
        }

        private function setNivelDeAcesso(string $nivelDeAcesso)
        {
            if($nivelDeAcesso !== "Administrador" && $nivelDeAcesso !== "Operador"){
                throw new DomainException("Nivel de acesso inválido!");
            }

            $this->nivelDeAcesso = $nivelDeAcesso;            
        }


    }
?>