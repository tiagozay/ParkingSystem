<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Mensalidade;
    use ParkSistem\Helper\EntityManagerCreator;

    $entityManager = EntityManagerCreator::create();

    $mensalidadeRepository = $entityManager->getRepository(Mensalidade::class);

    /** @var Mensalidade[] */
    $mensalidades = $mensalidadeRepository->findAll();

    header('Content-Type: application/json');
    echo json_encode($mensalidades);
?>