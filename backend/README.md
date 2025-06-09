# Backend 使用說明

本資料夾包含以 **FastAPI** 撰寫的後端程式碼，提供 NLP 文字處理與畫布存取等 API 端點。

## 安裝

1. 建立並啟動虛擬環境：
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows 使用 venv\Scripts\activate
   ```
2. 安裝依賴：
   ```bash
   pip install -r requirements.txt
   ```
3. 安裝 spaCy 模型：
   ```bash
   python -m spacy download en_core_web_sm
   ```
4. 複製範例環境變數：
   ```bash
   cp .env.example .env
   ```
   依需求修改 `.env` 內容。

## 執行伺服器

啟動 FastAPI 開發伺服器：
```bash
uvicorn app.main:app --reload
```
伺服器會在 <http://localhost:8000> 運行。

## 執行測試

本專案採用 `pytest`。在虛擬環境中執行：
```bash
pytest -q
```

若缺少套件或模型，請依照上方步驟安裝。
