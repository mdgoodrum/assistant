#include "ESP8266WiFi.h"

const char* host = "37ab1680.ngrok.io"; 

const char* MY_SSID = "Sonika Finch iphone";
const char* MY_PWD =  "sonwifip";


void setup()
{
  Serial.begin(9600);
  Serial.print("Connecting to "+*MY_SSID);
  WiFi.begin(MY_SSID, MY_PWD);
  Serial.println("going into Wifi connect");

  while (WiFi.status() != WL_CONNECTED) { //not connected,  ...waiting to connect
      delay(1000);
      Serial.print(".");
  }
  Serial.println("Wifi connected");
}

void loop() {
  
  WiFiClient client;

   // Wait a 5 seconds between measurements.
  delay(5000);
  // Read force
  String data = (String) analogRead(A0);
  Serial.println("\nForce read at: " + data + "mN"); 
  
  Serial.printf("\nStarting connection to server %s...", host); 
  
  // if you get a connection, report back via serial:
  if (client.connect(host, 80)) {
    Serial.println("Connected to server");
    WiFi.printDiag(Serial);
    
    client.print(String("GET /") + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n"
                );
    client.println("Content-Type: text/plain");
    client.print("Content-Length: ");
    client.print(data.length());
    client.print("\n\n");
    client.print(data);
    client.print("Connection: close\r\n\r\n");
    client.stop(); 

    Serial.println("\n");
    Serial.println("My POSTed data string looks like this: ");
    Serial.println(data);
    Serial.println("And it has this many bytes: ");
    Serial.println(data.length());       
    delay(2000);
  } 
  else
  {
    Serial.println("connection failed!]");
    client.stop();
  }

}
