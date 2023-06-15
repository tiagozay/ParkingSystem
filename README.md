# ParkSystem

O ParkSystem é um sistema de gerenciamento de estacionamento desenvolvido utilizando React JS no front-end e PHP no back-end. Ele permite o controle de tickets, gerenciamento de mensalidades e mensalistas, gestão de precificação para diferentes categorias de veículos, controle de formas de pagamento, autenticação de usuários com JWT e muito mais.

## Principais Funcionalidades

- Abertura de tickets: Os usuários podem abrir um ticket para registrar a entrada de um veículo no estacionamento. O sistema captura informações como a placa do veículo, a data e hora de entrada, e gera um ticket único para identificação.

- Edição de tickets: Os usuários têm a opção de editar informações nos tickets, como a placa do veículo ou a categoria. Isso permite correções ou atualizações necessárias durante a estadia do veículo no estacionamento.

- Impressão de tickets: O sistema permite a impressão de tickets para fornecer uma cópia física ao proprietário do veículo ou para fins de registro interno. A impressão pode ser feita diretamente a partir do sistema ou usando um dispositivo externo compatível.

- Fechamento de tickets: Quando um veículo deixa o estacionamento, o usuário pode fechar o ticket correspondente. O sistema calcula automaticamente a duração da estadia e o valor a ser pago com base nas regras de precificação definidas.

- Controle de mensalidades e mensalistas: O sistema permite o gerenciamento de mensalidades, onde os usuários podem se inscrever como mensalistas e pagar uma taxa mensal fixa para acesso ilimitado ao estacionamento. O sistema registra e controla os pagamentos das mensalidades.

- Gestão de precificação: O ParkSystem oferece controle das categorias de veículos suportadas pelo estacionamento, como carro, moto, caminhão, etc. É possível configurar as tarifas e regras de cobrança para cada categoria, levando em consideração a duração da estadia, horários de pico e descontos especiais.

- Controle de formas de pagamento: O sistema permite o cadastro e gerenciamento de diferentes formas de pagamento, como dinheiro, cartões de crédito, cartões pré-pagos, entre outros. Os usuários têm a opção de selecionar a forma de pagamento desejada ao fechar um ticket.

- Autenticação de usuários com JWT: O sistema possui um sistema de autenticação seguro, onde os usuários podem criar contas, fazer login e obter tokens de acesso usando o JWT (JSON Web Tokens). Isso garante a proteção das informações e controla o acesso aos recursos do sistema.

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório do projeto: <br>
`git clone https://github.com/seu-usuario/ParkSystem.git`

2. Instale as dependências do front-end:<br>
`
cd ParkSystem/frontend
npm install
`

3. Configure as variáveis de ambiente no arquivo .env do front-end. Exemplo:<br>
`
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_JWT_SECRET=seu-segredo-jwt
`

4. Instale as dependências do back-end:<br>
`
cd ../backend
composer install
`

5. Configure as variáveis de ambiente no arquivo .env do back-end. Exemplo:<br>
`
APP_ENV=local
APP_KEY=sua-chave
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=parksystem
DB_USERNAME=seu-usuario-db
DB_PASSWORD=sua-senha-db
`

6. Configure o banco de dados de acordo com as informações do arquivo .env.<br>

7. Execute as migrações do banco de dados:<br>
`
php artisan migrate
`

8. Inicie o servidor de desenvolvimento do front-end:
`
npm start
`

9. Inicie o servidor de desenvolvimento do back-end:
`
php artisan serve
`

Agora o ParkSystem está configurado e você pode acessá-lo em `http://localhost:3000` no seu navegador.

## Tecnologias Utilizadas

- React JS: Biblioteca JavaScript para a construção da interface do usuário.

- PHP: Linguagem de programação utilizada para o desenvolvimento do back-end.

- MySQL: Banco de dados relacional utilizado para armazenar as informações do sistema.

- JWT (JSON Web Tokens): Tecnologia utilizada para autenticação e geração de tokens de acesso.

- HTML5 e CSS3: Utilizados para estruturação e estilização da interface do usuário.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues relatando problemas, sugerir melhorias ou enviar pull requests com novos recursos ou correções de bugs.

## Licença

O ParkSystem é um software de código aberto licenciado sob a licença [MIT](https://opensource.org/licenses/MIT). Isso significa que você é livre para usá-lo, modificá-lo e distribuí-lo conforme sua necessidade.

## Contato

Se tiver alguma dúvida ou precisar de mais informações, entre em contato pelo email [tiagozay@gmail.com](mailto:tiagozay@gmail.com).



