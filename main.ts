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
     * 重新啟動 ESP32 模組
     */
    //% block="重新啟動 ESP32 模組"
    export function restartESP32(): void {
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
        return response.includes("+CWJAP:");
    }

    /**
     * 手動編碼特殊字符 (類似 encodeURIComponent)
     */
    function customEncodeURIComponent(str: string): string {
        return str.replace(/ /g, '%20')
                  .replace(/!/g, '%21')
                  .replace(/"/g, '%22')
                  .replace(/#/g, '%23')
                  .replace(/\$/g, '%24')
                  .replace(/%/g, '%25')
                  .replace(/&/g, '%26')
                  .replace(/'/g, '%27')
                  .replace(/\(/g, '%28')
                  .replace(/\)/g, '%29')
                  .replace(/\+/g, '%2B')
                  .replace(/,/g, '%2C')
                  .replace(/\//g, '%2F')
                  .replace(/:/g, '%3A')
                  .replace(/;/g, '%3B')
                  .replace(/=/g, '%3D')
                  .replace(/\?/g, '%3F')
                  .replace(/@/g, '%40')
                  .replace(/\[/g, '%5B')
                  .replace(/]/g, '%5D');
    }

    /**
     * 發送數據到指定 Webhook 網址
     * @param webhookUrl 網址
     * @param sensorData 數據
     */
    //% block="發送數據到 %webhookUrl，數據 %sensorData"
    export function sendDataToWebhook(webhookUrl: string, sensorData: string): void {
        let encodedData = "sensorData=" + customEncodeURIComponent(sensorData);
        serial.writeString(`AT+HTTPCLIENT=2,1,"${webhookUrl}",,,2,"${encodedData}"\r\n`);
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }

    /**
     * 發送 HTTP 請求
     * @param method 請求方法 (GET 或 POST)
     * @param url 網址
     * @param data (可選) POST 數據
     */
    //% block="發送 HTTP %method 請求到 %url，數據 %data"
    export function sendHttpRequest(method: "GET" | "POST", url: string, data?: string): string {
        let command = method === "GET"
            ? `AT+HTTPCLIENT=2,0,"${url}",,,1\r\n`
            : `AT+HTTPCLIENT=2,1,"${url}",,,2,"${data}"\r\n`;

        serial.writeString(command);
        basic.pause(3000);
        return serial.readString();
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
     * 發送 AT 指令 %command
     */
    //% block="發送 AT 指令 %command"
    export function sendATCommand(command: string): string {
        serial.writeString(command + "\r\n");
        basic.pause(1000);
        return serial.readString();
    }
}
