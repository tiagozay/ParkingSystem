<?php

    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $stdMensalista = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        /** @var Mensalista */
        $mensalista = $entityManager->find(Mensalista::class, $stdMensalista->id);

        $mensalista->editar(
            $stdMensalista->nome,
            new DateTime($stdMensalista->dataNascimento),
            $stdMensalista->cpf,
            $stdMensalista->email,
            $stdMensalista->celular,
            $stdMensalista->ativo,
            $stdMensalista->cep,
            $stdMensalista->uf,
            $stdMensalista->cidade
        );

        $entityManager->flush();

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($mensalista);

    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>