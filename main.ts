namespace ESP32 {

    let wifiConnected = false;

    /**
     * Initialize the ESP32 module with a specific baud rate
     * @param baudrate Baud rate for the ESP32 module (default 115200)
     */
    //% block="初始化 ESP32，波特率 %baudrate"
    export function initializeESP32(baudrate: number = 115200): void {
        serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);
        serial.setRxBufferSize(128);
        basic.pause(100);
        serial.writeString("AT\r\n");
    }

    /**
     * Connect to a WiFi network
     * @param ssid WiFi network name
     * @param password WiFi network password
     */
    //% block="連接到 WiFi 名稱 %ssid，密碼 %password"
    export function connectWiFi(ssid: string, password: string): void {
        serial.writeString("AT+CWJAP=\"" + ssid + "\",\"" + password + "\"\r\n");
        basic.pause(5000);
        let response = serial.readString();
        if (response.includes("OK")) {
            wifiConnected = true;
            basic.showIcon(IconNames.Yes);
        } else {
            wifiConnected = false;
            basic.showIcon(IconNames.No);
        }
    }

    /**
     * Check if WiFi is connected
     * @return true if connected, false otherwise
     */
    //% block="檢查 WiFi 是否已連接"
    export function checkWiFi(): boolean {
        return wifiConnected;
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
}
