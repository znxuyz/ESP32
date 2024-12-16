namespace ESP32WiFi {
    /**
     * 初始化 ESP32
     */
    //% block="初始化 ESP32"
    export function init(): void {
        serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);
        serial.writeLine("ESP32 初始化完成");
    }

    /**
     * 連接 WiFi
     */
    //% block="連接 WiFi SSID %ssid 密碼 %password"
    export function connectWiFi(ssid: string, password: string): void {
        serial.writeLine(`WIFI|CONNECT|SSID=${ssid}|PASSWORD=${password}`);
    }

    /**
     * 確認 WiFi 狀態
     */
    //% block="確認 WiFi 狀態"
    export function checkWiFi(): boolean {
        serial.writeLine("WIFI|STATUS");
        let response = serial.readLine();
        return response.includes("CONNECTED");
    }

    /**
     * 傳送資料到 Google Sheets
     */
    //% block="傳送資料到 Google Sheets 資料 %data"
    export function sendToGoogleSheets(data: string): void {
        serial.writeLine(`GOOGLE|DATA=${data}`);
    }
}
