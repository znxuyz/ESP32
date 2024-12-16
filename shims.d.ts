//% color=#0fbc11 icon="\uf1eb" block="ESP32WiFi"
declare namespace ESP32WiFi {
    //% block="初始化 ESP32"
    function init(): void;

    //% block="連接 WiFi SSID %ssid 密碼 %password"
    function connectWiFi(ssid: string, password: string): void;

    //% block="確認 WiFi 狀態"
    function checkWiFi(): boolean;

    //% block="傳送資料到 Google Sheets 資料 %data"
    function sendToGoogleSheets(data: string): void;
}
