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

    /**
     * Disconnect from Wi-Fi
     */
    //% block="Disconnect Wi-Fi"
    export function disconnectWiFi(): void {
        serial.writeString("AT+CWQAP\r\n");
        basic.pause(1000);
        wifiConnected = false;
    }

    /**
     * Scan available Wi-Fi networks
     */
    //% block="Scan available Wi-Fi networks"
    export function scanWiFiNetworks(): void {
        serial.writeString("AT+CWLAP\r\n");
        basic.pause(3000);
        let response = serial.readString();
        serial.writeLine(response);
    }

    /**
     * Get ESP32 IP address
     */
    //% block="Get ESP32 IP address"
    export function getIPAddress(): string {
        serial.writeString("AT+CIFSR\r\n");
        basic.pause(1000);
        return serial.readString();
    }

    /**
     * Send HTTP GET request to URL %url
     */
    //% block="Send HTTP GET to URL %url"
    export function sendHttpGet(url: string): string {
        serial.writeString(`AT+HTTPCLIENT=2,0,"${url}",,,1\r\n`);
        basic.pause(3000);
        return serial.readString();
    }

    /**
     * Send HTTP POST request to URL %url with data %data
     */
    //% block="Send HTTP POST to URL %url with data %data"
    export function sendHttpPost(url: string, data: string): string {
        serial.writeString(`AT+HTTPCLIENT=2,1,"${url}",,,2,"${data}"\r\n`);
        basic.pause(3000);
        return serial.readString();
    }
}
