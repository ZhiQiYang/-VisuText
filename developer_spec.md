好的，這是一份專為開發團隊準備的技術規格與開發任務拆解文件。本文件基於《「視覺化轉譯引擎」開發專案計畫書》，旨在提供清晰、可執行的技術藍圖，讓開發者能據此內容展開專案開發。

---

### **Project Neuro-Canvas: MVP 開發技術規格書 (v1.0)**

#### **1. 總覽 (Overview)**

本文件旨在定義「視覺化轉譯引擎」最小可行性產品（MVP）的技術架構、功能模組與開發任務。開發目標是創建一個Web應用，讓使用者輸入文本，經由NLP後端處理後，在一個互動式畫布上生成可手動編輯的視覺化知識圖譜。

#### **2. 技術棧 (Tech Stack)**

為求快速開發與社群支援，建議採用以下技術棧：

* **前端 (Frontend):**
    * **框架:** **React** (或 Vue.js) - 成熟的生態系與元件化開發模式。
    * **狀態管理:** Redux Toolkit (或 MobX) - 管理複雜的應用程式狀態。
    * **視覺化/畫布庫:** **React Flow** - 專為節點式編輯器設計，高度客製化且功能強大，能大幅縮短開發時間。備選：D3.js (若需極致的自訂程度)。
    * **UI 元件庫:** Material-UI (MUI) 或 Ant Design - 提供高品質、立即可用的UI元件。
* **後端 (Backend):**
    * **語言/框架:** **Python** 搭配 **FastAPI** - 現代、高效能，且與Python的NLP生態系完美整合。備選：Django REST Framework。
    * **NLP 函式庫:**
        * **基礎處理:** **spaCy** - 用於分句、分詞、詞性標註 (POS Tagging)。
        * **關鍵詞提取:** **YAKE** (Yet Another Keyword Extractor) 或 `spaCy` 內建的 TextRank 實現。可針對特定領域微調模型。
* **資料庫 (Database):**
    * **主要資料庫:** **PostgreSQL** - 功能強大、可靠的關聯式資料庫，其 `JSONB` 欄位類型非常適合儲存畫布狀態。
    * **快取 (可選):** Redis - 用於快取NLP處理結果，提升重複請求的響應速度。
* **部署 (Deployment):**
    * **容器化:** **Docker** - 統一開發與生產環境。
    * **平台:** Vercel (前端)、Heroku / AWS / GCP (後端) 或其他雲端服務平台。

#### **3. 系統架構 (System Architecture)**

採用標準的Client-Server分離架構。

```
+----------------+      HTTP/S (REST API)      +--------------------+
|                | <--------------------------> |                    |
|  前端         |                              |  後端 (FastAPI)   |
|  (React App)   |                              |                    |
|                |       +------------------+   | +----------------+ |
| +------------+ |       |                  |   | |                | |
| | Canvas     | | ----> | API Gateway      |--> | | NLP Pipeline   | |
| | (React Flow)| |       | (e.g., Nginx)    |   | | (spaCy, YAKE)  | |
| +------------+ |       |                  |   | +----------------+ |
|                |       +------------------+   |         |          |
+----------------+                              |         v          |
                                                | +----------------+ |
                                                | | Database       | |
                                                | | (PostgreSQL)   | |
                                                | +----------------+ |
                                                +--------------------+
```

**數據流:**
1.  使用者在前端輸入文本。
2.  前端透過 REST API 將文本發送到後端。
3.  後端 NLP Pipeline 處理文本，提取關鍵特徵。
4.  後端將處理結果 (JSON格式) 返回給前端。
5.  前端根據返回的數據，在畫布上渲染初始的視覺元素。
6.  使用者在畫布上進行手動編輯（組合、連線、修改）。
7.  前端將更新後的畫布狀態 (JSON格式) 發送到後端進行保存。

#### **4. API 端點設計 (API Endpoints)**

以下為 MVP 核心 API 的設計草案：

**`POST /api/v1/process`**
* **功能:** 處理輸入的文本，返回關鍵特徵。
* **Request Body:**
    ```json
    {
      "text": "The brain processes complex information in parallel...",
      "config": { // (可選) 用於未來擴展，如指定提取演算法
        "keyword_extractor": "yake"
      }
    }
    ```
* **Response Body (Success 200):**
    ```json
    {
      "original_text": "...",
      "processed_data": [
        {
          "token": "brain",
          "pos": "NOUN",
          "is_keyword": true,
          "color_tag": "red", // 預設顏色
          "lemma": "brain",
          "char_start": 4,
          "char_end": 9
        },
        // ... 其他 token
      ]
    }
    ```

**`POST /api/v1/canvases`**
* **功能:** 保存一個新的畫布專案。
* **Request Body:**
    ```json
    {
      "name": "My First Analysis",
      "source_document_id": "doc_123", // 關聯的原始文件
      "canvas_state": { // React Flow 的狀態對象
        "nodes": [
          {"id": "node-1", "type": "conceptBlock", "position": {"x": 100, "y": 100}, "data": {"label": "Brain", "icon": "fa-brain"}}
        ],
        "edges": [
          {"id": "edge-1", "source": "node-1", "target": "node-2", "animated": true}
        ],
        "viewport": {"x": 0, "y": 0, "zoom": 1}
      }
    }
    ```
* **Response Body (Success 201):**
    ```json
    {
      "id": "canvas_abc",
      "name": "My First Analysis",
      "created_at": "2025-06-09T23:30:00Z"
    }
    ```

**`GET /api/v1/canvases/{canvas_id}`**
* **功能:** 獲取指定ID的畫布專案。
* **Response Body (Success 200):** (結構同 `POST /api/v1/canvases` 的 Request Body)

**`PUT /api/v1/canvases/{canvas_id}`**
* **功能:** 更新指定ID的畫布專案。
* **Request Body:** (結構同 `POST /api/v1/canvases` 的 Request Body)
* **Response Body (Success 200):**
    ```json
    {
      "id": "canvas_abc",
      "message": "Canvas updated successfully."
    }
    ```

#### **5. 開發任務拆解 (Feature & Task Breakdown)**

##### **功能模組 1: 關鍵特徵抽取 (步驟 1)**

* **後端任務 (NLP Engineer):**
* [x] 建立 FastAPI 專案結構。
* [x] 實作 `POST /api/v1/process` 端點。
* [x] 整合 spaCy 進行分句、分詞與詞性標註。
* [x] 整合 YAKE (或其他庫) 進行關鍵詞提取。
* [x] 編寫邏輯：根據詞性 (POS) 標註，為關鍵詞分配預設的 `color_tag`。
* [x] 撰寫單元測試，確保 NLP pipeline 的輸出穩定。
* **前端任務 (Frontend Engineer):**
    * [x] 建立 React 專案結構。
    * [x] 創建一個文本輸入組件 (`<textarea>` 或支援 `.txt` / `.md` 文件上傳)。
    * [x] 開發一個服務 (service) 來呼叫 `POST /api/v1/process` API。
    * [x] 創建一個顯示區，根據 API 返回的數據，將關鍵詞用帶有特定 CSS class (對應 `color_tag`) 的 `<span>` 包裹起來，以高亮顯示。
    * [ ] 創建一個側邊欄，允許使用者手動點擊某個詞，將其標記/取消標記為關鍵詞，或更改其顏色。

##### **功能模組 2: 中階語意聚合 (步驟 2)**

* **前端任務 (Frontend Engineer):**
    * [ ] 在畫布 (React Flow) 中，實作從側邊欄拖曳關鍵詞到畫布上，生成一個基礎節點的功能。
    * [ ] 實作多選畫布上的節點，並提供「群組」按鈕，將它們合併成一個「概念塊」(一個新的自訂節點)。
    * [ ] 創建一個自訂的 React Flow 節點 (`ConceptBlockNode`)，該節點包含標題、內容摘要，以及一個圖標位置。
    * [ ] 在 `ConceptBlockNode` 的編輯模式中，加入一個圖標選擇器，可以透過關鍵字搜尋 FontAwesome (或類似圖庫)，並讓使用者選定圖標。

##### **功能模組 3: 高階網絡映射 (步驟 3)**

* **後端任務 (Backend Engineer & DBA):**
    * [ ] 設計 `Canvases` 和 `Documents` 的 PostgreSQL 資料庫表結構。
    * [ ] 實作 `POST`, `GET`, `PUT` `/api/v1/canvases` 系列端點，處理畫布狀態的 CRUD (創建、讀取、更新、刪除)。
* **前端任務 (Frontend Engineer):**
    * [ ] 初始化 React Flow 畫布，包含縮放、平移等基本控制。
    * [ ] 實作節點的拖放、選取和刪除功能。
    * [ ] 實作邊 (Edge) 的創建：使用者可以從一個節點的 handle 拖曳到另一個節點，以建立連線。
    * [ ] 創建自訂的邊，允許使用者將其樣式設置為「實線」或「虛線」。
    * [ ] 在工具列中加入「儲存」按鈕，觸發呼叫 `PUT` 或 `POST` API，將當前的畫布狀態 (從 React Flow instance 獲取) 發送到後端。
    * [ ] 實作頁面載入邏輯：如果 URL 包含 `canvas_id`，則呼叫 `GET` API 載入並渲染已儲存的畫布。

#### **6. 資料庫模型 (Data Models)**

**`documents` Table**
```sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id) -- 如果有使用者系統
);
```

**`canvases` Table**
```sql
CREATE TABLE canvases (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    source_document_id INTEGER REFERENCES documents(id),
    canvas_state JSONB NOT NULL, -- 儲存 React Flow 的 JSON 對象
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id)
);
```

---

這份文件為開發團隊提供了啟動專案所需的所有關鍵技術細節。下一步是建立專案管理工具 (如 Jira, Trello)，將上述任務拆解為具體的 story 或 ticket，並分配給相應的開發人員。
