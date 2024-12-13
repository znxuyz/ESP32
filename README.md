# ESP32 WiFi Blocks

This extension provides blocks to initialize and control ESP32 WiFi functionalities.

## Features:
- Initialize ESP32 module with a specific baud rate.
- Connect to a WiFi network.
- Check if WiFi is connected.
- Send AT commands and get responses.

## Blocks:

1. **Initialize ESP32**:
   Initialize the ESP32 module with the default baud rate (115200).

   ```blocks
   ESP32.initializeESP32(115200);
