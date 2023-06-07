<?php

    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Precificacao;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $idPrecificacao = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        /** @var Precificacao */
        $precificacao = $entityManager->find(Precificacao::class, $idPrecificacao);

        $precificacao->descontinuar();

        $entityManager->flush();

        http_response_code(200);
        echo json_encode($precificacao);

    }catch( Throwable $e ){
        http_response_code(500);
        echo $e->getMessage();
    }
?>