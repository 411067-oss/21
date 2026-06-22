const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getAllMemes, addMeme, getMemeById } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 日誌中間件
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} ${req.path}`);
    next();
});

// 根路由
app.get('/', (req, res) => {
    res.json({ 
        message: '歡迎來到迷因詪 API',
        version: '1.0.0'
    });
});

// 獲取所有迷因
app.get('/api/memes', (req, res) => {
    getAllMemes((err, memes) => {
        if (err) {
            console.error('獲取迷因錯誤:', err);
            return res.status(500).json({ error: '無法獲取迷因' });
        }
        res.json(memes || []);
    });
});

// 獲取單個迷因
app.get('/api/memes/:id', (req, res) => {
    const id = req.params.id;
    
    // 驗證 ID 是否為有效的整數
    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: '無效的迷因 ID' });
    }
    
    getMemeById(id, (err, meme) => {
        if (err) {
            console.error('獲取迷因錯誤:', err);
            return res.status(500).json({ error: '無法獲取迷因' });
        }
        
        if (!meme) {
            return res.status(404).json({ error: '迷因不存在' });
        }
        
        res.json(meme);
    });
});

// 添加新迷因
app.post('/api/memes', (req, res) => {
    const { title, content, imageUrl } = req.body;
    
    // 驗證必填欄位
    if (!title || !content) {
        return res.status(400).json({ 
            error: '標題和內容是必填的' 
        });
    }
    
    // 驗證長度
    if (title.length > 200) {
        return res.status(400).json({ 
            error: '標題不能超過 200 個字元' 
        });
    }
    
    if (content.length > 1000) {
        return res.status(400).json({ 
            error: '內容不能超過 1000 個字元' 
        });
    }
    
    addMeme(title, content, imageUrl || null, (err) => {
        if (err) {
            console.error('添加迷因錯誤:', err);
            return res.status(500).json({ error: '無法添加迷因' });
        }
        res.status(201).json({ 
            message: '迷因已添加',
            title,
            content
        });
    });
});

// 404 處理
app.use((req, res) => {
    res.status(404).json({ error: '找不到該路由' });
});

// 錯誤處理
app.use((err, req, res, next) => {
    console.error('伺服器錯誤:', err);
    res.status(500).json({ error: '伺服器內部錯誤' });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`\n🎭 迷因詪後端伺服器已啟動`);
    console.log(`📍 地址: http://localhost:${PORT}`);
    console.log(`📚 API 文檔:`);
    console.log(`   GET  /api/memes          - 獲取所有迷因`);
    console.log(`   GET  /api/memes/:id      - 獲取單個迷因`);
    console.log(`   POST /api/memes          - 添加新迷因`);
    console.log(`\n按 Ctrl+C 停止伺服器\n`);
});