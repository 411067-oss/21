# 🎭 迷因詪 - 迷因分享平台

一個簡單而有趣的迷因分享網站，具有靜態前端和資料庫後端。

## 📁 項目結構

```
21/
├── frontend/          # 前端靜態文件
│   ├── index.html     # 主頁面
│   ├── styles.css     # 樣式文件
│   └── script.js      # JavaScript 交互
├── backend/           # 後端 API 服務
│   ├── server.js      # Express 伺服器
│   ├── database.js    # SQLite 資料庫
│   └── package.json   # 依賴配置
└── README.md          # 此文件
```

## 🚀 快速開始

### 1. 安裝後端依賴

```bash
cd backend
npm install
```

### 2. 啟動後端伺服器

```bash
npm start
```

伺服器會在 `http://localhost:3000` 啟動。

### 3. 打開前端頁面

在瀏覽器中打開 `frontend/index.html`，或使用 Live Server：

- VS Code 中右鍵點擊 `frontend/index.html`
- 選擇 "Open with Live Server"

## 📚 API 文檔

### 獲取所有迷因
```
GET /api/memes
```
返回所有迷因的列表，按創建時間倒序排列。

**回應示例：**
```json
[
  {
    "id": 1,
    "title": "第一個迷因",
    "content": "這是一個迷因",
    "image_url": "https://example.com/image.jpg",
    "created_at": "2026-06-22 10:30:00"
  }
]
```

### 獲取單個迷因
```
GET /api/memes/:id
```
獲取指定 ID 的迷因詳細信息。

### 添加新迷因
```
POST /api/memes
```
添加一個新迷因到資料庫。

**請求體：**
```json
{
  "title": "迷因標題",
  "content": "迷因內容或文字",
  "imageUrl": "https://example.com/image.jpg"
}
```

**驗證規則：**
- `title` 和 `content` 必填
- `title` 不超過 200 字元
- `content` 不超過 1000 字元
- `imageUrl` 可選

## 🎨 功能特性

✅ **查看迷因** - 以卡片形式展示所有迷因  
✅ **分享迷因** - 添加標題、內容和圖片鏈接  
✅ **即時更新** - 分享後立即刷新列表  
✅ **響應式設計** - 適配桌面和移動設備  
✅ **錯誤提示** - 友好的用戶提示信息  

## 📦 技術棧

**前端：**
- HTML5
- CSS3（含漸變和媒體查詢）
- JavaScript（ES6+）

**後端：**
- Node.js
- Express.js
- SQLite3
- CORS

## 🔧 配置

### 後端配置

可在 `backend/server.js` 中修改：
- `PORT` - 伺服器埠（預設 3000）

### 前端配置

可在 `frontend/script.js` 中修改：
- `API_URL` - API 基底 URL（預設 http://localhost:3000/api）

## 📝 數據庫架構

迷因表結構：

```sql
CREATE TABLE memes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🐛 故障排除

**問題：無法連接到後端**
- 確認後端伺服器已啟動
- 檢查埠 3000 是否被佔用
- 確認 `frontend/script.js` 中的 `API_URL` 正確

**問題：資料庫找不到**
- 確認在 `backend` 目錄中運行 `npm start`
- 資料庫會自動創建在 `backend/memes.db`

**問題：CORS 錯誤**
- 確認已安裝 `cors` 套件
- 檢查前端頁面和後端伺服器的域名是否正確

## 📄 許可證

MIT

## 😄 玩得開心！

現在開始分享有趣的迷因吧！