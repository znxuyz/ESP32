// micro:bit MakeCode Extension for ESP32 WiFi and Initialization

namespace ESP32 {

    let wifiConnected = false;

    /**
     * Initialize the ESP32 module with a specific baud rate
     * @param baudrate Baud rate for the ESP32 module
     */
    //% block="初始化 ESP32，波特率 %baudrate"
    //% baudrate.defl=115200
    //% baudrate.shadow="dropdown" inlineInputMode="inline"
    export function initializeESP32(baudrate: number): void {
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
     * @return true if connected, false otherwise
     */
    //% block="連接到 WiFi 名稱 %ssid，密碼 %password"
    export function connectWiFi(ssid: string, password: string): boolean {
        serial.writeString("AT+CWJAP=\"" + ssid + "\",\"" + password + "\"\r\n");
        basic.pause(5000);
        let response = serial.readString();
        if (response.includes("OK")) {
            wifiConnected = true;
            basic.showIcon(IconNames.Yes);
            return true;
        } else {
            wifiConnected = false;
            basic.showIcon(IconNames.No);
            return false;
        }
    }

    /**
     * Check if WiFi is connected
     * @return true if connected, false otherwise
     */
    //% block="檢查 WiFi 是否已連接"
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

namespace Servo {

    /**
     * Set the angle of a servo motor
     * @param pin Pin to which the servo motor is connected
     * @param angle Angle to set the servo motor (0-180 degrees)
     */
    //% block="伺服馬達 (腳位 %pin) 角度設為 %angle 度"
    //% angle.min=0 angle.max=180
    export function setAngle(pin: AnalogPin, angle: number): void {
        pins.servoWritePin(pin, angle);
    }

    /**
     * Configure the maximum and minimum angles of a servo motor
     * @param pin Pin to which the servo motor is connected
     * @param maxAngle Maximum angle (default 180 degrees)
     * @param minAngle Minimum angle (default 0 degrees)
     */
    //% block="伺服馬達 (腳位 %pin) 設定角度最大 %maxAngle 度 最小 %minAngle 度"
    //% maxAngle.min=0 maxAngle.max=180
    //% minAngle.min=0 minAngle.max=180
    export function configureAngleLimits(pin: AnalogPin, maxAngle: number, minAngle: number): void {
        // This is a placeholder implementation. Additional logic may be added to enforce angle limits.
        pins.servoSetPulse(pin, minAngle);
        pins.servoSetPulse(pin, maxAngle);
    }

    /**
     * Change servo motor angle based on analog signal
     * @param pin Pin to which the servo motor is connected
     * @param analogSignal Analog signal value (0-1023)
     * @param maxSignal Maximum analog signal value
     * @param minSignal Minimum analog signal value
     * @param maxAngle Maximum angle (default 180 degrees)
     * @param minAngle Minimum angle (default 0 degrees)
     */
    //% block="伺服馬達 (腳位 %pin) 根據類比訊號數值 (最大 %maxSignal 到最小 %minSignal) 改變角度，角度最大 %maxAngle 度 最小 %minAngle 度"
    //% maxSignal.defl=1023 minSignal.defl=0
    //% maxAngle.defl=180 minAngle.defl=0
    export function changeAngleByAnalogSignal(pin: AnalogPin, analogSignal: number, maxSignal: number, minSignal: number, maxAngle: number, minAngle: number): void {
        let angle = Math.map(analogSignal, minSignal, maxSignal, minAngle, maxAngle);
        pins.servoWritePin(pin, angle);
    }

    /**
     * Rotate a servo motor to a specific angle within a certain time
     * @param pin Pin to which the servo motor is connected
     * @param duration Time in seconds to reach the angle
     * @param angle Target angle (0-180 degrees)
     */
    //% block="伺服馬達 (腳位 %pin) 在 %duration 秒內旋轉至 %angle 度"
    //% duration.defl=1
    //% angle.min=0 angle.max=180
    export function rotateToAngleInTime(pin: AnalogPin, duration: number, angle: number): void {
        let currentAngle = pins.analogReadPin(pin);
        let step = (angle - currentAngle) / (duration * 50);
        for (let i = 0; i < duration * 50; i++) {
            currentAngle += step;
            pins.servoWritePin(pin, currentAngle);
            basic.pause(20);
        }
    }
}
