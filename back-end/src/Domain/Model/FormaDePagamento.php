<?php
    namespace ParkSistem\Domain\Model;

    use Doctrine\ORM\Mapping\Column;
    use Doctrine\ORM\Mapping\Entity;
    use Doctrine\ORM\Mapping\GeneratedValue;
    use Doctrine\ORM\Mapping\Id;
    use DomainException;
    use JsonSerializable;

    #[Entity]
    class FormaDePagamento implements JsonSerializable
    {
        #[Id]
        #[GeneratedValue]
        #[Column()]
        private ?int $id;

        #[Column(length: 50)]
        private string $nomeFormaDePagamento;

        #[Column()]
        private bool $ativa;

        #[Column()]
        private bool $descontinuada;

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

        public function editar(
            string $nomeFormaDePagamento,
            bool $ativa,
            bool $descontinuada
        ){
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

        public function jsonSerialize(): mixed
        {
            return [
                "id" => $this->id,
                "nomeFormaDePagamento" => $this->nomeFormaDePagamento,
                "ativa" => $this->ativa,
                "descontinuada" => $this->descontinuada
            ];
        }
    }
?>