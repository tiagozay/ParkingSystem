<?php
    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Mensalista;
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
        header('Content-Type: application/json');
        echo json_encode($mensalista);

    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>