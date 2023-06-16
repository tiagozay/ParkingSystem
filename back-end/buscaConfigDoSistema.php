<?php
    header("Access-Control-Allow-Origin: *");

    use ParkSistem\Domain\Model\Sistema;

    require_once './vendor/autoload.php';
    require_once 'env.php';

    try {

        $host = getenv('DB_HOST');
        $dbName = getenv('DB_DATABASE');
        $user = getenv('DB_USERNAME');
        $password = getenv('DB_PASSWORD');

        $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);

        $stmt = $pdo->query("SELECT * FROM config_sistema LIMIT 1");

        $dadosConfig = $stmt->fetch(PDO::FETCH_ASSOC);

        $configSistema = new Sistema(
            $dadosConfig['razaoSocial'],
            $dadosConfig['nomeFantasia'],
            $dadosConfig['cnpj'],
            $dadosConfig['inscricaoEstadual'],
            $dadosConfig['telefoneFixo'],
            $dadosConfig['telefoneCelular'],
            $dadosConfig['cep'],
            $dadosConfig['endereco'],
            $dadosConfig['numero'],
            $dadosConfig['cidade'],
            $dadosConfig['uf'],
            $dadosConfig['urlSite'],
            $dadosConfig['email'],
            $dadosConfig['descricao'],
        );

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($configSistema);

    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>