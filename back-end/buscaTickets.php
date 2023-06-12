<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Ticket;
    use ParkSistem\Helper\EntityManagerCreator;

    $entityManager = EntityManagerCreator::create();

    $ticketRepository = $entityManager->getRepository(Ticket::class);

    /** @var Ticket[] */
    $tickets = $ticketRepository->findAll();

    echo json_encode($tickets);
?>