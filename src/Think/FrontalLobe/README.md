# Servidor Web Node.js

## Server.js

> O programa server.js é um servidor Node.js que serve uma página React para interagir com o usuário, recebe frames do cliente Python, gerencia fotos de faces conhecidas e gerencia o banco de dados.

O script server.js é um servidor Node.js que serve uma página React para interagir com o usuário, recebe frames do cliente Python, gerencia as fotos de faces conhecidas e gerencia o banco de dados.

Primeiro, as bibliotecas necessárias são importadas. Isso inclui fs para manipulação de arquivos, http para criar um servidor HTTP, WebSocket para criar um servidor WebSocket, express para lidar com solicitações HTTP, mongoose para conectar ao MongoDB, apiRoutes para definir as rotas da API e cors para permitir solicitações de origem cruzada.

Em seguida, uma nova aplicação Express é criada e o CORS é habilitado. A conexão com o MongoDB é estabelecida e, em caso de sucesso, uma mensagem é exibida no console. Se ocorrer um erro, ele também é exibido no console.

A aplicação Express é configurada para usar JSON e as rotas da API. Em seguida, o servidor da API começa a ouvir na porta 8081.

Um servidor HTTP é criado e dois servidores WebSocket são associados a ele: um para o cliente web e outro para o cliente Python. Uma variável connectionCount é inicializada para contar o número de conexões e uma variável connected é usada para rastrear o status da conexão.

Quando um cliente web se conecta, uma mensagem é exibida no console. Quando um cliente Python se conecta, a variável connected é definida como verdadeira e o contador de conexões é incrementado. Se houver mais de uma conexão, o servidor WebSocket Python é fechado.

Quando uma mensagem é recebida do cliente Python, ela é decodificada e a imagem é enviada para o cliente web. Se o cliente Python se desconectar, uma mensagem é exibida no console, a variável connected é definida como falsa e o contador de conexões é decrementado.

Finalmente, o servidor lida com a atualização de solicitações para diferentes caminhos e começa a ouvir na porta 8080.

# API
> O programa é uma API que gerencia a adição, autenticação, recuperação e exclusão de pessoas em um banco de dados, utilizando o Express.js e o Multer para o upload de fotos.

O programa começa importando as bibliotecas necessárias: Express, Multer e o módulo de roteamento do Express. Em seguida, importa o controlador de pessoas, que é responsável por gerenciar as operações de CRUD (criação, leitura, atualização e exclusão) no banco de dados.

O Multer é configurado para armazenar arquivos na pasta '/app/faces_bd/' e o nome do arquivo é mantido como o nome original do arquivo enviado.

O Multer é então inicializado com as configurações de armazenamento definidas.

As rotas da API são definidas usando o roteador Express e gerenciam o banco de dados mongodb. Há uma rota POST para adicionar uma pessoa, que aceita um único arquivo de foto como parte do corpo da solicitação. Há uma rota GET para recuperar todas as pessoas e outra rota GET para autenticar uma pessoa. Por fim, há uma rota DELETE para excluir uma pessoa.

Finalmente, o módulo de roteamento é exportado para uso em outros módulos.