<?php

    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $idMensalista = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        /** @var Mensalista */
        $mensalista = $entityManager->find(Mensalista::class, $idMensalista);

        $mensalista->descontinuar();

        $entityManager->flush();

        http_response_code(200);
        echo json_encode($mensalista);

    }catch( Throwable $e ){
        http_response_code(500);
        echo $e->getMessage();
    }
?>