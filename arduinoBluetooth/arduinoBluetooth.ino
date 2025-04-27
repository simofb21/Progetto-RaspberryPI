/*
Questo codice consente all' arduino di leggere i dati x e y di un joystick e di inviarli tramite bluetooth.
Il codice utilizza la libreria SoftwareSerial per la comunicazione seriale con il modulo bluetooth HC-05.
Il modulo bluetooth è collegato ai pin 8 e 9 dell' arduino.
Il joystick è collegato ai pin analogici 0 e 1 dell' arduino.
Il codice legge i valori x e y del joystick e li invia tramite bluetooth in formato JSON.
Il formato JSON è il seguente:
{ "X" : x, "Y" : y }
*/
#include <SoftwareSerial.h>

typedef struct {
  int x;
  int y;
} Joystick;

SoftwareSerial BTserial(8, 9); // RX, TX
int xAxisPin = 0; // X pin Joystick
int yAxisPin = 1; // Y pin Joystick

void setup() {
    Serial.begin(9600); //inizializzo comunicazione seriale 
    BTserial.begin(38400); //inizializzo comunicazione bluetooth
}

void loop() {
  Joystick joystick;
  joystick.x = analogRead(xAxisPin); // read x
  joystick.y = analogRead(yAxisPin); // read y
  Serial.print("{ \"X\" : "); // print
  Serial.print(joystick.x);
  Serial.print(", \"Y\" : ");
  Serial.print(joystick.y);
  Serial.println(" }");
  delay(100);
}
