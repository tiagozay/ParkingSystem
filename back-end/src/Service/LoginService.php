<?php
    namespace ParkSistem\Service;

    use Exception;
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    use ParkSistem\Domain\Model\Usuario;

    require_once __DIR__."/../../env.php";

    abstract class LoginService
    {
        /**
         * @throws Exception
         */
        public static function login(Usuario $usuario, string $senha): array
        {
            $chaveSecreta = getenv('JWT_KEY');

            if(!password_verify($senha, $usuario->senha)){
                throw new Exception("Senha inválida");
            }

            $payLoad = [
                'exp' => time() + 14400,
                'iat' => time(),
                'id' => $usuario->id
            ];

            $token = JWT::encode($payLoad, $chaveSecreta, 'HS256');

            return [
                "token" => $token,
                "usuario" => $usuario,
            ];
        
        }

        public static function verificaSeEstaLogado(string $token): bool
        {
            if(empty(trim($token))){
                return false;
            }

            $chaveSecreta = getenv('JWT_KEY');

            try{
                $decoded = JWT::decode($token, new Key($chaveSecreta, 'HS256'));  
            }catch( Exception ){
                return false;
            }
              
            $expiracao = $decoded->exp;

            $timestamp_atual = time();

            if ($timestamp_atual > $expiracao) {
                return false;
            }

            return true;
        }
    }
?>