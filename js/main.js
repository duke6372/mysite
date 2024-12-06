// 导航栏响应式切换
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // 在移动端点击导航链接后关闭菜单
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// 滚动时改变导航栏样式
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'var(--white)';
    }
});

// 博客相关功能
document.addEventListener('DOMContentLoaded', function() {
    const newPostBtn = document.getElementById('new-post-btn');
    const postModal = document.getElementById('post-modal');
    const closeModal = document.querySelector('.close-modal');
    const postForm = document.getElementById('post-form');

    // 打开发布文章对话框
    newPostBtn?.addEventListener('click', () => {
        postModal.style.display = 'block';
    });

    // 关闭对话框
    closeModal?.addEventListener('click', () => {
        postModal.style.display = 'none';
    });

    // 点击对话框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === postModal) {
            postModal.style.display = 'none';
        }
    });

    // 处理文章发布
    postForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        // 这里添加发布文章的逻辑
        alert('文章发布功能需要后端支持，目前仅作展示');
        postModal.style.display = 'none';
    });

    // 搜索功能
    const searchInput = document.getElementById('blog-search-input');
    searchInput?.addEventListener('input', (e) => {
        // 这里添加搜索逻辑
        console.log('搜索:', e.target.value);
    });

    // 分类筛选
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter?.addEventListener('change', (e) => {
        // 这里添加分���筛选逻辑
        console.log('选择分类:', e.target.value);
    });
});

// 商店相关功能
document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    let cartCount = 0;

    // 打开购物车侧边栏
    cartBtn?.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    // 关闭购物车侧边栏
    closeCart?.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // 点击侧边栏外部关闭
    document.addEventListener('click', (e) => {
        if (e.target.closest('.cart-sidebar') || e.target.closest('.cart-btn')) return;
        cartSidebar?.classList.remove('active');
    });

    // 添加到购物车
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartCount++;
            document.querySelector('.cart-count').textContent = cartCount;
            
            // 这里添加商品到购物车的逻辑
            const product = this.closest('.product-card');
            const productName = product.querySelector('.product-title').textContent;
            const productPrice = product.querySelector('.price-now').textContent;
            
            alert(`已添加商品：${productName} (${productPrice}) 到购物车`);
        });
    });

    // 商品搜索功能
    const searchInput = document.getElementById('shop-search-input');
    searchInput?.addEventListener('input', (e) => {
        // 这里添加搜索逻辑
        console.log('搜索商品:', e.target.value);
    });

    // 商品分类筛选
    const categoryFilter = document.getElementById('shop-category-filter');
    categoryFilter?.addEventListener('change', (e) => {
        // 这里添加分类筛选逻辑
        console.log('选择商品分类:', e.target.value);
    });
});

// AI助手相关功能
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // 自动调整输入框高度
    chatInput?.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    // 发送消息
    function sendMessage(message) {
        if (!message.trim()) return;

        // 添加用户消息
        const userMessageHTML = `
            <div class="message user-message">
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">${message}</div>
                    <div class="message-time">刚刚</div>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', userMessageHTML);

        // 模拟AI回复
        setTimeout(() => {
            const aiResponse = getAIResponse(message);
            const aiMessageHTML = `
                <div class="message ai-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <div class="message-text">${aiResponse}</div>
                        <div class="message-time">刚刚</div>
                    </div>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', aiMessageHTML);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);

        // 清空输入框并重置高��
        chatInput.value = '';
        chatInput.style.height = 'auto';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 模拟AI响应
    function getAIResponse(message) {
        const responses = {
            '如何学习编程？': '学习编程的好方法是：\n1. 选择一个适合的编程语言\n2. 跟随在线教程学习基础\n3. 动手实践，完成小项目\n4. 加入编程社区，与他人交流\n5. 坚持学习，循序渐进',
            '推荐一些学习资源': '以下是一些优质的学习资源：\n- FreeCodeCamp\n- Coursera\n- Udemy\n- MDN Web Docs\n- GitHub\n- Stack Overflow',
            '介绍你自己': '我是一个AI助手，专注于帮助用户解决技术问题和学习编程。我可以回答问题、提供建议，也可以和你聊天。',
            'default': '这是一个很好的问题！让我想想...\n作为AI助手，我会尽力提供最准确的回答。'
        };
        return responses[message] || responses['default'];
    }

    // 发送按钮点击事件
    sendButton?.addEventListener('click', () => {
        sendMessage(chatInput.value);
    });

    // 回车发送消息
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(chatInput.value);
        }
    });

    // 快捷提问按钮
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sendMessage(btn.textContent);
        });
    });
});

// 联系表单处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 这里添加表单提交逻辑
        alert('感谢您的留言！我会尽快回复。');
        this.reset();
    });
}); 