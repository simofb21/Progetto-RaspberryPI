#include <SoftwareSerial.h>
SoftwareSerial BTserial(8, 9); // RX, TX

int xAxisPin = 0; //  X pin Joystick
int yAxisPin = 1; // pin y joystick

typedef struct {
  int x;
  int y;
} Joystick;
void setup() {
    Serial.begin(9600);
    Serial.print("Sketch: "); 
    Serial.println(__FILE__); 
    Serial.print("Uploaded: ");
    Serial.println(__DATE__); 
    Serial.println(" ");
    BTserial.begin(38400); 
    Serial.println("BTserial started at 38400");
    Serial.println(" ");
    Joystick joystick;
}
void loop(){
    joystick.x = analogRead(xAxisPin); // leggo x 
    joystick.y = analogRead(yAxisPin); //leggo y

    BTSerial.print("{ \"X\" : "); //invio via bluetooth
    BTSerial.print(joystick.x);
    BTSerial.print(", \"Y\" : ");
    BTSerial.print(joystick.y);
    BTSerial.println(" }");

  delay(200);
}