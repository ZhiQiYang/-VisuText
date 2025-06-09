# Project Neuro-Canvas | 視覺化轉譯引擎

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-MVP-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)

**Project Neuro-Canvas** 是一個開源專案，旨在將複雜的長篇文字轉化為結構化、可互動的視覺知識圖譜。本專案受大腦平行處理幾何資訊的機制啟發，目標是根本性地提升知識工作者的閱讀、理解與洞察效率。

[**線上演示 (Live Demo)**](#) · [**開發日誌 (Dev Blog)**](#) · [**提出問題 (Report Issue)**](#)

---

## 核心理念 (Core Idea)

在資訊爆炸的時代，傳統的線性閱讀已難以應對日益增長的複雜資訊。本專案的核心理念是將單調的文字「轉譯」成大腦更擅長處理的「視覺結構」。透過自動提取關鍵特徵、聚合語意概念，並將其映射到一個可無限探索的畫布上，我們希望能幫助使用者更快地建立心智模型，發現隱藏的關聯，並激發新的創見。

![專案截圖](https://i.imgur.com/example-screenshot.png)
*(這是一個範例圖片位置，用於展示專案的UI介面)*

## 主要功能 (Features)

本專案的 MVP (最小可行性產品) 版本將包含以下核心功能：

* **📝 智慧文本處理:**
    * 輸入或貼上長篇文本。
    * 自動提取「焦點詞」與「焦點短語」，並根據詞性進行顏色高亮。
    * 允許使用者手動新增、刪除或修改關鍵詞。
* **🧩 語意聚合:**
    * 在畫布上將相關的關鍵詞拖曳組合成「概念塊」。
    * 為概念塊自訂標籤與圖標 (整合 FontAwesome)。
* **🕸️ 互動式網絡映射:**
    * 在無限畫布上自由組織你的概念塊。
    * 建立節點間的關係連線 (實線、虛線)，以表達邏輯關係。
    * 支援畫布的平移、縮放，以及基本的自動佈局。
* **💾 專案儲存與載入:**
    * 將你的視覺化分析儲存到雲端，隨時回來繼續工作。

## 技術棧 (Tech Stack)

| 類別          | 技術                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **前端** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) ![React Flow](https://img.shields.io/badge/-React%20Flow-1A192B)   |
| **後端** | ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/-FastAPI-009688?logo=fastapi&logoColor=white) |
| **NLP** | ![spaCy](https://img.shields.io/badge/-spaCy-09A3D5?logo=spacy&logoColor=white)                                                                     |
| **資料庫** | ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white)                                                     |
| **部署** | ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)                                                                 |

## 開始使用 (Getting Started)

請依照以下步驟在你的本機環境上設定並執行此專案。

### 環境要求 (Prerequisites)

* Node.js (v18.x 或更高版本)
* Python (v3.9 或更高版本)
* Docker & Docker Compose (建議，用於簡化環境設定)
* Git

### 安裝與設定 (Installation & Setup)

1.  **Clone 專案庫:**
    ```bash
    git clone [https://github.com/your-username/neuro-canvas.git](https://github.com/your-username/neuro-canvas.git)
    cd neuro-canvas
    ```

2.  **設定後端 (Backend):**
    ```bash
    cd backend
    # 建立並啟動 Python 虛擬環境
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    # 安裝依賴
    pip install -r requirements.txt
    # 安裝 spaCy 英文模型 (必要)
    python -m spacy download en_core_web_sm
    # 設定環境變數
    cp .env.example .env
    # 編輯 .env 檔案，填入你的資料庫連線資訊
    ```

3.  **設定前端 (Frontend):**
    ```bash
    cd ../frontend
    # 安裝依賴
    npm install
    # 設定環境變數 (如果前端需要)
    cp .env.example .env.local
    # Vite 已在開發模式下將 /api 代理到 localhost:8000
    ```

### 執行專案 (Running the Application)

1.  **啟動後端伺服器:**
    * 在 `backend` 目錄下執行:
    ```bash
    uvicorn app.main:app --reload
    ```
    * API 伺服器將會在 `http://localhost:8000` 啟動。

2.  **啟動前端開發伺服器:**
    * 在 `frontend` 目錄下執行:
    ```bash
    npm run dev
    ```
    * 應用程式將會在 `http://localhost:3000` 開啟。

### 使用 Docker (推薦)

如果你已安裝 Docker，可以直接在專案根目錄執行：
```bash
docker-compose up --build
```

### 貢獻指南 (Contributing)

歡迎對本專案提出想法或提交 PR。建議的開發流程如下：

1. 在 `backend` 目錄中啟動開發伺服器：
   ```bash
   uvicorn app.main:app --reload
   ```
2. 在 `frontend` 目錄中啟動前端：
   ```bash
   npm run dev
   ```
3. 進行程式修改後，請撰寫簡短的提交訊息並開立 Pull Request。

### 測試 (Running Tests)

在 `backend` 目錄下執行下列指令以跑單元測試：
```bash
pytest -q
```

