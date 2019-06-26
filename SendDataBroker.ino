#include <BearSSLHelpers.h>
#include <CertStoreBearSSL.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiClientSecureAxTLS.h>
#include <WiFiClientSecureBearSSL.h>
#include <WiFiServer.h>
#include <WiFiServerSecure.h>
#include <WiFiServerSecureAxTLS.h>
#include <WiFiServerSecureBearSSL.h>
#include <WiFiUdp.h>

#include <ESP8266MQTTClient.h>

MQTTClient mqtt;

const int analogInPin = A0;  

int sensorValue = 0;  
int outputValue = 0;  

char ssid[] = "ton reseau wifi";
char pass[] = "le mdp";

void setup() {
  
  Serial.begin(115200);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  
   mqtt.onConnect([]() 
   {
    Serial.print("MQTT: Connected\r\n");
     mqtt.publish("/test", "test");
  });
  
  mqtt.begin("ws://192.168.43.153:8083/mqtt");
  mqtt.connect();

}

void loop() {

  
  sensorValue = analogRead(analogInPin);
  outputValue = map(sensorValue, 0, 1024, 0, 255);
  
  Serial.print("sensor = ");
  Serial.print(sensorValue);
  Serial.print("\t output = ");
  Serial.println(outputValue);

  delay(1000);
}
