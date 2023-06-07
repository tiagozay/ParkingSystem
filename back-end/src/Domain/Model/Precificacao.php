<?php
    namespace ParkSistem\Domain\Model;

    use DateTime;
    use Doctrine\ORM\Mapping\Column;
    use Doctrine\ORM\Mapping\Entity;
    use Doctrine\ORM\Mapping\GeneratedValue;
    use Doctrine\ORM\Mapping\Id;
    use DomainException;
    use Exception;
    use JsonSerializable;
    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Service\CPFService;

    #[Entity()]
    class Precificacao implements JsonSerializable
    {
        #[GeneratedValue]
        #[Id]
        #[Column]
        public ?int $id;

        #[Column(length: 50)]
        private string $categoria;

        #[Column()]
        private float $valorHora;

        #[Column()]
        private float $valorMensalidade;

        #[Column()]
        private int $numeroDeVagas;

        #[Column()]
        private bool $ativa;

        #[Column()]
        private bool $descontinuada;

        /**
         * @throws DomainException
         */
        public function __construct(
            ?int $id,
            string $categoria,
            float $valorHora,
            float $valorMensalidade,
            bool $ativa,
            int $numeroDeVagas,
            bool $descontinuada
        )
        {
            $this->id = $id;
            $this->categoria = $categoria;
            $this->valorHora = $valorHora;
            $this->valorMensalidade = $valorMensalidade;
            $this->ativa = $ativa;
            $this->numeroDeVagas = $numeroDeVagas;
            $this->descontinuada = $descontinuada;
        }   

        public function editar(
            string $categoria,
            float $valorHora,
            float $valorMensalidade,
            bool $ativa,
            int $numeroDeVagas,
        ){
            $this->categoria = $categoria;
            $this->valorHora = $valorHora;
            $this->valorMensalidade = $valorMensalidade;
            $this->ativa = $ativa;
            $this->numeroDeVagas = $numeroDeVagas;
        }

        public function descontinuar()
        {
            $this->descontinuada = true;
        }

        public function tornarVigente()
        {
            $this->descontinuada = false;
        }


        public function getAtiva(): bool
        {
            return $this->ativa;
        }

        public function getValorHora()
        {
            return $this->valorHora;
        }

        public function getCategoria()
        {
            return $this->categoria;
        }

        public function jsonSerialize(): mixed
        {
            return [
                "id" => $this->id,
                "categoria" => $this->categoria,
                "valorHora" => $this->valorHora,
                "valorMensalidade" => $this->valorMensalidade,
                "ativa" => $this->ativa,
                "numeroDeVagas" => $this->numeroDeVagas,
                "descontinuada" => $this->descontinuada,
            ];
        }
    }
?>