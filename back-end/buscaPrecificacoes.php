<?php
    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

    use ParkSistem\Domain\Model\Precificacao;
    use ParkSistem\Helper\EntityManagerCreator;

    $entityManager = EntityManagerCreator::create();

    $precificacaoRepository = $entityManager->getRepository(Precificacao::class);

    /** @var Precificacao[] */
    $precificacoes = $precificacaoRepository->findAll();

    echo json_encode($precificacoes);
?>