<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\FormaDePagamento;
    use ParkSistem\Helper\EntityManagerCreator;

    $entityManager = EntityManagerCreator::create();

    $formaDePagamentoRepository = $entityManager->getRepository(FormaDePagamento::class);

    /** @var FormaDePagamento[] */
    $formasDePagamento = $formaDePagamentoRepository->findAll();

    header('Content-Type: application/json');
    echo json_encode($formasDePagamento);
?>