<?php
    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Usuario;
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

    $stdUsuario = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        $usuario = new Usuario(
            null,
            $stdUsuario->nome,
            $stdUsuario->email,
            $stdUsuario->nivelDeAcesso,
            $stdUsuario->ativo,
            $stdUsuario->senha,
        );

        $entityManager->persist($usuario);

        $entityManager->flush();

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($usuario);

    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>