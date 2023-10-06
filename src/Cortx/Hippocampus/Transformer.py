import cv2
import serial
import time


class Transformer:
    # Constantes
    HEIGHT_REFERENCE        = 30  # cm
    DISTANCE_REFERENCE      = 2  # metros
    COEFFICIENT_VARIATION   = 0.01  # variação em graus por mm
    HORIZONTAL_MIN_ANGLE    = 30  # graus
    HORIZONTAL_MAX_ANGLE    = 150  # graus
    HORIZONTAL_CENTER_ANGLE = 90  # graus
    VERTICAL_MIN_ANGLE      = 30  # graus
    VERTICAL_MAX_ANGLE      = 150  # graus
    VERTICAL_CENTER_ANGLE   = 90  # graus
    def __init__(self):
        pass


    def sendToEd(self, command):
        # Especifique a porta serial e a taxa de transmissão apropriada.
        # Por exemplo, '/dev/ttyUSB0' ou 'COM3'. 
        # Modifique de acordo com a configuração do seu sistema.
        ser = serial.Serial('/dev/ttyACM0', 9600)
        time.sleep(2)  # Aguarda a inicialização da conexão serial
        
        # Envia o comando para o Arduino.
        ser.write(command.encode())
        
        # Fecha a conexão serial.
        ser.close()

    def calculate_angles(self, bounding_box, image_width, image_height):
        if bounding_box is None:
            return None, None
        
        x, y, width, height = bounding_box

        # Calcular a escala da imagem com base na altura do bounding box
        scale = height / Transformer.HEIGHT_REFERENCE

        # Calcular o coeficiente de ajuste com base na escala
        coefficient = 1 + (scale - 1) * Transformer.COEFFICIENT_VARIATION

        # Calcular a posição horizontal e vertical do centro do bounding box
        center_x = x + width / 2
        center_y = y + height / 2

        # Calcular os ângulos horizontal e vertical
        horizontal_angle = ((center_x / image_width) * (Transformer.HORIZONTAL_MAX_ANGLE - Transformer.HORIZONTAL_MIN_ANGLE) + Transformer.HORIZONTAL_MIN_ANGLE) * coefficient
        vertical_angle = ((center_y / image_height) * (Transformer.VERTICAL_MAX_ANGLE - Transformer.VERTICAL_MIN_ANGLE) + Transformer.VERTICAL_MIN_ANGLE) * coefficient

        # Enviar os ângulos para o Arduino
        # self.sendToEd(horizontal_angle, vertical_angle)
        return horizontal_angle, vertical_angle

if __name__ == "__main__":
    transformer = Transformer()
    # Comando a ser enviado para o Arduino.
    # Este comando deve ser reconhecido pelo código que você carrega no Arduino.
    command = "blink_led"
    transformer.sendToEd(command)