<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Service\LoginService;

    $json = file_get_contents('php://input');

    $stdToken = json_decode($json);

    $token = $stdToken->token;

    if(LoginService::verificaSeEstaLogado($token)){
        http_response_code(200);
        header('Content-Type: text/plain');
        echo "Usuário logado";
    }else{
        http_response_code(401);
    }
?>