#codice di prova usato solo per leggere i dati da bluetooth e stampare a video , eseguito sul pc windows
import serial
import json

# Configura la porta seriale : assicurati di usare la porta corretta per il tuo dispositivo Bluetooth , se si usa windows è com5, o com7 ecc
# se si usa linux o raspberry è /dev/ttyUSB0 o /dev/rfcomm0 ecc
ser = serial.Serial(
    port='COM5',  # sostituire  con la porta corretta
    baudrate=9600,        
    timeout=1            
)

print("Listening for messages from ARDUINO...")

try:
    while True:
        if ser.in_waiting > 0:
            try:
                data = ser.readline().decode('utf-8').strip()
                if data:  # verifica se la stringa ricevuta non è vuota
                    print(f"Received: {data}")#stampa stringa ricevuta dal seriale
                    # decodifica la stringa JSON
                    try:
                        position = json.loads(data)
                        if "X" in position and "Y" in position:
                            x = position["X"]
                            y = position["Y"]
                            print(f"Position: X={x}, Y={y}")  # stampa la posizione x,y letta dal joystick in json
                        else:
                            print(f"Invalid data format: {data}")
                    except json.JSONDecodeError:
                        print(f"Error decoding JSON: {data}")
                else:
                    print("Received an empty message. Ignoring.")
            except UnicodeDecodeError:
                print("Error decoding serial data. Ignoring invalid bytes.")
except KeyboardInterrupt:
    print("\nExiting...")
finally:
    ser.close()