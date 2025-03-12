import serial
import requests
import time
# Configura la porta seriale
ser = serial.Serial(
    #port='/dev/serial0', 
    port='/dev/ttyUSB0',
    baudrate=9600,        
    timeout=1            
)
url = "http://10.0.1.13:5000/update_position" # qua sistemerò dopo 

def send_position(x, y):
    """
    Invia la posizione (x, y) al server Flask.
    """
    data = {
        "x": x,
        "y": y
    }
    response = requests.post(url, json=data)
    if(response.status_code == 204):
        print(f"Sent: {data}")
    elif(response.status_code == 404):
        print(f"Error 404: {response.text}")

try:
    while True:
        if ser.in_waiting > 0: 
            data = ser.readline().decode('utf-8').strip()
            print(f"Received: {data}")
            #Qua metterò la parte che fa la richiesta al server 
            if("," in data):
                x, y = data.split(",")
                send_position(float(x),float(y)) #invio al server la posizione x,y che ho letto dal joystick via seriale
        time.sleep(0.1)
except KeyboardInterrupt:
    print("\nExiting...")
finally:
    ser.close()
