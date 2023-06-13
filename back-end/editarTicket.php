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

        /** @var Ticket */
        $ticket = $entityManager->find(Ticket::class, $stdTicket->id);

        /** @var Precificacao */
        $precificacao = $entityManager->find(Precificacao::class, $stdTicket->precificacao->id);

        /** @var FormaDePagamento|null*/
        $formaDePagamento = null;
        if($stdTicket->formaDePagamento && $stdTicket->formaDePagamento !== "Mensalidade"){
            $formaDePagamento = $entityManager->find(FormaDePagamento::class, $stdTicket->formaDePagamento->id);
        }else {
            $formaDePagamento = "Mensalidade";
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

        $ticket->editar(
            $stdTicket->placaVeiculo,
            $stdTicket->marcaVeiculo,
            $stdTicket->modeloVeiculo,
            $formaDePagamento,
            $precificacao,
            $stdTicket->dataDeSaida ? new DateTime($stdTicket->dataDeSaida) : null,
            $mensalista,
            $mensalidade
        );

        $entityManager->flush();

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($ticket);

    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>