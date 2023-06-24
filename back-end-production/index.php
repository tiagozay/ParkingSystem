<?php
    require_once './vendor/autoload.php';

    // date_default_timezone_set('America/Sao_Paulo');

    use ParkSistem\Domain\Model\FormaDePagamento;
    use ParkSistem\Domain\Model\Mensalidade;
    use ParkSistem\Domain\Model\Mensalista;
    use ParkSistem\Domain\Model\Precificacao;
    use ParkSistem\Domain\Model\Ticket;
    use ParkSistem\Domain\Model\Veiculo;

    $mensalista = new Mensalista(
        null,
        "Tiago zay",
        new DateTime(),
        '132.025.979-06',
        'tiagozay@gmail.com',
        '(42) 99931-8075',
        true, 
        '84620-000',
        'PR',
        "Cruz machado"
    );

    $formaDePagamento = new FormaDePagamento(1, "Dinheiro", true, false);

    $precificacao = new Precificacao(1, "Carro", 10, 150, true, 25);

    $mensalidade = new Mensalidade(
        1, 
        $mensalista,
        $precificacao,
        150,
        $formaDePagamento,
        new DateTime('2023-04-31'),
    );

    $ticket = new Ticket(
        null,
        "APN-2018",
        "Honda",
        "Fan 125",
        null,
        $precificacao,
        new DateTime(),
        null,
        null,
        null
    );

    // $ticket->editar("APN-2018", "Honda", "Fan 125", $formaDePagamento, $precificacao, new DateTime(), new DateTime(), null, null );

    echo "<pre>";
    print_r($ticket);
    echo "</pre>";

?>