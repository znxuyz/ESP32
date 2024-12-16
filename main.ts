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
     * 發送 HTTP 請求
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
     * 發送數據到指定 Webhook 網址
     */
    //% block="發送數據到 %webhookUrl，數據 %sensorData"
    export function sendDataToWebhook(webhookUrl: string, sensorData: string): void {
        let data = "sensorData=" + encodeURIComponent(sensorData);
        serial.writeString(`AT+HTTPCLIENT=2,1,"${webhookUrl}",,,2,"${data}"\r\n`);
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }
}
