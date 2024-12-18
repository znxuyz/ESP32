namespace ESP32 {
    // Initialize ESP32
    export function initESP32() {
        serial.redirect(
            SerialPin.P0,  // TX
            SerialPin.P1,  // RX
            BaudRate.BaudRate115200
        );
        basic.pause(1000);
        serial.writeLine("AT");
        basic.pause(1000);
    }

    // Set ESP32 pins
    export function setPins(tx: SerialPin, rx: SerialPin, baudRate: BaudRate) {
        serial.redirect(tx, rx, baudRate);
        basic.pause(1000);
    }

    // Enable WiFi on ESP32
    export function enableWiFi(ssid: string, password: string) {
        serial.writeLine(`AT+CWJAP="${ssid}","${password}"`);
        basic.pause(5000);
    }

    // Verify WiFi connection
    export function isWiFiConnected(): boolean {
        serial.writeLine("AT+CWJAP?");
        basic.pause(2000);
        const response = serial.readString();
        return response.includes("OK");
    }

    // Send data to Google Sheets
    export function sendToGoogleSheets(url: string, field: string, value: string) {
        const fullUrl = `${url}?${field}=${value}`;
        serial.writeLine(`AT+HTTPCLIENT=3,1,"${fullUrl}","",0,0`);
        basic.pause(2000);
    }

    // Send data to a webpage
    export function sendToWebpage(url: string, data: string) {
        const fullUrl = `${url}?data=${data}`;
        serial.writeLine(`AT+HTTPCLIENT=3,1,"${fullUrl}","",0,0`);
        basic.pause(2000);
    }

    // Send data to MIT App Inventor
    export function sendToApp(url: string, data: string) {
        const fullUrl = `${url}?data=${data}`;
        serial.writeLine(`AT+HTTPCLIENT=3,1,"${fullUrl}","",0,0`);
        basic.pause(2000);
    }
}
