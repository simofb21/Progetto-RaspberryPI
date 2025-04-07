#include <SoftwareSerial.h>

typedef struct {
  int x;
  int y;
} Joystick;

SoftwareSerial BTserial(8, 9); // RX, TX
int xAxisPin = 0; // X pin Joystick
int yAxisPin = 1; // Y pin Joystick

void setup() {
    Serial.begin(9600);
    BTserial.begin(38400); 
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
