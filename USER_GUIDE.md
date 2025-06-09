# 使用者指南

本指南提供如何在本機安裝、執行並使用 **Project Neuro-Canvas** 的步驟說明。

## 1. 安裝需求

- **Node.js** v18 以上
- **Python** 3.9 以上
- **Docker 與 Docker Compose**（可選）
- **Git**

## 2. 取得程式碼

```bash
git clone https://github.com/your-username/neuro-canvas.git
cd neuro-canvas
```

## 3. 設定後端

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows 請執行 venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
cp .env.example .env
# 編輯 .env，填入資料庫連線資訊
```

啟動 API 伺服器：

```bash
uvicorn app.main:app --reload
```

伺服器預設在 <http://localhost:8000> 運行。

## 4. 設定前端

```bash
cd ../frontend
npm install
cp .env.example .env.local
```

啟動開發伺服器：

```bash
npm run dev
```

開啟瀏覽器並造訪 <http://localhost:3000> 即可看到應用程式。

## 5. 使用 Docker（可選）

若偏好一鍵啟動，可在專案根目錄執行：

```bash
docker-compose up --build
```

## 6. 介面操作流程

1. 在文字框輸入或貼上想分析的內容。
2. 按下 **Process** 按鈕後，畫面會顯示標註後的詞彙。
3. 若輸入畫布名稱並點擊 **Save Canvas**，系統會將畫布儲存。

## 7. 主要 API 端點

- `POST /api/v1/process`：傳入 `{ "text": "..." }`，取得 NLP 標註結果。
- `POST /api/v1/canvases`：儲存畫布狀態並回傳 `id`。
- `GET /api/v1/canvases/{id}`：取得指定畫布。

## 8. 常見問題

- **啟動後端出現 spaCy 模型錯誤**：請確認 `en_core_web_sm` 模型已安裝。
- **前端無法連線到 API**：檢查 `vite.config.js` 的代理設定及後端伺服器是否運行中。

更多細節與貢獻方式請參閱 `README.md`。
