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
     * 掃描可用的 WiFi 網絡
     */
    //% block="掃描可用的 WiFi 網絡"
    export function scanWiFiNetworks(): void {
        serial.writeString("AT+CWLAP\r\n");
        basic.pause(3000);
        let response = serial.readString();
        basic.showString("Scan Done");
        serial.writeLine(response);
    }

    /**
     * 連接到 WiFi 名稱 %ssid，密碼 %password
     */
    //% block="連接到 WiFi 名稱 %ssid，密碼 %password"
    export function connectWiFi(ssid: string, password: string): void {
        serial.writeString(`AT+CWJAP="${ssid}","${password}"\r\n`);
        basic.pause(5000);
        let response = serial.readString();
        wifiConnected = response.includes("OK");
        if (wifiConnected) {
            basic.showString("Connected");
        } else {
            basic.showString("Fail");
        }
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
}
