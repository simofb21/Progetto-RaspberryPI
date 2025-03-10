int xAxisPin = 0; // define X pin of Joystick
int yAxisPin = 1; // define Y pin of Joystick
int zAxisPin = 8; // define Z pin of Joystick
int xVal, yVal, zVal; // define 3 variables to store the values of 3 direction

void setup() {
pinMode(zAxisPin, INPUT_PULLUP); // initialize the port to pull-up input
Serial.begin(9600); // initialize the serial port with baud rate 9600
}

void loop() {
  xVal = analogRead(xAxisPin);
  yVal = analogRead(yAxisPin);

  zVal = digitalRead(zAxisPin);

  Serial.print("X: ");
  Serial.print(xVal);

  Serial.print("\tY: ");
  Serial.print(yVal);

  Serial.print("\tZ: ");
  Serial.println(zVal);

  delay(200);

}
