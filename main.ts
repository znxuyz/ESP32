// micro:bit MakeCode Extension for ESP32 WiFi and Initialization

namespace ESP32 {

    let wifiConnected = false;

    /**
     * Initialize the ESP32 module with a specific baud rate
     * @param baudrate Baud rate for the ESP32 module (default 115200)
     */
    //% block="初始化 ESP32，波特率 %baudrate"
    export function initializeESP32(baudrate: number = 115200): void {
        serial.redirect(SerialPin.P0, SerialPin.P1, baudrate);
        serial.setRxBufferSize(128);
        basic.pause(100);
        serial.writeString("AT\r\n");
    }

    /**
     * ESP32 startup routine
     */
    //% block="啟動 ESP32 模組"
    export function startupESP32(): void {
        serial.writeString("AT+RST\r\n");
        basic.pause(2000);
    }

    /**
     * Connect to a WiFi network
     * @param ssid WiFi network name
     * @param password WiFi network password
     */
    //% block="連接到 WiFi 名稱 %ssid，密碼 %password"
    export function connectWiFi(ssid: string, password: string): void {
        serial.writeString("AT+CWJAP=\"" + ssid + "\",\"" + password + "\"\r\n");
        basic.pause(5000);
        let response = serial.readString();
        if (response.includes("OK")) {
            wifiConnected = true;
            basic.showIcon(IconNames.Yes);
        } else {
            wifiConnected = false;
            basic.showIcon(IconNames.No);
        }
    }

    /**
     * Check if WiFi is connected
     * @return true if connected, false otherwise
     */
    //% block="檢查 WiFi 是否已連接?"
    export function checkWiFi(): boolean {
        serial.writeString("AT+CWJAP?\r\n");
        basic.pause(1000);
        let response = serial.readString();
        if (response.includes("+CWJAP:")) {
            wifiConnected = true;
            return true;
        } else {
            wifiConnected = false;
            return false;
        }
    }

    /**
     * Send an HTTP GET request to a specific URL
     * @param url The URL to send the GET request to
     */
    //% block="發送 HTTP GET 到網址 %url"
    export function sendHttpGet(url: string): void {
        serial.writeString("AT+HTTPCLIENT=2,0,\"" + url + "\",,,1\r\n");
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }

    /**
     * Send an HTTP POST request with data
     * @param url The URL to send the POST request to
     * @param data The data to include in the POST request
     */
    //% block="發送 HTTP POST 到網址 %url，數據 %data"
    export function sendHttpPost(url: string, data: string): void {
        serial.writeString("AT+HTTPCLIENT=2,1,\"" + url + "\",,,2,\"" + data + "\"\r\n");
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }

    /**
     * Transmit data from micro:bit sensors to a server (MIT App Inventor compatible)
     * @param url The server URL
     * @param sensorData The data to send (e.g., sensor readings)
     */
    //% block="發送數據到 MIT Inventor 網址 %url，數據 %sensorData"
    export function sendDataToMIT(url: string, sensorData: string): void {
        let data = "value=" + sensorData;
        serial.writeString("AT+HTTPCLIENT=2,1,\"" + url + "\",,,2,\"" + data + "\"\r\n");
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }

    /**
     * Transmit data to Google Sheets using a webhook
     * @param webhookUrl The URL of the Google Sheets webhook
     * @param sensorData The data to send to the Google Sheets
     */
    //% block="發送數據到 Google 試算表 Webhook %webhookUrl，數據 %sensorData"
    export function sendDataToGoogleSheets(webhookUrl: string, sensorData: string): void {
        let data = "sensorData=" + encodeURIComponent(sensorData);
        serial.writeString("AT+HTTPCLIENT=2,1,\"" + webhookUrl + "\",,,2,\"" + data + "\"\r\n");
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }

    /**
     * Control GPIO pin state
     * @param pin GPIO pin number
     * @param state GPIO state (true for HIGH, false for LOW)
     */
    //% block="設置 GPIO 腳位 %pin 為 %state"
    export function setGPIO(pin: number, state: boolean): void {
        serial.writeString("AT+GPIO=" + pin + "," + (state ? "1" : "0") + "\r\n");
        basic.pause(100);
    }

    /**
     * Start ESP32 in Access Point (AP) mode
     * @param ssid Access Point SSID
     * @param password Access Point Password
     */
    //% block="啟用 AP 模式，名稱 %ssid，密碼 %password"
    export function startAccessPoint(ssid: string, password: string): void {
        serial.writeString("AT+CWSAP=\"" + ssid + "\",\"" + password + "\",5,3\r\n");
        basic.pause(1000);
    }

    /**
     * Get the IP address of the ESP32
     * @return The IP address as a string
     */
    //% block="獲取 ESP32 的 IP 地址"
    export function getIPAddress(): string {
        serial.writeString("AT+CIFSR\r\n");
        basic.pause(1000);
        return serial.readString();
    }

    /**
     * Send an AT command to the ESP32 module and get the response
     * @param command AT command to send
     * @return Response from the ESP32 module
     */
    //% block="發送 AT 指令 %command"
    export function sendATCommand(command: string): string {
        serial.writeString(command + "\r\n");
        basic.pause(1000);
        return serial.readString();
    }

    /**
     * Restart the ESP32 module
     */
    //% block="重啟 ESP32 模組"
    export function restartESP32(): void {
        serial.writeString("AT+RST\r\n");
        basic.pause(2000);
    }

    /**
     * Disconnect from the current WiFi network
     */
    //% block="斷開 WiFi 連接"
    export function disconnectWiFi(): void {
        serial.writeString("AT+CWQAP\r\n");
        basic.pause(1000);
        wifiConnected = false;
    }

    /**
     * Scan for available WiFi networks
     */
    //% block="掃描可用的 WiFi 網絡"
    export function scanWiFiNetworks(): void {
        serial.writeString("AT+CWLAP\r\n");
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }
}
