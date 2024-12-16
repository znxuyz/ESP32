namespace ESP32 {

    let wifiConnected = false;

    /**
     * 初始化 ESP32，波特率 %baudrate
     */
    //% block="初始化 ESP32，波特率 %baudrate"
    export function initializeESP32(baudrate: number = 115200): void {
        serial.redirect(SerialPin.P0, SerialPin.P1, baudrate);
        basic.pause(100);
        serial.writeString("AT\r\n");
    }

    /**
     * 啟動 ESP32 模組
     */
    //% block="啟動 ESP32 模組"
    export function startupESP32(): void {
        serial.writeString("AT+RST\r\n");
        basic.pause(2000);
    }

    /**
     * 連接到 WiFi 名稱 %ssid，密碼 %password
     */
    //% block="連接到 WiFi 名稱 %ssid，密碼 %password"
    export function connectWiFi(ssid: string, password: string): boolean {
        serial.writeString(`AT+CWJAP="${ssid}","${password}"\r\n`);
        basic.pause(5000);
        let response = serial.readString();
        wifiConnected = response.includes("OK");
        return wifiConnected;
    }

    /**
     * WiFi 是否已連接
     */
    //% block="WiFi 是否已連接"
    export function isWiFiConnected(): boolean {
        serial.writeString("AT+CWJAP?\r\n");
        basic.pause(1000);
        let response = serial.readString();
        wifiConnected = response.includes("+CWJAP:");
        return wifiConnected;
    }

    /**
     * 斷開 WiFi 連接
     */
    //% block="斷開 WiFi 連接"
    export function disconnectWiFi(): void {
        serial.writeString("AT+CWQAP\r\n");
        basic.pause(1000);
        wifiConnected = false;
    }

    /**
     * 掃描可用的 WiFi 網絡
     */
    //% block="掃描可用的 WiFi 網絡"
    export function scanWiFiNetworks(): void {
        serial.writeString("AT+CWLAP\r\n");
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }

    /**
     * 獲取 ESP32 的 IP 地址
     */
    //% block="獲取 ESP32 的 IP 地址"
    export function getIPAddress(): string {
        serial.writeString("AT+CIFSR\r\n");
        basic.pause(1000);
        return serial.readString();
    }

    /**
     * 發送 HTTP GET 到網址 %url
     */
    //% block="發送 HTTP GET 到網址 %url"
    export function sendHttpGet(url: string): string {
        serial.writeString(`AT+HTTPCLIENT=2,0,"${url}",,,1\r\n`);
        basic.pause(3000);
        return serial.readString();
    }

    /**
     * 發送 HTTP POST 到網址 %url，數據 %data
     */
    //% block="發送 HTTP POST 到網址 %url，數據 %data"
    export function sendHttpPost(url: string, data: string): string {
        serial.writeString(`AT+HTTPCLIENT=2,1,"${url}",,,2,"${data}"\r\n`);
        basic.pause(3000);
        return serial.readString();
    }

    /**
     * 發送數據到 MIT Inventor 網址 %url，數據 %sensorData
     */
    //% block="發送數據到 MIT Inventor 網址 %url，數據 %sensorData"
    export function sendDataToMIT(url: string, sensorData: string): void {
        let data = "value=" + sensorData;
        serial.writeString(`AT+HTTPCLIENT=2,1,"${url}",,,2,"${data}"\r\n`);
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }

    /**
     * 發送數據到 Google 試算表 Webhook %webhookUrl，數據 %sensorData
     */
    //% block="發送數據到 Google 試算表 Webhook %webhookUrl，數據 %sensorData"
    export function sendDataToGoogleSheets(webhookUrl: string, sensorData: string): void {
        let data = "sensorData=" + encodeURIComponent(sensorData);
        serial.writeString(`AT+HTTPCLIENT=2,1,"${webhookUrl}",,,2,"${data}"\r\n`);
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }

    /**
     * 發送 AT 指令 %command
     */
    //% block="發送 AT 指令 %command"
    export function sendATCommand(command: string): string {
        serial.writeString(command + "\r\n");
        basic.pause(1000);
        return serial.readString();
    }

    /**
     * 重啟 ESP32 模組
     */
    //% block="重啟 ESP32 模組"
    export function restartESP32(): void {
        serial.writeString("AT+RST\r\n");
        basic.pause(2000);
    }
}
