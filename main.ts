namespace ESP32 {

    let wifiConnected = false;

    /**
     * Initialize ESP32 with baud rate %baudrate
     */
    //% block="Initialize ESP32 with baud rate %baudrate"
    export function initializeESP32(baudrate: number = 115200): void {
        serial.redirect(SerialPin.P0, SerialPin.P1, baudrate);
        basic.pause(100);
        serial.writeString("AT\r\n");
    }

    /**
     * Connect to Wi-Fi SSID %ssid with password %password
     */
    //% block="Connect to Wi-Fi SSID %ssid with password %password"
    export function connectWiFi(ssid: string, password: string): boolean {
        serial.writeString(`AT+CWJAP="${ssid}","${password}"\r\n`);
        basic.pause(5000);
        let response = serial.readString();
        wifiConnected = response.includes("OK");
        return wifiConnected;
    }

    /**
     * Check if Wi-Fi is connected
     */
    //% block="Is Wi-Fi connected?"
    export function isWiFiConnected(): boolean {
        serial.writeString("AT+CWJAP?\r\n");
        basic.pause(1000);
        let response = serial.readString();
        wifiConnected = response.includes("+CWJAP:");
        return wifiConnected;
    }
}
