<?php

    header("Access-Control-Allow-Origin: *");

    require_once './vendor/autoload.php';

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\Entity;
use ParkSistem\Domain\Model\FormaDePagamento;
    use ParkSistem\Domain\Model\Mensalidade;
    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Domain\Model\Precificacao;
    use ParkSistem\Helper\EntityManagerCreator;

    $json = file_get_contents('php://input');

    $stdMensalidade = json_decode($json);

    try {
        $entityManager = EntityManagerCreator::create();

        /** @var Mensalista */
        $mensalista = $entityManager->find(Mensalista::class, $stdMensalidade->mensalista->id);

        /** @var Precificacao */
        $precificacao = $entityManager->find(Precificacao::class, $stdMensalidade->categoria->id);

        /** @var FormaDePagamento */
        $formaDePagamento = $entityManager->find(FormaDePagamento::class, $stdMensalidade->formaDePagamento->id);

        $mensalidade = new Mensalidade(
            null,
            $mensalista,
            $precificacao,
            $stdMensalidade->valor,
            $formaDePagamento,
            new DateTime($stdMensalidade->dataDeCompra)
        );

        $mensalidadeRepositroy = $entityManager->getRepository(Mensalidade::class);

        if(Mensalidade::verificaSeExisteMensalidadeIgual($mensalidade, $mensalidadeRepositroy->findAll())){
            throw new DomainException("Esta mensalidade já existe");
        };

        $entityManager->persist($mensalidade);

        $entityManager->flush();

        http_response_code(200);
        echo json_encode($mensalidade);

    }catch( Throwable $e ){
        http_response_code(500);
        echo $e->getMessage();
    }
?>