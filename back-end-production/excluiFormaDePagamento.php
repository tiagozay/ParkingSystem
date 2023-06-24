<?php
    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\FormaDePagamento;
    use ParkSistem\Helper\EntityManagerCreator;
    use ParkSistem\Service\LoginService;

    $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $token = str_replace('Bearer ', '', $authorizationHeader);

    if(!LoginService::verificaSeEstaLogadoComoAdministrador($token)){
        http_response_code(401);
        header('Content-Type: text/plain');
        echo "Erro de autenticação!";
        exit();
    }

    $json = file_get_contents('php://input');

    $idFormaDePagamento = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        /** @var FormaDePagamento */
        $formaDePagamento = $entityManager->find(FormaDePagamento::class, $idFormaDePagamento);

        $formaDePagamento->descontinuar();

        $entityManager->flush();

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($formaDePagamento);

    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>