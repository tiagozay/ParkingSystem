<?php

    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\FormaDePagamento;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $stdFormaDePagamento = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        $formaDePagamento = new FormaDePagamento(
            null, 
            $stdFormaDePagamento->nomeFormaDePagamento,
            $stdFormaDePagamento->ativa,
            $stdFormaDePagamento->descontinuada
        );

        $entityManager->persist($formaDePagamento);

        $entityManager->flush();

        http_response_code(200);
        echo json_encode($formaDePagamento);

    }catch( Throwable $e ){
        http_response_code(500);
        echo $e->getMessage();
    }
?>