// CLIMADATA - ESP8266+DHT22+MQ135+ArduinoIDE+Thingspeak IoT Air Quality monitor
// -----------------------------------------------------------------------------
// https://github.com/crispSV/climadata
// 
//
//
// LIVE Data for the Climate Challenge Hackathon https://www.goethe.de/prj/one/en/gea/for/clc.html?wt_sc=theclimatechallenge
// ThingSpeak DATA  https://thingspeak.com/channels/1199738



#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>
#include <MQ135.h>

#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321



//ThingSpeak API parameters
const char* host = "api.thingspeak.com"; // ThingSpeak api domain  
String ApiKey = "myapikey";            // ThingSpeak API Key
String path = "/update?key=" + ApiKey ; //Channel path

//WIFI

const char* ssid = "myssid";        // WIFI SSID
const char* pass = "ssidpasswd";    // WIFI PASSWORD

char temperatureString[6];
char humidityString[6];


// DHT Sensor pin
uint8_t DHTPin = 5;  // Pin D1 on LOLIN board

// Initialize DHT sensor.
DHT dht(DHTPin, DHTTYPE);                

float Temperature;
float Humidity;



void setup(void){
  Serial.begin(115200);
  Serial.println("");
  
  WiFi.begin(ssid, pass);
 
 // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Connected to wifi ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

 pinMode(DHTPin, INPUT);

  dht.begin();
               

}

 
void loop() {

MQ135 gasSensor = MQ135(A0);  // MQ 135 airquality sensor on pin Α0
float temperature = dht.readTemperature(); // Gets the values of the temperature
float humidity = dht.readHumidity(); // Gets the values of the humidity 
float air_quality = gasSensor.getPPM();  //Gets the value of Air Quality

if (isnan(humidity) || isnan(temperature)) 
                 {
                     Serial.println("Failed to read from DHT sensor!");
                      return;
                 }
                 
 dtostrf(temperature, 2, 0, temperatureString);
 dtostrf(humidity, 2, 0, humidityString);
 

// send DHT and MQ135 data to the serial console
 Serial.print("Temp ");
 Serial.println(temperatureString);
 Serial.print("Hum ");
 Serial.println(humidityString);
 Serial.print("AirQ ");
 Serial.println(air_quality);
 
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

// Send DATA to ThingSpeak Channel
  client.print(String("GET ") + path + "&field1=" + temperatureString + "&field2=" + humidityString + "&field3=" + air_quality +" HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: keep-alive\r\n\r\n");
               

  delay(60000);

}
