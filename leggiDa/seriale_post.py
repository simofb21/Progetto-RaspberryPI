import serial
import requests
import json
# lo usiamo da windows
#codice che funziona in questo modo : comunicazione via seriale tra arduino e pc , e pc comunica con raspberry via post
# quindi il pc legge i dati da arduino e li manda al raspberry via post

ser = serial.Serial(
    port='COM5',  #così è da pc , sarebbe da cambiare con la porta seriale del raspberry
    baudrate=9600,        
    timeout=1            
)

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
            print(f"Received: {data}")
            #legge da seriale e stampa a video 
            try:
                position = json.loads(data) #se ha ricevuto una x e una y ...
                if "X" in position and "Y" in position:
                    x = position["X"]
                    y = position["Y"]
                    send_position(x, y)  # mette in json i dati e li invia al server
                else:
                    print(f"Invalid data format: {data}")
            except json.JSONDecodeError:
                print(f"Error decoding JSON: {data}")
except KeyboardInterrupt:
    print("\nExiting...")
finally:
    ser.close()