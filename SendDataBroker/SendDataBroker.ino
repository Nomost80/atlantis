
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

const char* ssid = "Redmi";
const char* password = "El Psy Congroo";
const char* mqtt_server = "192.168.43.153";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
int value = 0;

void setup_wifi()
{
  delay(10);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("Wifi connected");
  Serial.println("IP address : ");
  Serial.println(WiFi.localIP());
}


void callback(char* topic, byte* payload, unsigned int length)
{
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  for (int i=0; i< length; i++)
  {
    Serial.print((char)payload[i]);
  }

  DynamicJsonDocument doc2(512);
  deserializeJson(doc2, payload, length);


  Serial.println();
  Serial.println("----------------");
  
}


void reconnect() 
{
  
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) 
    {
      Serial.println("connected");
      client.subscribe("B4:E6:2D:09:5B:A7/command");
    
    } 
    else 
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

int photocellPin = 0;
int photocellReading; 


void setup() 
{
  pinMode(BUILTIN_LED, OUTPUT);     
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  
}


void loop() 
{
  if (!client.connected()) 
  {
    reconnect();
  }
  client.loop();

  photocellReading = analogRead(photocellPin);

  DynamicJsonDocument doc(512);

  doc["macAddress"] = WiFi.macAddress();
  doc["sensorPin"] = "A0";
  doc["sensorType"] = "Brightness";
  doc["metricValue"] = photocellReading;
  doc["sensorName"] = WiFi.macAddress()+".Brightness01";
  char buffer[512];

  serializeJson(doc, buffer);

  long now = millis();
  if (now - lastMsg > 5000) 
  {
    lastMsg = now;
    ++value;
    
    Serial.print("Publish message: ");
    Serial.println(buffer);
    
    boolean sended = client.publish("metric", buffer, true);
    if (sended == true) {
      Serial.println("Message succesfully sended!");
    }
  }
  delay(10);
}
