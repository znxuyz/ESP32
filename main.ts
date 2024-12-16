namespace ESP32WiFi {
    /**
     * 初始化 ESP32
     */
    //% block="初始化 ESP32"
    export function init(): void {
        serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);
        basic.pause(1000);
        serial.writeLine("ESP32 初始化完成");
    }

    /**
     * 連接 WiFi
     */
    //% block="連接 WiFi SSID %ssid 密碼 %password"
    export function connectWiFi(ssid: string, password: string): void {
        serial.writeLine(`WIFI|CONNECT|SSID=${ssid}|PASSWORD=${password}`);
        basic.pause(3000);
        serial.writeLine("WiFi 已連接");
    }

    /**
     * 確認 WiFi 狀態
     */
    //% block="確認 WiFi 狀態"
    export function checkWiFi(): boolean {
        serial.writeLine("WIFI|STATUS");
        basic.pause(100);
        let response = serial.readLine();
        return response.includes("CONNECTED");
    }

    /**
     * 傳送資料到 Google Sheets
     */
    //% block="傳送資料到 Google Sheets 資料 %data"
    export function sendToGoogleSheets(data: string): void {
        serial.writeLine(`GOOGLE|DATA=${data}`);
        basic.pause(100);
        serial.writeLine("資料已傳送到 Google Sheets");
    }

    /**
     * 傳送資料到 MIT App
     */
    //% block="傳送資料到 MIT App 資料 %data"
    export function sendToMITApp(data: string): void {
        serial.writeLine(`MIT|DATA=${data}`);
        basic.pause(100);
        serial.writeLine("資料已傳送到 MIT App");
    }

    /**
     * 啟動 Web 伺服器
     */
    //% block="啟動 Web 伺服器"
    export function startWebServer(): void {
        serial.writeLine("SERVER|START");
        basic.pause(100);
        serial.writeLine("Web 伺服器已啟動");
    }
}
