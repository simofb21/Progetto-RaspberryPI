#include <SoftwareSerial.h>
SoftwareSerial BTserial(8, 9); // RX, TX

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
}

void loop() {
    // Invia "Hello, World!" tramite Bluetooth in un loop
    BTserial.println("Hello, World!");
    delay(1000); // Aspetta 1 secondo prima di inviare di nuovo
}
