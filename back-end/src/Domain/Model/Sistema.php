<?php
    namespace ParkSistem\Domain\Model;

    use DomainException;
    use JsonSerializable;

    class Sistema implements JsonSerializable
    {
        private string $razaoSocial;
        private string $nomeFantasia;
        private string $cnpj;
        private string $inscricaoEstadual;
        private string $telefoneFixo;
        private string $telefoneCelular;
        private string $cep;
        private string $endereco;
        private string $numero;
        private string $cidade;
        private string $uf;
        private string $urlSite;
        private string $email;
        private string $descricao;

        /**
         * @throws DomainException
         */
        public function __construct(
            string $razaoSocial,
            string $nomeFantasia,
            string $cnpj,
            string $inscricaoEstadual,
            string $telefoneFixo,
            string $telefoneCelular,
            string $cep,
            string $endereco,
            string $numero,
            string $cidade,
            string $uf,
            string $urlSite,
            string $email,
            string $descricao,
        )
        {
            $this->razaoSocial = $razaoSocial;
            $this->nomeFantasia = $nomeFantasia;
            $this->cnpj = $cnpj;
            $this->inscricaoEstadual = $inscricaoEstadual;
            $this->telefoneFixo = $telefoneFixo;
            $this->telefoneCelular = $telefoneCelular;
            $this->cep = $cep;
            $this->endereco = $endereco;
            $this->numero = $numero;
            $this->cidade = $cidade;
            $this->uf = $uf;
            $this->urlSite = $urlSite;
            $this->email = $email;
            $this->descricao = $descricao;
        }   

        public function jsonSerialize(): mixed
        {
            return [
                "razaoSocial" => $this->razaoSocial,
                "nomeFantasia" => $this->nomeFantasia,
                "cnpj" => $this->cnpj,
                "inscricaoEstadual" => $this->inscricaoEstadual,
                "telefoneFixo" => $this->telefoneFixo,
                "telefoneCelular" => $this->telefoneCelular,
                "cep" => $this->cep,
                "endereco" => $this->endereco,
                "numero" => $this->numero,
                "cidade" => $this->cidade,
                "uf" => $this->uf,
                "urlSite" => $this->urlSite,
                "email" => $this->email,
                "descricao" => $this->descricao,
            ];
        }
    }
?>