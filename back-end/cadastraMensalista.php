<?php

    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $stdMensalista = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        $mensalista = new Mensalista(
            null,
            $stdMensalista->nome,
            new DateTime($stdMensalista->dataNascimento),
            $stdMensalista->cpf,
            $stdMensalista->email,
            $stdMensalista->celular,
            $stdMensalista->ativo,
            $stdMensalista->cep,
            $stdMensalista->uf,
            $stdMensalista->cidade,
            $stdMensalista->descontinuado,
        );

        $entityManager->persist($mensalista);

        $entityManager->flush();

        http_response_code(200);
        echo json_encode($mensalista);

    }catch( Throwable $e ){
        http_response_code(500);
        echo $e->getMessage();
    }
?>