<?php

    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Precificacao;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $stdPrecificacao = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        $precificacao = new Precificacao(
            null,
            $stdPrecificacao->categoria,
            $stdPrecificacao->valorHora,
            $stdPrecificacao->valorMensalidade,
            $stdPrecificacao->ativa,
            $stdPrecificacao->numeroDeVagas
        );

        $entityManager->persist($precificacao);

        $entityManager->flush();

        http_response_code(200);
        echo json_encode($precificacao);

    }catch( Throwable $e ){
        http_response_code(500);
        echo $e->getMessage();
    }
?>