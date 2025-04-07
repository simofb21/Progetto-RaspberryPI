import serial

# lo usiamo da windows
ser = serial.Serial(
    port='COM5',  # così è da pc, sarà da cambiare con la porta seriale del raspberry
    baudrate=9600,
    timeout=1
)

print("i am currently listening your messages")

try:
    while True:
        if ser.in_waiting > 0:
            data = ser.readline().decode('utf-8').strip()
            print(f"Received: {data}")
            # legge da seriale e stampa a video

except KeyboardInterrupt:
    print("\nExiting...")
finally:
    ser.close()