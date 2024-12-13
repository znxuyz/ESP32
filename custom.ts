//% color="#00BFFF" weight=100 icon="\uf1eb"
namespace ESP32 {
    /**
     * Connect to WiFi
     */
    //% block="connect to WiFi SSID %ssid password %password"
    export function connectWiFi(ssid: string, password: string): void {
        serial.writeLine(`WIFI-CONNECT:${ssid},${password}`);
    }

    /**
     * Send HTTP GET request
     */
    //% block="send HTTP GET to URL %url"
    export function httpGet(url: string): void {
        serial.writeLine(`HTTP-GET:${url}`);
    }

    /**
     * Control GPIO pin
     */
    //% block="set GPIO pin %pin to %state"
    export function setGPIO(pin: number, state: boolean): void {
        serial.writeLine(`GPIO:${pin},${state ? "HIGH" : "LOW"}`);
    }
}
