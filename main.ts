#include <WiFi.h>
#include <HTTPClient.h>
#include <WebServer.h>

// WiFi 設定
const char* ssid = "你的WiFi名稱";
const char* password = "你的WiFi密碼";

// 定義引腳
const int ledPin = 2; // 使用內建LED燈引腳

// WebServer 初始化
WebServer server(80);

// 初始化函數
void setupPins() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  Serial.println("引腳設定完成");
}

// WiFi 連線函數
void connectWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("正在連接 WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi 已連接");
  Serial.print("IP 位址: ");
  Serial.println(WiFi.localIP());
}

// 確認 WiFi 狀態
void checkWiFiStatus() {
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi 連線正常");
  } else {
    Serial.println("WiFi 連線失敗，重新連線中...");
    connectWiFi();
  }
}

// Google Sheets 資料傳輸
void sendDataToGoogleSheet(String data) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
    http.begin(url);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    String payload = "data=" + data;
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
      Serial.println("成功傳送資料到Google試算表");
      Serial.println(http.getString());
    } else {
      Serial.println("傳送資料失敗");
    }
    http.end();
  } else {
    Serial.println("WiFi 尚未連接");
  }
}

// MIT App 資料傳輸
void sendDataToMITApp(String data) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://YOUR_APP_INVENTOR_WEB_COMPONENT_URL";
    http.begin(url);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    String payload = "value=" + data;
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
      Serial.println("成功傳送資料到MIT App");
    } else {
      Serial.println("傳送資料失敗");
    }
    http.end();
  } else {
    Serial.println("WiFi 尚未連接");
  }
}

// 簡單網頁伺服器
void handleRoot() {
  server.send(200, "text/plain", "Hello, this is ESP32!");
}

void setupServer() {
  server.on("/", handleRoot);
  server.begin();
  Serial.println("網頁伺服器已啟動");
}

// 初始化
void setup() {
  Serial.begin(115200); // 初始化序列埠
  setupPins();          // 初始化引腳
  connectWiFi();        // 啟動 WiFi
  setupServer();        // 啟動 WebServer
}

// 主程式邏輯
void loop() {
  server.handleClient(); // 處理 WebServer 請求

  // 模擬資料傳輸，每隔10秒傳送一次
  static unsigned long lastMillis = 0;
  if (millis() - lastMillis > 10000) {
    lastMillis = millis();
    String sampleData = "25.5"; // 假設溫度資料
    sendDataToGoogleSheet(sampleData);
    sendDataToMITApp(sampleData);
  }

  checkWiFiStatus(); // 檢查 WiFi 狀態
}
