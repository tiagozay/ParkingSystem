<?php
    namespace ParkSistem\Domain\Model;

    use DateTime;
    use DomainException;
    use ParkSistem\Domain\Model\Mensalista;
use ParkSistem\Service\DataService;

    class Tiket
    {
        private ?int $id;
        private string $placaVeiculo;
        private string $marcaVeiculo;
        private string $modeloVeiculo;
        private ?FormaDePagamento $formaDePagamento;
        private bool $pago;
        private Precificacao $precificacao ;
        private DateTime $dataDeEntrada ;
        private ?DateTime $dataDeSaida;
        private ?string $numeroDaVaga;
        private ?Mensalista $mensalista;

        /**
         * @throws DomainException
         */
        public function __construct(
            ?int $id,
            string $placaVeiculo,
            string $marcaVeiculo,
            string $modeloVeiculo,
            ?FormaDePagamento $formaDePagamento,
            Precificacao $precificacao,
            DateTime $dataDeEntrada,
            ?DateTime $dataDeSaida,
            ?string $numeroDaVaga,
            ?Mensalista $mensalista,
        )
        {
            $this->id = $id;
            $this->placaVeiculo = $placaVeiculo;
            $this->marcaVeiculo = $marcaVeiculo;
            $this->modeloVeiculo = $modeloVeiculo;
            $this->setFormaDePagamento($formaDePagamento);
            $this->setPrecificacao($precificacao);
            $this->setDataDeEntrada($dataDeEntrada);
            $this->dataDeSaida = $dataDeSaida;
            $this->numeroDaVaga = $numeroDaVaga;
            $this->setPago();

            if($mensalista){
                $this->setMensalista($mensalista);
            }                 
        }   

        public function editar(
            string $placaVeiculo,
            string $marcaVeiculo,
            string $modeloVeiculo,
            ?FormaDePagamento $formaDePagamento,
            Precificacao $precificacao,
            DateTime $dataDeEntrada,
            ?DateTime $dataDeSaida,
            ?string $numeroDaVaga,
            ?Mensalista $mensalista,
        ){
            $this->placaVeiculo = $placaVeiculo;
            $this->marcaVeiculo = $marcaVeiculo;
            $this->modeloVeiculo = $modeloVeiculo;
            $this->setFormaDePagamento($formaDePagamento);
            $this->setPrecificacao($precificacao);
            $this->dataDeEntrada = $dataDeEntrada;
            $this->numeroDaVaga = $numeroDaVaga;
            $this->mensalista = $mensalista;

            //Se o tiket ainda não foi pago e foi informada uma data de saída, é sinal que o operador pagou este tiket, aí nesse caso, gero uma data de saída, já que a que é recebida do front-end não é confiável 
            if(!$this->pago && $dataDeSaida && $formaDePagamento){
                $this->dataDeSaida = DataService::geraDataAtual();
                
            }
            $this->setPago();
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
        private function setFormaDePagamento(?FormaDePagamento $formaDePagamento)
        {   
            if($formaDePagamento){
                if(!$formaDePagamento->getAtiva() || $formaDePagamento->getDescontinuada()){
                    throw new DomainException("Forma de pagamento inválida");
                }
            }
            
            $this->formaDePagamento = $formaDePagamento;
        }

        /**
         * @throws DomainException
         */
        private function setMensalista(Mensalista $mensalista)
        {
            if(!$mensalista->getAtivo()){
                throw new DomainException("Mensalista inativo");
            }

            $this->mensalista = $mensalista;
        }

        private function setDataDeEntrada(DateTime $dataDeEntrada)
        {
            //Se o id for nulo, é sinal que o Tiket é novo, ainda não foi pesistido no banco, por isso, precisa gerar uma data do servidor e atribuir à propriedade. Se ele não for nulo, sinal que já foi persistido no banco e essa data recebida vem de lá, concluindo-se que já tenha sido gerada uma data no back-end
            if(!$this->id){
                $this->dataDeEntrada = DataService::geraDataAtual();
            }else {
                $this->dataDeEntrada = $dataDeEntrada;
            }
        }

        private function setPago()
        {
            if($this->formaDePagamento && $this->dataDeSaida){
                $this->pago = true;
            }else {
                $this->pago = false;
            }
        }
    }
?>