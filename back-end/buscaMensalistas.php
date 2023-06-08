<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Helper\EntityManagerCreator;

    $entityManager = EntityManagerCreator::create();

    $mensalistaRepository = $entityManager->getRepository(Mensalista::class);

    /** @var Mensalista[] */
    $mensalistas = $mensalistaRepository->findAll();

    echo json_encode($mensalistas);
?>