const API_URL = 'http://localhost:3000/api';

// 頁面加載時獲取迷因列表
document.addEventListener('DOMContentLoaded', () => {
    loadMemes();
    setupFormListener();
});

// 設置表單提交監聽器
function setupFormListener() {
    const form = document.getElementById('memeForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const imageUrl = document.getElementById('imageUrl').value;
        
        try {
            const response = await fetch(`${API_URL}/memes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    imageUrl: imageUrl || null
                })
            });
            
            if (response.ok) {
                showSuccess('迷因已分享！🎉');
                form.reset();
                loadMemes();
            } else {
                showError('分享失敗，請重試');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('無法連接到伺服器');
        }
    });
}

// 加載迷因列表
async function loadMemes() {
    try {
        const response = await fetch(`${API_URL}/memes`);
        const memes = await response.json();
        
        const memeList = document.getElementById('memeList');
        
        if (memes.length === 0) {
            memeList.innerHTML = '<p class="loading">還沒有迷因，成為第一個分享者吧！</p>';
            return;
        }
        
        memeList.innerHTML = memes.map(meme => createMemeCard(meme)).join('');
    } catch (error) {
        console.error('Error loading memes:', error);
        document.getElementById('memeList').innerHTML = 
            '<p class="error">無法加載迷因列表</p>';
    }
}

// 創建迷因卡片
function createMemeCard(meme) {
    const date = new Date(meme.created_at).toLocaleString('zh-TW');
    const imageHtml = meme.image_url 
        ? `<img src="${meme.image_url}" alt="${meme.title}">`
        : '<div class="placeholder">🎭</div>';
    
    return `
        <div class="meme-card">
            <div class="meme-image ${meme.image_url ? '' : 'no-image'}">
                ${imageHtml}
            </div>
            <div class="meme-content">
                <h3>${escapeHtml(meme.title)}</h3>
                <p>${escapeHtml(meme.content)}</p>
                <div class="meme-meta">
                    分享於：${date}
                </div>
            </div>
        </div>
    `;
}

// 顯示成功信息
function showSuccess(message) {
    const addSection = document.querySelector('.add-section');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'success';
    msgDiv.textContent = message;
    addSection.insertBefore(msgDiv, addSection.firstChild);
    
    setTimeout(() => msgDiv.remove(), 3000);
}

// 顯示錯誤信息
function showError(message) {
    const addSection = document.querySelector('.add-section');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'error';
    msgDiv.textContent = message;
    addSection.insertBefore(msgDiv, addSection.firstChild);
    
    setTimeout(() => msgDiv.remove(), 3000);
}

// HTML轉義函數，防止XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}