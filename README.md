# ESP32WiFi 擴充積木

此擴充模組提供以下功能：
- 初始化 ESP32
- 連接 WiFi
- 傳送資料到 Google Sheets
- 傳送資料到 MIT App
- 啟動 Web 伺服器

## 使用方法

1. 將 ESP32 與 micro:bit 使用 EZ Kit+ 連接。
2. 在 MakeCode 中新增此擴充模組。
3. 使用積木控制 ESP32，實現功能。

## 範例程式
### 連接 WiFi 並傳送資料
```blocks
ESP32WiFi.init()
ESP32WiFi.connectWiFi("你的WiFi名稱", "你的WiFi密碼")
if (ESP32WiFi.checkWiFi()) {
    ESP32WiFi.sendToGoogleSheets("25.5")
    ESP32WiFi.sendToMITApp("25.5")
}
