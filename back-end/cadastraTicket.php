<?php

    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\FormaDePagamento;
    use ParkSistem\Domain\Model\Mensalidade;
    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Domain\Model\Precificacao;
    use ParkSistem\Domain\Model\Ticket;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $stdTicket = json_decode($json);
    
    try {
        $entityManager = EntityManagerCreator::create();

        /** @var Precificacao */
        $precificacao = $entityManager->find(Precificacao::class, $stdTicket->precificacao->id);

        /** @var FormaDePagamento|null*/
        $formaDePagamento = null;
        if($stdTicket->formaDePagamento){
            $formaDePagamento = $entityManager->find(FormaDePagamento::class, $stdTicket->formaDePagamento->id);
        }
        
        /** @var Mensalista|null */
        $mensalista = null;
        if($stdTicket->mensalista){
            $mensalista = $entityManager->find(Mensalista::class, $stdTicket->mensalista->id);
        }

        /** @var Mensalidade|null */
        $mensalidade = null;
        if($stdTicket->mensalidade){
            $mensalidade = $entityManager->find(Mensalidade::class, $stdTicket->mensalidade->id);
        }
        
        $tiket = new Ticket(
            null,
            $stdTicket->placaVeiculo,
            $stdTicket->marcaVeiculo,
            $stdTicket->modeloVeiculo,
            $formaDePagamento,
            $precificacao,
            new DateTime($stdTicket->dataDeEntrada),
            $stdTicket->dataDeSaida ? new DateTime($stdTicket->dataDeSaida) : null,
            $stdTicket->numeroDaVaga,
            $mensalista,
            $mensalidade,
            $stdTicket->pago
        );

        $entityManager->persist($tiket);

        $entityManager->flush();

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($tiket);

    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>