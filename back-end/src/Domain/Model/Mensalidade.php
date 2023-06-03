<?php
    namespace ParkSistem\Domain\Model;

    use DateTime;
    use DomainException;
    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Service\DataService;

    class Mensalidade
    {
        private ?int $id;
        private Mensalista $mensalista;
        private Precificacao $precificacao;
        private float $valor;
        private FormaDePagamento $formaDePagamento;
        private DateTime $dataDeCompra;
        private DateTime $dataDeVencimento;
        private bool $vencida;


        /**
         * @throws DomainException
         */
        public function __construct(
            ?int $id,
            Mensalista $mensalista,
            Precificacao $precificacao,
            float $valor,
            FormaDePagamento $formaDePagamento,
            DateTime $dataDeCompra,
        )
        {
            $this->id = $id;
            $this->mensalista = $mensalista;
            $this->setPrecificacao($precificacao);
            $this->valor = $valor;
            $this->setFormaDePagamento($formaDePagamento);
            $this->setDataDeCompra($dataDeCompra);

            $this->inicialize();
        }   

        //Função que deve ser chamada depois do doctrine criar uma entidade do mesmo tipo dessa classe
        public function inicialize()
        {
            $this->dataDeVencimento = DataService::acrescenta1Mes($this->dataDeCompra);
            $this->vencida = DataService::geraDataAtual() > $this->dataDeVencimento;
        }

        /**
         * @throws DomainException
         */
        private function setPrecificacao(Precificacao $precificacao)
        {
            if(!$precificacao->getAtiva()){
                throw new DomainException("Precificação inativa");
            }

            $this->precificacao = $precificacao;
        }

        /**
         * @throws DomainException
         */
        private function setFormaDePagamento(FormaDePagamento $formaDePagamento)
        {
            if(!$formaDePagamento->getAtiva() || $formaDePagamento->getDescontinuada()){
                throw new DomainException("Forma de pagamento inválida");
            }

            $this->formaDePagamento = $formaDePagamento;
        }

        private function setDataDeCompra(DateTime $dataDeCompra)
        {
            //Se o id for nulo, é sinal que a Mensalidade é nova, ainda não foi pesistida no banco, por isso, precisa gerar uma data do servidor e atribuir à propriedade. Se ela não for nula, sinal que já foi persistida no banco e essa data recebida vem de lá, concluindo-se que já tenha sido gerada uma data no back-end
            if(!$this->id){
                $this->dataDeCompra = DataService::geraDataAtual();
            }else {
                $this->dataDeCompra = $dataDeCompra;
            }
        }
    }
?>