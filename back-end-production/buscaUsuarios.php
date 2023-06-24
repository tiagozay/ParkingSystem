<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Usuario;
    use ParkSistem\Helper\EntityManagerCreator;

    $entityManager = EntityManagerCreator::create();

    $usuarioRepository = $entityManager->getRepository(Usuario::class);

    /** @var Usuario[] */
    $usuarios = $usuarioRepository->findAll();

    header('Content-Type: application/json');
    echo json_encode($usuarios);
?>