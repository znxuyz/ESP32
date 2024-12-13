//% color="#00BFFF" weight=100 icon="\uf1eb"
namespace ESP32 {
    /**
     * Initialize serial communication
     */
    //% block="初始化 UART 通信 TX %tx RX %rx"
    //% tx.defl=SerialPin.P0 rx.defl=SerialPin.P1
    export function initUART(tx: SerialPin, rx: SerialPin): void {
        serial.redirect(tx, rx, BaudRate.BaudRate115200);
        basic.pause(100);
        serial.writeLine("ESP32 Ready");
    }

    /**
     * Connect to WiFi
     */
    //% block="連接 WiFi 名稱 %ssid 密碼 %password"
    export function connectWiFi(ssid: string, password: string): void {
        serial.writeLine(`WIFI-CONNECT:${ssid},${password}`);
    }

    /**
     * Check WiFi connection status
     */
    //% block="檢查 WiFi 是否已連接"
    export function checkWiFi(): boolean {
        serial.writeLine("WIFI-STATUS");
        let response = serial.readUntil(serial.delimiters(Delimiters.NewLine));
        return response.includes("CONNECTED");
    }

    /**
     * Send HTTP GET request
     */
    //% block="傳送 HTTP GET 到網址 %url"
    export function httpGet(url: string): void {
        serial.writeLine(`HTTP-GET:${url}`);
    }

    /**
     * Send HTTP POST request with data
     */
    //% block="傳送 HTTP POST 到網址 %url 並傳送資料 %data"
    export function httpPost(url: string, data: string): void {
        serial.writeLine(`HTTP-POST:${url},${data}`);
    }

    /**
     * Set GPIO pin state
     */
    //% block="設置 GPIO 腳位 %pin 狀態為 %state"
    //% pin.min=0 pin.max=39
    export function setGPIO(pin: number, state: boolean): void {
        serial.writeLine(`GPIO:${pin},${state ? "HIGH" : "LOW"}`);
    }

    /**
     * Receive data
     */
    //% block="接收資料"
    export function receiveData(): string {
        let response = serial.readString();
        return response;
    }
}
