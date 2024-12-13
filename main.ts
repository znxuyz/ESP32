// micro:bit MakeCode Extension for ESP32 WiFi and Initialization

namespace ESP32 {

    let wifiConnected = false;

    /**
     * Initialize the ESP32 module with a specific baud rate
     * @param baudrate Baud rate for the ESP32 module (default 115200)
     */
    //% block="初始化 ESP32，波特率 %baudrate"
    export function initializeESP32(baudrate: number = 115200): void {
        serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);
        serial.setRxBufferSize(128);
        basic.pause(100);
        serial.writeString("AT\r\n");
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
    //% block="檢查 WiFi 是否已連接"
    export function checkWiFi(): boolean {
        return wifiConnected;
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
     * Transmit data from micro:bit sensors to a server
     * @param url The server URL
     * @param sensorData The data to send (e.g., sensor readings)
     */
    //% block="傳輸數據到伺服器 %url，數據 %sensorData"
    export function transmitSensorData(url: string, sensorData: string): void {
        let data = "sensorData=" + sensorData;
        serial.writeString("AT+HTTPCLIENT=2,1,\"" + url + "\",,,2,\"" + data + "\"\r\n");
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
}

