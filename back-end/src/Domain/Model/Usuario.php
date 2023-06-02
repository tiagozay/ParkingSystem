<?php
    namespace ParkSistem\Domain\Model;

    use DomainException;

    class Usuario
    {
        public readonly ?int $id;
        private string $nome ;
        private string $email ;
        private string $nivelDeAcesso;
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