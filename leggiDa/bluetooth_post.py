'''
Codice che : legge da bluetooth i dati del joystick e li manda al server via post
'''
import serial
import time
import requests
import json
# Per windows
ser = serial.Serial('COM5', 38400, timeout=1) #uso 38400 perche è la velocità di baudrate del modulo bluetooth hc-05 : bisogna verificare se la porta usata è quella corretta

url = "http://10.0.97.207:5000/update_position"  # da cambiare con ip raspberry a scuola

print("i am currently listening your messages")
        
def send_position(x, y):
    """
   invio posizione con post a pagina update position
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
            if(data):
                print(f"Received: {data}")
            else:
                print("No data received")
            #legge da seriale e stampa a video 
            try:
                position = json.loads(data) #se ha ricevuto una x e una y ...
                if "X" in position and "Y" in position:
                    x = position["X"]
                    y = position["Y"]
                    send_position(x, y)  # invia al server la posizione x,y che ho letto dal joystick via seriale
                else:
                    print(f"Invalid data format: {data}")
            except json.JSONDecodeError:
                print(f"Error decoding JSON: {data}")
except KeyboardInterrupt:
    print("\nExiting...")
finally:
    ser.close()