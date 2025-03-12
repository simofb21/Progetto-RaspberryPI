int xAxisPin = 0; // define X pin of Joystick
int yAxisPin = 1; // define Y pin of Joystick
typedef struct {
  int x;
  int y;
} Joystick;
void setup() {
pinMode(zAxisPin, INPUT_PULLUP); // initialize the port to pull-up input
Serial.begin(9600); // initialize the serial port with baud rate 9600
}

void loop() {
 Joystick joystick;
  joystick.x = analogRead(xAxisPin); // read the X value
  joystick.y= analogRead(yAxisPin); // read the Y value

  Serial.print("{("X" : joystick.x, "Y" : joystick.y)}");

  delay(200);

}
