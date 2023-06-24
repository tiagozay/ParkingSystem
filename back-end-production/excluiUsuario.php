<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Usuario;
    use ParkSistem\Helper\EntityManagerCreator;

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