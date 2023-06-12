<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Ticket;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $idTicket = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        $ticketParcial = $entityManager->getPartialReference(Ticket::class, $idTicket);

        $entityManager->remove($ticketParcial);

        $entityManager->flush();

        http_response_code(200);
        header('Content-Type: text/plain');
    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>