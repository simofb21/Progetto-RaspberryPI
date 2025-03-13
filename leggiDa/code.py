import serial
import requests
import json
# lo usiamo da windows

ser = serial.Serial(
    port='COM5',  #così è da pc , sarà da cambiare con la porta seriale del raspberry
    baudrate=9600,        
    timeout=1            
)

url = "http://192.168.1.12:5000/update_position"  # da cambiare con ip raspberry a scuola

print("Listening for messages from ARDUINO...")

def send_position(x, y):
    """
    Invio la posizione (x, y) al server Flask.
    """
    data = {
        "x": x,
        "y": y
    }
    try:
        response = requests.post(url, json=data)
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
            data = ser.readline().decode('utf-8').strip()
            print(f"Received: {data}")
            #legge da seriale e stampa a video 
            try:
                position = json.loads(data)
                if "X" in position and "Y" in position:
                    x = position["X"]
                    y = position["Y"]
                    send_position(x, y)  # Invia al server la posizione x,y che ho letto dal joystick via seriale
                else:
                    print(f"Invalid data format: {data}")
            except json.JSONDecodeError:
                print(f"Error decoding JSON: {data}")
except KeyboardInterrupt:
    print("\nExiting...")
finally:
    ser.close()