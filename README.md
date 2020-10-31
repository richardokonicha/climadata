# ClimaDataBox iOT sensor
ClimaDataBox is an Air Quality hardware build for Climate Challenge Hackathon of The Goethe Institut.
A DHT22 sensor connected on ESP-8266 board feeds temperature and humidity readings, as an MQ-135 gas sensor reads air quality status.
ESP-8266 uploads data to ThingSpeak IOT service. A web platform visualize data for analysis and information. This is an ongoing project.

## Author
* **Chris Papathanasiou** <developer@drmac.gr>


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


## Acknowledgments

* This code is initialy written for ClimateChallenge Hackathon https://theclimatechallenge.devpost.com/ entry


## To Do

- Use LORAWAN instead of WiFi so every node can be remotely managed and upgraded.
- Add PM2.5 sensor to measure dust concentrations of 10 microns or smaller in diameter.
- Use a solar panel and a LiON battery to make system autonomous. Enable ESP8266 deep sleep mode to conserve energy.
- Use GPS module (UBLOX-7M) to know the exact location of the sensor.

### Links
https://www.goethe.de/prj/one/en/gea/for/clc.html?wt_sc=theclimatechallenge

https://thingspeak.com/channels/1199738

https://clima.newestpaper.com
