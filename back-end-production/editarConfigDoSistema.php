<?php
    require_once './vendor/autoload.php';
    require_once 'env.php';

    use ParkSistem\Domain\Model\Sistema;
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

    $stdConfigSistema = json_decode($json);

    try {

        $host = getenv('DB_HOST');
        $dbName = getenv('DB_DATABASE');
        $user = getenv('DB_USERNAME');
        $password = getenv('DB_PASSWORD');

        $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);

        $configSistema = new Sistema(
            $stdConfigSistema->razaoSocial,
            $stdConfigSistema->nomeFantasia,
            $stdConfigSistema->cnpj,
            $stdConfigSistema->inscricaoEstadual,
            $stdConfigSistema->telefoneFixo,
            $stdConfigSistema->telefoneCelular,
            $stdConfigSistema->cep,
            $stdConfigSistema->endereco,
            $stdConfigSistema->numero,
            $stdConfigSistema->cidade,
            $stdConfigSistema->uf,
            $stdConfigSistema->urlSite,
            $stdConfigSistema->email,
            $stdConfigSistema->descricao
        );

        $pdo->exec("UPDATE config_sistema SET 
            razaoSocial = '{$configSistema->razaoSocial}',
            nomeFantasia = '{$configSistema->nomeFantasia}',
            cnpj = '{$configSistema->cnpj}',
            inscricaoEstadual = '{$configSistema->inscricaoEstadual}',
            telefoneFixo = '{$configSistema->telefoneFixo}',
            telefoneCelular = '{$configSistema->telefoneCelular}',
            cep = '{$configSistema->cep}',
            endereco = '{$configSistema->endereco}',
            numero = '{$configSistema->numero}',
            cidade = '{$configSistema->cidade}',
            uf = '{$configSistema->uf}',
            urlSite = '{$configSistema->urlSite}',
            email = '{$configSistema->email}',
            descricao = '{$configSistema->descricao}'
        ");

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($configSistema);

    }catch( Throwable $e ){
        http_response_code(500);
        header('Content-Type: text/plain');
        echo $e->getMessage();
    }
?>