import serial
import requests
import json

# Configura la porta seriale
ser = serial.Serial(
    port='COM5', #tenere com 5 e collegare sulla prima porta del pc
    baudrate=9600,        
    timeout=1            
)

url = "http://10.0.98.30:5000//update_position"  # da sostituire con url server 
    
print("Listening for messages from ARDUINO...")

def send_position(x, y):
    """
    invia la posizione (x, y) al server Flask.
    """
    data = {
        "x": x,
        "y": y
    }
    try:
        response = requests.post(url, json=data) #fa la post al server con i dati x e y
        if response.status_code == 204: 
            print("Posizione aggiornata con successo")
        else:
            print(f"Errore: {response.status_code}")
    except requests.ConnectionError as e:
        print(f"Connection error: {e}")
    except requests.Timeout as e:
        print(f"Request timed out: {e}")

try:
    while True:
        if ser.in_waiting > 0:
            try:
                data = ser.readline().decode('utf-8').strip()
                if data:  # verifica se la stringa ricevuta non è vuota
                    print(f"Received: {data}") #ati ricevuti dal seriale
                  
                    try:
                        position = json.loads(data)
                        if "X" in position and "Y" in position:
                            x = position["X"]
                            y = position["Y"]
                            send_position(x, y) #mette in json i dati e li invia al server
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