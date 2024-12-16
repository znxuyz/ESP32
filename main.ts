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
     * 檢查 WiFi 是否已連接
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
}
