<?php
    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\FormaDePagamento;
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
        header('Content-Type: application/json');
        echo json_encode($formaDePagamento);

    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>