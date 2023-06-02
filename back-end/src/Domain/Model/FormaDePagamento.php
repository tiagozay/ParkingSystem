<?php
    namespace ParkSistem\Domain\Model;

    use DomainException;

    class FormaDePagamento
    {
        private ?int $id;
        private $nomeFormaDePagamento;
        private $ativa;
        private $descontinuada;

        /**
         * @throws DomainException
         */
        public function __construct(
            ?int $id,
            string $nomeFormaDePagamento,
            bool $ativa,
            bool $descontinuada
        )
        {
            $this->id = $id;
            $this->nomeFormaDePagamento = $nomeFormaDePagamento;
            $this->ativa = $ativa;
            $this->descontinuada = $descontinuada;
        }   

        public function getAtiva(): bool
        {
            return $this->ativa;
        }

        public function getDescontinuada(): bool
        {
            return $this->descontinuada;
        }
    }
?>