const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 資料庫檔案位置
const dbPath = path.join(__dirname, 'memes.db');

// 創建資料庫連接
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('資料庫連接錯誤:', err);
    } else {
        console.log('已連接到 SQLite 資料庫');
        initializeDatabase();
    }
});

// 初始化資料庫表
function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS memes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('創建表錯誤:', err);
        } else {
            console.log('迷因表已準備就緒');
        }
    });
}

// 獲取所有迷因
function getAllMemes(callback) {
    db.all('SELECT * FROM memes ORDER BY created_at DESC', callback);
}

// 添加新迷因
function addMeme(title, content, imageUrl, callback) {
    db.run(
        'INSERT INTO memes (title, content, image_url) VALUES (?, ?, ?)',
        [title, content, imageUrl],
        callback
    );
}

// 獲取單個迷因
function getMemeById(id, callback) {
    db.get('SELECT * FROM memes WHERE id = ?', [id], callback);
}

// 關閉資料庫
function closeDatabase() {
    db.close();
}

module.exports = {
    db,
    getAllMemes,
    addMeme,
    getMemeById,
    closeDatabase
};