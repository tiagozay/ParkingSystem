<?php
    namespace ParkSistem\Domain\Model;

    use Doctrine\ORM\Mapping\Column;
    use Doctrine\ORM\Mapping\Entity;
    use Doctrine\ORM\Mapping\GeneratedValue;
    use Doctrine\ORM\Mapping\Id;
    use Doctrine\ORM\Mapping\ManyToOne;
    use DateTime;
    use Doctrine\ORM\Mapping\JoinColumn;
    use DomainException;
    use JsonSerializable;
    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Service\DataService;

    #[Entity()]
    class Ticket implements JsonSerializable
    {
        #[Id]
        #[GeneratedValue]
        #[Column()]
        public ?int $id;

        #[Column(length: 8)]
        private string $placaVeiculo;

        #[Column(length: 30)]
        private string $marcaVeiculo;

        #[Column(length: 30)]
        private string $modeloVeiculo;

        #[ManyToOne(targetEntity: FormaDePagamento::class)]
        private ?FormaDePagamento $formaDePagamento;

        #[Column()]
        private bool $ehPagoPorMensalidade;

        #[Column()]
        private bool $pago;

        #[ManyToOne(targetEntity: Precificacao::class)]
        #[JoinColumn(nullable:false)]
        private Precificacao $precificacao ;

        #[Column()]
        private DateTime $dataDeEntrada ;

        #[Column(nullable:true)]
        private ?DateTime $dataDeSaida;

        #[Column(length:10, nullable:true)]
        private ?string $numeroDaVaga;

        #[ManyToOne(targetEntity: Mensalista::class)]
        private ?Mensalista $mensalista;

        #[ManyToOne(targetEntity: Mensalidade::class)]
        private ?Mensalidade $mensalidade;

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
            ?Mensalidade $mensalidade,
            bool $pago = false,
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
            $this->pago = $pago;
            $this->setMensalista($mensalista);
            $this->setMensalidade($mensalidade);

            $this->ehPagoPorMensalidade = false;
        }   

        public function editar(
            string $placaVeiculo,
            string $marcaVeiculo,
            string $modeloVeiculo,
            FormaDePagamento | null | string $formaDePagamento,
            Precificacao $precificacao,
            DateTime $dataDeEntrada,
            ?DateTime $dataDeSaida,
            ?string $numeroDaVaga,
            ?Mensalista $mensalista,
            ?Mensalidade $mensalidade,
        ){
            $this->placaVeiculo = $placaVeiculo;
            $this->marcaVeiculo = $marcaVeiculo;
            $this->modeloVeiculo = $modeloVeiculo;
            $this->setPrecificacao($precificacao);
            $this->dataDeEntrada = $dataDeEntrada;
            $this->numeroDaVaga = $numeroDaVaga;
            $this->setMensalista($mensalista);
            $this->setMensalidade($mensalidade);

            //Se foi informada uma data de saída, é sinal de que está sendo realizado o pagamento do Tiket, aí gero uma nova data, já que a que vem do front-end não é confiável  
            if($dataDeSaida){
                $this->dataDeSaida = DataService::geraDataAtual();   
            }

            if(!$this->pago && $formaDePagamento && $dataDeSaida){
                if( $formaDePagamento === "Mensalidade" && $this->mensalista && $this->mensalidade ){
                    $this->pago = true;
                    $this->setFormaDePagamento(null);
                    $this->ehPagoPorMensalidade = true;
                }else if( $formaDePagamento instanceof FormaDePagamento ) {
                    $this->pago = true;
                    $this->setFormaDePagamento($formaDePagamento);
                    $this->ehPagoPorMensalidade = false;
                }
            }
        }

        /**
         * @throws DomainException
         */
        private function setPrecificacao(Precificacao $precificacao)
        {
            //Se não tiver id, é sinal de que está sendo criado um novo tiket, sendo necessária a validação. Se tiver id, mas tiver recebendo uma precificação diferente da que já está definida, também é necessária a validação, pois é sinal de que estamos recebendo uma nova precificação, e só omitimos essa validação quando recebermos uma precificação inválida na edição, que seja a mesma que já foi definidda

            if(!$this->id || $this->precificacao->id !== $precificacao->id){              
                if(!$precificacao->getAtiva() || $precificacao->getDescontinuada()){
                    throw new DomainException("Precificação inválida");
                }
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
        private function setMensalista(?Mensalista $mensalista)
        {
            //Se eu receber um Mensalista e se eu tiver cadastrando um novo Tiket ou editando um Tiket já cadastrado passando um mensalista diferente da que já foi cadastrada, faço a verificação para ver se o mensalista é válido, isso porque nesses dois casos é necessária a validação do mensalista. Quando for uma edição e o mensalista recebido for diferente do que já está setado, se ele estiver inválido, pode continuar inválido. Nesse caso não temos problemas na hora que o doctrine for buscar os tikets do banco, pois nesse caso, ele não usará este setter. Este setter só será usado no cadastro de um novo Tiket ou na edição de um existente

            if($mensalista){
                if(!$this->id || $this->mensalista->id !== $mensalista->id){
                    if(!$mensalista->getAtivo() || $mensalista->getDescontinuado()){
                        throw new DomainException("Mensalista inválido (inativo ou descontinuado)");
                    }
                }                
            }
            
            $this->mensalista = $mensalista;
        }

        /**
         * @throws DomainException
         */
        private function setMensalidade(?Mensalidade $mensalidade)
        {
            //Se eu receber um Mensalista e se eu tiver cadastrando um novo Tiket ou editando um Tiket já cadastrado passando um mensalista diferente da que já foi cadastrada, faço a verificação para ver se o mensalista é válido, isso porque nesses dois casos é necessária a validação do mensalista. Quando for uma edição e o mensalista recebido for diferente do que já está setado, se ele estiver inválido, pode continuar inválido. Nesse caso não temos problemas na hora que o doctrine for buscar os tikets do banco, pois nesse caso, ele não usará este setter. Este setter só será usado no cadastro de um novo Tiket ou na edição de um existente

            if($this->mensalista && !$mensalidade){
                throw new DomainException("Ao informar um mensalista, deve-se informar uma Mensalidade");
            }

            if($mensalidade){
                if(!$this->id || $this->mensalidade->id !== $mensalidade->id){
                    if($mensalidade->getVencida() || $mensalidade->getDescontinuada()){
                        throw new DomainException("Mensalidade inválida (vencida ou descontinuada)");
                    }
                }                
            }
            
            $this->mensalidade = $mensalidade;
        }

        private function setDataDeEntrada(DateTime $dataDeEntrada)
        {
            //Se o id for nulo, é sinal que o Ticket é novo, ainda não foi pesistido no banco, por isso, precisa gerar uma data do servidor e atribuir à propriedade. Se ele não for nulo, sinal que já foi persistido no banco e essa data recebida vem de lá, concluindo-se que já tenha sido gerada uma data no back-end
            if(!$this->id){
                $this->dataDeEntrada = DataService::geraDataAtual();
            }else {
                $this->dataDeEntrada = $dataDeEntrada;
            }
        }

        public function jsonSerialize(): mixed
        {
            return [
                'id' => $this->id,
                'placaVeiculo' => $this->placaVeiculo,
                'marcaVeiculo' => $this->marcaVeiculo,
                'modeloVeiculo' => $this->modeloVeiculo,
                'formaDePagamento' => $this->ehPagoPorMensalidade ? "Mensalidade" : $this->formaDePagamento,
                'pago' => $this->pago,
                'precificacao' => $this->precificacao,
                'dataDeEntrada' => $this->dataDeEntrada->format('Y-m-d H:i:s'),
                'dataDeSaida' => $this->dataDeSaida ? $this->dataDeSaida->format('Y-m-d H:i:s') : null,
                'numeroDaVaga' => $this->numeroDaVaga,
                'mensalista' => $this->mensalista,
                'mensalidade' => $this->mensalidade
            ];
        }
    }
?>