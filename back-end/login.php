<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Usuario;
    use ParkSistem\Helper\EntityManagerCreator;
    use ParkSistem\Service\LoginService;

    $json = file_get_contents('php://input');

    $stdUsuario = json_decode($json);

    $email = $stdUsuario->email;
    $senha = $stdUsuario->senha;
    // $email = 'tiagozay@gmail.com';
    // $senha = '12345678';

    try {
        
        $entityManager = EntityManagerCreator::create();

        $usuarioRepository = $entityManager->getRepository(Usuario::class);

        /** @var Usuario|null */
        $usuario = $usuarioRepository->findOneBy(['email' => $email]);

        if(!$usuario){
            throw new Exception("Usuário não encontrado");
        }

        //Lança exceção se senha for inválida e retorna objeto com token e usuário logado quando é sucesso
        $login = LoginService::login($usuario, $senha);

        http_response_code(200);

        echo json_encode($login);

    }catch(Throwable $e){
        if($e->getMessage() === "Senha inválida" || "Usuário não encontrado"){
            http_response_code(401);
            echo "E-mail ou senha inválidos";
            exit();
        }
        http_response_code(500);
    }
?>