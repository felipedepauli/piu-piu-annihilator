## WakeUP
> O WakeUP tem como papel escutar e estabelecer novas conexões entre o servidor, que roda em sistema embarcado, e o cliente. Ele roda e escuta a porta 30001 por novas conexões. Quando há, ele estabelece a conexão e, se tudo certo, inicia uma nova sessão para tratar dessa nova entidade.

O código é uma implementação de um servidor TCP assíncrono usando a biblioteca Boost.Asio em C++. A biblioteca Boost.Asio fornece uma base para a programação de I/O assíncrono usando o modelo de programação baseado em proactor.

A classe WakeUP é o núcleo do servidor. Ela inicia o servidor na porta especificada e começa a ouvir por novas conexões. Quando uma nova conexão é aceita, uma nova sessão é criada para lidar com a interação cliente-servidor. Cada sessão é executada em sua própria thread para permitir múltiplas conexões simultâneas.

O método WakeUP::listening() inicia uma operação assíncrona para aceitar uma nova conexão. Quando uma nova conexão é aceita, uma nova sessão é criada e uma nova thread é iniciada para lidar com a interação cliente-servidor. Se ocorrer um erro ao aceitar uma nova conexão, uma mensagem de erro é exibida e o servidor volta a ouvir por novas conexões.

O método WakeUP::run() inicia o loop de eventos para conexões de entrada. Este loop de eventos é responsável por processar todas as operações de I/O assíncronas que foram iniciadas.

Em resumo, este código é uma implementação eficiente e escalável de um servidor TCP assíncrono que pode lidar com múltiplas conexões simultâneas.



## Session
> A classe Session no arquivo Session.cpp é parte de um servidor que gerencia sessões de comunicação com clientes e é o ponto de contato entre o sistema de comunicação com clientes e os módulos de processamento do servidor. Neste caso, o módulo de processamento é a captura de frames, realizado pela class Eys.

A classe Session é responsável por gerenciar uma sessão entre o servidor e um cliente. Ela possui um construtor que inicializa o socket e o objeto evilEys_, e um destrutor que registra o fim de uma sessão. A função start inicia a sessão chamando a função process.

A função process lida com as solicitações do cliente. Ela abre a câmera, define a taxa de quadros e calculao intervalo de quadros. Em seguida, entra em um loop para lidar com as solicitações do cliente. Em cada iteração do loop, ela obtém um quadro da câmera, verifica se o quadro está vazio e, se não estiver, envia o quadro para o cliente. Em seguida, calcula o tempo decorrido e, se o tempo decorrido for menor que o intervalo de quadros, dorme pelo tempo restante.

A função send_frame é responsável por enviar um quadro para o cliente. Ela envia o cabeçalho para o cliente, converte o quadro em jpg e o armazena em um buffer, converte o tamanho do buffer para a ordem de bytes da rede e envia o tamanho do buffer para o cliente. Finalmente, envia os dados da imagem para o cliente.

## Eyes
> O arquivo Eys.cpp define a classe Eys, que é responsável por gerenciar a câmera do sistema. A função openEyes é usada para abrir a câmera e configurar o pipeline do GStreamer quando o servidor inicia, enquanto a função spark é usada para capturar um único frame da câmera, sendo chamado de acordo com o FPS desejado.

O construtor Eys::Eys() e o destrutor Eys::~Eys() são bastante simples, apenas exibindo mensagens no console para indicar quando a câmera está sendo aberta e fechada, respectivamente.

A função Eys::openEyes() é onde a inicialização da câmera é feita. Primeiro, define-se uma string pipeline que contém o pipeline do GStreamer usado para abrir a câmera Raspberry Pi. Em seguida, define-se o tamanho do buffer interno para 2, o que significa que o buffer interno armazenará apenas 2 frames. Depois, tenta-se abrir a câmera usando o pipeline do GStreamer. Se a câmera não puder ser aberta por algum motivo, uma mensagem de erro é exibida e a função retorna -1. Se a câmera for aberta com sucesso, a função retorna 0.

Finalmente, a função Eys::spark() é usada para capturar um único frame da câmera. 














Marcos Wehrmeister DAINF
João Fabro DAINF
