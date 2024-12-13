//% color="#00BFFF" weight=100 icon="\uf1eb"
namespace ESP32 {
    /**
     * Connect to WiFi
     */
    //% block="connect to WiFi SSID %ssid password %password"
    export function connectWiFi(ssid: string, password: string): void {
        serial.writeLine(`WIFI-CONNECT:${ssid},${password}`);
    }
}
