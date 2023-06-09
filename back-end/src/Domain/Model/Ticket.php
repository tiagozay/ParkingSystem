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
    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Service\DataService;

    #[Entity()]
    class Ticket
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
        private bool $pago;

        #[ManyToOne(targetEntity: Precificacao::class)]
        #[JoinColumn(nullable:false)]
        private Precificacao $precificacao ;

        #[Column(type: 'date')]
        private DateTime $dataDeEntrada ;

        #[Column(type: 'date', nullable:true)]
        private ?DateTime $dataDeSaida;

        #[Column(length:10, nullable:true)]
        private ?string $numeroDaVaga;

        #[ManyToOne(targetEntity: Mensalista::class)]
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
            $this->setMensalista($mensalista);
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
            $this->setMensalista($mensalista);

            //Se o ticket ainda não foi pago e foi informada uma data de saída e uma forma de pagamento, é sinal que o operador pagou este ticket, aí nesse caso, gero uma data de saída, já que a que é recebida do front-end não é confiável 
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
            //Se não tiver id, é sinal de que está sendo criado um novo tiket, sendo necessária a validação. Se tiver id, mas tiver recebendo uma precificação diferente da que já está definida, também é necessária a validação, pois é sinal de que estamos recebendo uma nova precificação, e só omitimos essa validação quando recebermos uma precificação inválida na edição, que seja a mesma que já foi definidda

            if(!$this->id){
                //Novo tiket                

                if(!$precificacao->getAtiva() || $precificacao->getDescontinuada()){
                    throw new DomainException("Precificação inválida");
                }

            }else if( $this->precificacao->id !== $precificacao->id ){
                //Edição com precificação nova

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
            //Se eu receber um Mensalista e se eu tiver cadastrando um novo Tiket ou editando um Tiket já cadastrado passando um mensalista diferente da que já foi cadastrada, faço a verificação para ver se o mensalista é válido, isso porquê nesses dois casos é necessária a validação do mensalista. Nesse caso não temos problemas na hora que o doctrine for buscar os tikets do banco, pois nesse caso, ele não usará este setter. Este setter só será usado no cadastro de um novo Tiket ou na edição de um existente

            if($mensalista){
                if(!$this->id || $this->mensalista->id !== $mensalista->id){
                    if(!$mensalista->getAtivo() || $mensalista->getDescontinuado()){
                        throw new DomainException("Mensalista inválido (inativo ou descontinuado)");
                    }
                }                
            }
            
            $this->mensalista = $mensalista;
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