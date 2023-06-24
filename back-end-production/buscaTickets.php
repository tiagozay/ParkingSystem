<?php
    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Ticket;
    use ParkSistem\Helper\EntityManagerCreator;
    use ParkSistem\Service\LoginService;

    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $authorizationHeader);

    if(!LoginService::verificaSeEstaLogado($token)){
        http_response_code(401);
        header('Content-Type: text/plain');
        echo "Erro de autenticação!";
        exit();
    }

    $entityManager = EntityManagerCreator::create();

    $ticketRepository = $entityManager->getRepository(Ticket::class);

    /** @var Ticket[] */
    $tickets = $ticketRepository->findAll();

    header('Content-Type: application/json');
    echo json_encode($tickets);
?>