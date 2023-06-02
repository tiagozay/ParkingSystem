<?php
    namespace ParkSistem\Domain\Model;

    use DateTime;
    use DomainException;
    use Exception;
    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Service\CPFService;

    class Precificacao
    {
        private ?int $id;
        private string $categoria;
        private float $valorHora;
        private float $valorMensalidade;
        private bool $ativa;
        private int $numeroDeVagas;

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
        )
        {
            $this->id = $id;
            $this->categoria = $categoria;
            $this->valorHora = $valorHora;
            $this->valorMensalidade = $valorMensalidade;
            $this->ativa = $ativa;
            $this->numeroDeVagas = $numeroDeVagas;
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
    }
?>