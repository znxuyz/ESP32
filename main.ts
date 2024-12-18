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
    //% ssid.shadow="text" password.shadow="text"
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

    /**
     * Display text %message on the screen
     */
    //% block="Display text %message"
    //% message.shadow="text"
    export function displayText(message: string): void {
        basic.showString(message);
    }

    /**
     * Pause for %milliseconds ms
     */
    //% block="Pause for %milliseconds ms"
    //% milliseconds.shadow="timePicker"
    export function pauseMilliseconds(milliseconds: number): void {
        basic.pause(milliseconds);
    }
}
