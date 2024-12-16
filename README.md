# ESP32 WiFi Blocks

This extension allows you to control ESP32 WiFi functionalities, including connecting to WiFi, sending HTTP requests, and checking connection status.

## Features
1. Initialize ESP32 with a custom baud rate.
2. Connect to a WiFi network.
3. Check if the WiFi is connected.
4. Send HTTP GET and POST requests.
5. Transmit sensor data to a server (compatible with MIT App Inventor or Google Sheets).

## Example
```blocks
ESP32.initializeESP32(115200);
if (ESP32.connectWiFi("YourSSID", "YourPassword")) {
    ESP32.sendHttpGet("http://example.com");
}
