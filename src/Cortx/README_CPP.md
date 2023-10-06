# Cortx
> O código é o ponto de entrada principal para um programa chamado Cortex. Ele processa os argumentos da linha de comando, configura o tratamento de sinais do sistema e executa a classe Cortex. A classe Cortex é responsável pela lógica principal do programa. Os argumentos da linha de comando esperados são o endereço IP e a porta do servidor. O programa também configura um manipulador de sinal para lidar com o sinal SIGINT, que é enviado quando o programa é interrompido (por exemplo, quando o usuário pressiona Ctrl+C).

O código começa incluindo as bibliotecas necessárias. A biblioteca <iostream> é usada para operações de entrada e saída padrão, a biblioteca "Cortx.hpp" é usada para incluir a classe Cortx, e a biblioteca <csignal> é usada para manipular sinais do sistema Linux.

Em seguida, o código define uma função chamada handleSignal que é usada para manipular o sinal SIGINT. Este sinal é enviado quando o programa é interrompido, por exemplo, quando o usuário pressiona Ctrl+C
