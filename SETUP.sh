#!/bin/bash

# 迷因詪 - 安裝和啟動指南

echo "🎭 歡迎使用迷因詪！"
echo ""
echo "開始安裝..."
echo ""

# 檢查 Node.js 是否已安裝
if ! command -v node &> /dev/null; then
    echo "❌ 錯誤：Node.js 未安裝"
    echo "請從 https://nodejs.org 下載並安裝 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 進入後端目錄並安裝依賴
echo "📦 正在安裝後端依賴..."
cd backend || exit 1

if npm install; then
    echo "✅ 後端依賴安裝完成"
else
    echo "❌ 安裝失敗"
    exit 1
fi

echo ""
echo "🎉 安裝完成！"
echo ""
echo "接下來的步驟："
echo "1️⃣  打開新的終端窗口"
echo "2️⃣  進入 backend 目錄：cd backend"
echo "3️⃣  運行：npm start"
echo "4️⃣  在瀏覽器中打開 frontend/index.html"
echo ""
echo "或者使用 Live Server 擴展打開 frontend/index.html"
echo ""
echo "祝你使用愉快！😄"