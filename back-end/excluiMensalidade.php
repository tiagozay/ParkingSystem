<?php

    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Mensalidade;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $idMensalidade = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        /** @var Mensalidade */
        $mensalidade = $entityManager->find(Mensalidade::class, $idMensalidade);

        $mensalidade->descontinuar();

        $entityManager->flush();

        http_response_code(200);
        echo json_encode($mensalidade);

    }catch( Throwable $e ){
        http_response_code(500);
        echo $e->getMessage();
    }
?>