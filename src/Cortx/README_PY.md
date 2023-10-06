# Cortx
## Cortx.py
> Este programa é um cliente WebSocket que se conecta a um servidor, recebe frames de vídeo de um drone, processa esses frames para detectar pessoas e envia os frames processados de volta para o servidor.

Este programa Python é usado para conectar um programa a um drone através de um servidor WebSocket. O programa recebe dois argumentos da linha de comando, que são o endereço IP e a porta do servidor.

O programa começa verificando se o número correto de argumentos foi passado. Se não, ele imprime uma mensagem de uso e termina. Em seguida, ele obtém o endereço IP e a porta do servidor a partir dos argumentos da linha de comando.

O programa então cria um novo objeto socket e se conecta ao servidor e um objeto Detector que é usado para processar os frames recebidos do drone.

Ele entra em um loop infinito onde tenta conectar-se a um servidor WebSocket. Dentro deste loop, o programa entra em outro loop onde lê o cabeçalho e o tamanho do frame do socket.

Se o cabeçalho for válido, o programa lê os dados do frame do socket. Os dados do frame são então convertidos em uma imagem usando a biblioteca OpenCV. A imagem é passada para o objeto Detector que retorna uma versão anotada da imagem.

Se a imagem anotada não estiver vazia, ela é codificada como JPG e enviada para o servidor Node.js através do WebSocket. Se a imagem anotada estiver vazia, o programa volta para o início do loop.

Se a conexão WebSocket for fechada, o programa tenta se reconectar após um segundo.

Este processo continua até que o programa seja interrompido.

## Processing/TemporalLobe
> Este programa é um detector de rostos que carrega um banco de dados de rostos conhecidos, detecta rostos em um quadro de vídeo e anota o quadro com os nomes dos rostos reconhecidos.

O programa começa com a importação das bibliotecas necessárias, como a face_recognition para o reconhecimento facial, cv2 para o processamento de imagens e os e glob para manipulação de arquivos e diretórios.

Em seguida, é definida a classe Detector, que é responsável por carregar as imagens de rostos conhecidos do banco de dados e realizar o reconhecimento facial. No construtor da classe, o programa carrega todas as imagens de rostos conhecidos de um diretório específico e extrai as codificações faciais dessas imagens. Essas codificações são armazenadas em uma lista, juntamente com os nomes correspondentes e os IDs dos rostos.

A classe Detector também possui o método annotate_frame, que recebe um quadro de vídeo, detecta todos os rostos presentes no quadro, compara as codificações faciais desses rostos com as codificações faciais conhecidas e anota o quadro com os nomes dos rostos reconhecidos. Se um rosto não for reconhecido, ele é anotado como "Rosto Desconhecido".

Depois de definir a classe Detector, o programa verifica se o número correto de argumentos foi passado. Se não, ele imprime uma mensagem de uso e termina. Se o número correto de argumentos foi passado, o programa extrai o argumento, que é o caminho para o arquivo de vídeo a ser processado.

Em seguida, o programa cria uma instância da classe Detector e entra em um loop infinito, onde lê quadros do arquivo de vídeo, passa cada quadro para o método annotate_frame do detector e exibe o quadro anotado.

Além disso, se um arquivo específico chamado 'synapse' existir, o programa escreve o ID da pessoa identificada nesse arquivo. Isso pode ser útil para comunicação entre diferentes partes de um sistema maior.

Finalmente, o programa termina quando todos os quadros do arquivo de vídeo foram processados.