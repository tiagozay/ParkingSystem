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

    $idUsuario = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        $usuarioParcial = $entityManager->getPartialReference(Usuario::class, $idUsuario);

        $entityManager->remove($usuarioParcial);

        $entityManager->flush();

        http_response_code(200);
        header('Content-Type: text/plain');
    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>