// 校园论坛应用主逻辑
class CampusForum {
    constructor() {
        this.currentPage = 'home';
        this.posts = [];
        this.categories = [];
        this.hotTopics = [];
        this.currentUser = null;
        this.carouselIndex = 0;
        this.init();
    }

    init() {
        this.initData();
        this.bindEvents();
        this.initCarousel();
        this.loadPosts();
        this.loadCategories();
        this.loadHotTopics();
    }

    // 初始化数据
    initData() {
        // 模拟帖子数据
        this.posts = [
            {
                id: 1,
                title: '欢迎来到校园论坛！',
                content: '这里是校园论坛的欢迎帖，希望大家在这里能够愉快地交流，分享校园生活的点点滴滴。无论是学习上的问题，还是生活中的趣事，都可以在这里分享。',
                author: '管理员',
                avatar: 'A',
                category: 'academic',
                categoryName: '学术交流',
                time: '2024-01-15 10:30',
                views: 1250,
                likes: 89,
                comments: 23,
                tags: ['欢迎', '公告', '新手指南']
            },
            {
                id: 2,
                title: '期末考试复习经验分享',
                content: '期末考试即将来临，我想分享一些复习经验。首先，制定合理的复习计划非常重要，其次，要注重基础知识的学习，最后，多做练习题是提高成绩的关键...',
                author: '学霸小明',
                avatar: 'X',
                category: 'academic',
                categoryName: '学术交流',
                time: '2024-01-14 15:45',
                views: 890,
                likes: 67,
                comments: 15,
                tags: ['期末考试', '复习', '经验分享']
            },
            {
                id: 3,
                title: '校园美食推荐',
                content: '今天给大家推荐几家校园周边的美食店。首先是北门外的麻辣烫，味道正宗，价格实惠；其次是东门附近的奶茶店，环境优雅，适合学习...',
                author: '美食达人',
                avatar: 'M',
                category: 'life',
                categoryName: '校园生活',
                time: '2024-01-14 12:20',
                views: 567,
                likes: 45,
                comments: 8,
                tags: ['美食', '推荐', '校园周边']
            },
            {
                id: 4,
                title: '摄影社招新啦！',
                content: '摄影社开始招新了！无论你是摄影新手还是老手，只要你热爱摄影，都欢迎加入我们。我们会定期组织摄影活动，分享摄影技巧...',
                author: '摄影社长',
                avatar: 'S',
                category: 'club',
                categoryName: '社团活动',
                time: '2024-01-13 18:30',
                views: 432,
                likes: 38,
                comments: 12,
                tags: ['招新', '摄影社', '社团活动']
            },
            {
                id: 5,
                title: '实习面试技巧分享',
                content: '最近参加了几家公司的实习面试，总结了一些经验。首先是简历要突出重点，其次是面试时要自信，最后是要提前了解公司背景...',
                author: '实习达人',
                avatar: 'D',
                category: 'job',
                categoryName: '实习就业',
                time: '2024-01-13 09:15',
                views: 789,
                likes: 56,
                comments: 19,
                tags: ['实习', '面试', '求职技巧']
            }
        ];

        // 模拟板块数据
        this.categories = [
            {
                id: 'academic',
                name: '学术交流',
                description: '学习经验分享，学术问题讨论',
                icon: '📚',
                posts: 1234,
                members: 5678
            },
            {
                id: 'life',
                name: '校园生活',
                description: '分享校园生活的点点滴滴',
                icon: '🏠',
                posts: 2345,
                members: 8901
            },
            {
                id: 'club',
                name: '社团活动',
                description: '各类社团活动信息发布',
                icon: '🎯',
                posts: 890,
                members: 3456
            },
            {
                id: 'job',
                name: '实习就业',
                description: '实习信息，就业指导',
                icon: '💼',
                posts: 678,
                members: 2345
            },
            {
                id: 'emotion',
                name: '情感交流',
                description: '情感问题，心灵交流',
                icon: '💝',
                posts: 1567,
                members: 6789
            },
            {
                id: 'trade',
                name: '二手交易',
                description: '校园二手物品交易平台',
                icon: '🛍️',
                posts: 432,
                members: 1234
            }
        ];

        // 模拟热门话题数据
        this.hotTopics = [
            {
                id: 1,
                title: '#期末考试复习攻略#',
                posts: 156,
                views: 12580,
                rank: 1
            },
            {
                id: 2,
                title: '#校园美食推荐#',
                posts: 89,
                views: 8960,
                rank: 2
            },
            {
                id: 3,
                title: '#实习经验分享#',
                posts: 67,
                views: 7230,
                rank: 3
            },
            {
                id: 4,
                title: '#社团招新#',
                posts: 45,
                views: 5670,
                rank: 4
            },
            {
                id: 5,
                title: '#新生入学指南#',
                posts: 123,
                views: 9870,
                rank: 5
            }
        ];
    }

    // 绑定事件
    bindEvents() {
        // 导航事件
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.switchPage(page);
            });
        });

        // 移动端菜单切换
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 搜索功能
        const searchBtn = document.getElementById('searchBtn');
        const searchOverlay = document.getElementById('searchOverlay');
        const searchClose = document.getElementById('searchClose');
        const searchInput = document.getElementById('searchInput');

        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });

        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });

        // 登录功能
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const loginModalClose = document.getElementById('loginModalClose');
        const loginForm = document.getElementById('loginForm');

        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });

        loginModalClose.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // 发帖功能
        const postForm = document.getElementById('postForm');
        const cancelPost = document.getElementById('cancelPost');

        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreatePost();
        });

        cancelPost.addEventListener('click', () => {
            this.switchPage('home');
        });

        // 快速导航
        document.querySelectorAll('.quick-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                this.filterByCategory(category);
            });
        });

        // 筛选标签
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const filter = tab.dataset.filter;
                this.filterPosts(filter);
            });
        });

        // 加载更多
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn.addEventListener('click', () => {
            this.loadMorePosts();
        });

        // 返回按钮
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.switchPage('home');
            });
        }

        // 评论功能
        const submitComment = document.getElementById('submitComment');
        if (submitComment) {
            submitComment.addEventListener('click', () => {
                this.handleComment();
            });
        }
    }

    // 初始化轮播图
    initCarousel() {
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        const carouselInner = document.querySelector('.carousel-inner');

        prevBtn.addEventListener('click', () => {
            this.carouselIndex = (this.carouselIndex - 1 + 3) % 3;
            this.updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            this.carouselIndex = (this.carouselIndex + 1) % 3;
            this.updateCarousel();
        });

        // 自动轮播
        setInterval(() => {
            this.carouselIndex = (this.carouselIndex + 1) % 3;
            this.updateCarousel();
        }, 5000);
    }

    // 更新轮播图
    updateCarousel() {
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.style.transform = `translateX(-${this.carouselIndex * 100}%)`;
    }

    // 页面切换
    switchPage(page) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // 显示目标页面
        const targetPage = document.getElementById(`${page}Page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 更新导航状态
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        // 关闭移动端菜单
        document.getElementById('mobileMenuToggle').classList.remove('active');
        document.querySelector('.nav-menu').classList.remove('active');

        this.currentPage = page;

        // 滚动到顶部
        window.scrollTo(0, 0);
    }

    // 加载帖子列表
    loadPosts() {
        const postsList = document.getElementById('postsList');
        if (!postsList) return;

        postsList.innerHTML = '';
        
        this.posts.forEach(post => {
            const postElement = this.createPostElement(post);
            postsList.appendChild(postElement);
        });
    }

    // 创建帖子元素
    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post-item';
        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-avatar">${post.avatar}</div>
                <div class="post-meta">
                    <div class="post-author">${post.author}</div>
                    <div class="post-time">${post.time}</div>
                </div>
                <div class="post-category">${post.categoryName}</div>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <div class="post-stats">
                <span class="post-stat">👁 ${post.views}</span>
                <span class="post-stat">👍 ${post.likes}</span>
                <span class="post-stat">💬 ${post.comments}</span>
            </div>
        `;

        postDiv.addEventListener('click', () => {
            this.showPostDetail(post);
        });

        return postDiv;
    }

    // 显示帖子详情
    showPostDetail(post) {
        this.switchPage('postDetail');
        
        const postDetail = document.getElementById('postDetail');
        if (!postDetail) return;

        postDetail.innerHTML = `
            <div class="post-detail-header">
                <h1 class="post-detail-title">${post.title}</h1>
                <div class="post-detail-meta">
                    <span>作者: ${post.author}</span>
                    <span>时间: ${post.time}</span>
                    <span>板块: ${post.categoryName}</span>
                    <span>浏览: ${post.views}</span>
                </div>
            </div>
            <div class="post-detail-content">
                ${post.content}
            </div>
            <div class="post-detail-tags">
                ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
            <div class="post-detail-actions">
                <button class="action-btn" onclick="forum.toggleLike(${post.id})">
                    <span>👍</span>
                    <span>${post.likes}</span>
                </button>
                <button class="action-btn">
                    <span>💬</span>
                    <span>${post.comments}</span>
                </button>
                <button class="action-btn">
                    <span>🔗</span>
                    <span>分享</span>
                </button>
                <button class="action-btn">
                    <span>⭐</span>
                    <span>收藏</span>
                </button>
            </div>
        `;

        // 加载评论
        this.loadComments(post.id);
    }

    // 加载评论
    loadComments(postId) {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;

        // 模拟评论数据
        const comments = [
            {
                id: 1,
                author: '用户A',
                avatar: 'A',
                content: '很好的帖子，学到了很多！',
                time: '2024-01-15 11:00',
                likes: 5
            },
            {
                id: 2,
                author: '用户B',
                avatar: 'B',
                content: '感谢分享，对我很有帮助。',
                time: '2024-01-15 11:30',
                likes: 3
            }
        ];

        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = this.createCommentElement(comment);
            commentsList.appendChild(commentElement);
        });
    }

    // 创建评论元素
    createCommentElement(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        commentDiv.innerHTML = `
            <div class="comment-header">
                <div class="comment-avatar">${comment.avatar}</div>
                <div class="comment-author">${comment.author}</div>
                <div class="comment-time">${comment.time}</div>
            </div>
            <div class="comment-content">${comment.content}</div>
            <div class="comment-actions">
                <button class="comment-action">👍 ${comment.likes}</button>
                <button class="comment-action">回复</button>
            </div>
        `;
        return commentDiv;
    }

    // 加载板块
    loadCategories() {
        const categoriesGrid = document.getElementById('categoriesGrid');
        if (!categoriesGrid) return;

        categoriesGrid.innerHTML = '';
        
        this.categories.forEach(category => {
            const categoryElement = this.createCategoryElement(category);
            categoriesGrid.appendChild(categoryElement);
        });
    }

    // 创建板块元素
    createCategoryElement(category) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-card';
        categoryDiv.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3 class="category-name">${category.name}</h3>
            <p class="category-description">${category.description}</p>
            <div class="category-stats">
                <span>帖子: ${category.posts}</span>
                <span>成员: ${category.members}</span>
            </div>
        `;

        categoryDiv.addEventListener('click', () => {
            this.filterByCategory(category.id);
        });

        return categoryDiv;
    }

    // 加载热门话题
    loadHotTopics() {
        const hotTopics = document.getElementById('hotTopics');
        if (!hotTopics) return;

        hotTopics.innerHTML = '';
        
        this.hotTopics.forEach(topic => {
            const topicElement = this.createHotTopicElement(topic);
            hotTopics.appendChild(topicElement);
        });
    }

    // 创建热门话题元素
    createHotTopicElement(topic) {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'hot-topic-item';
        
        const rankClass = topic.rank <= 3 ? `top-${topic.rank}` : '';
        
        topicDiv.innerHTML = `
            <div class="hot-topic-header">
                <div class="hot-topic-rank ${rankClass}">${topic.rank}</div>
                <div class="hot-topic-title">${topic.title}</div>
            </div>
            <div class="hot-topic-stats">
                <span>帖子: ${topic.posts}</span>
                <span>浏览: ${topic.views}</span>
            </div>
        `;

        topicDiv.addEventListener('click', () => {
            this.searchByTopic(topic.title);
        });

        return topicDiv;
    }

    // 按板块筛选
    filterByCategory(categoryId) {
        const filteredPosts = this.posts.filter(post => post.category === categoryId);
        this.displayFilteredPosts(filteredPosts);
        this.switchPage('home');
    }

    // 筛选帖子
    filterPosts(filter) {
        let filteredPosts = [...this.posts];
        
        switch(filter) {
            case 'hot':
                filteredPosts.sort((a, b) => b.views - a.views);
                break;
            case 'essence':
                filteredPosts = filteredPosts.filter(post => post.likes > 50);
                break;
            case 'latest':
            default:
                // 默认按时间排序
                break;
        }
        
        this.displayFilteredPosts(filteredPosts);
    }

    // 显示筛选后的帖子
    displayFilteredPosts(posts) {
        const postsList = document.getElementById('postsList');
        if (!postsList) return;

        postsList.innerHTML = '';
        
        posts.forEach(post => {
            const postElement = this.createPostElement(post);
            postsList.appendChild(postElement);
        });
    }

    // 搜索功能
    performSearch(query) {
        if (!query.trim()) return;
        
        const searchOverlay = document.getElementById('searchOverlay');
        searchOverlay.classList.remove('active');
        
        const results = this.posts.filter(post => 
            post.title.includes(query) || 
            post.content.includes(query) ||
            post.author.includes(query)
        );
        
        this.displayFilteredPosts(results);
        this.switchPage('home');
    }

    // 按话题搜索
    searchByTopic(topic) {
        const query = topic.replace('#', '');
        this.performSearch(query);
    }

    // 加载更多帖子
    loadMorePosts() {
        // 模拟加载更多帖子
        const newPosts = [
            {
                id: this.posts.length + 1,
                title: '新帖子标题',
                content: '这是新加载的帖子内容...',
                author: '新用户',
                avatar: 'N',
                category: 'life',
                categoryName: '校园生活',
                time: '2024-01-12 14:20',
                views: 123,
                likes: 8,
                comments: 2,
                tags: ['新帖']
            }
        ];
        
        this.posts.push(...newPosts);
        this.loadPosts();
    }

    // 处理登录
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            this.currentUser = username;
            document.getElementById('loginModal').classList.remove('active');
            document.getElementById('loginBtn').textContent = username;
            
            // 清空表单
            document.getElementById('loginForm').reset();
            
            // 显示成功消息
            this.showMessage('登录成功！');
        }
    }

    // 处理发帖
    handleCreatePost() {
        const category = document.getElementById('postCategory').value;
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        const tags = document.getElementById('postTags').value;
        
        if (!category || !title || !content) {
            this.showMessage('请填写完整信息！', 'error');
            return;
        }
        
        const categoryInfo = this.categories.find(c => c.id === category);
        
        const newPost = {
            id: this.posts.length + 1,
            title: title,
            content: content,
            author: this.currentUser || '匿名用户',
            avatar: this.currentUser ? this.currentUser[0].toUpperCase() : 'A',
            category: category,
            categoryName: categoryInfo.name,
            time: new Date().toLocaleString('zh-CN'),
            views: 0,
            likes: 0,
            comments: 0,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : []
        };
        
        this.posts.unshift(newPost);
        
        // 清空表单
        document.getElementById('postForm').reset();
        
        // 切换到首页
        this.switchPage('home');
        this.loadPosts();
        
        this.showMessage('发帖成功！');
    }

    // 处理评论
    handleComment() {
        const commentContent = document.getElementById('commentContent').value;
        
        if (!commentContent.trim()) {
            this.showMessage('请输入评论内容！', 'error');
            return;
        }
        
        const newComment = {
            id: Date.now(),
            author: this.currentUser || '匿名用户',
            avatar: this.currentUser ? this.currentUser[0].toUpperCase() : 'A',
            content: commentContent,
            time: new Date().toLocaleString('zh-CN'),
            likes: 0
        };
        
        const commentsList = document.getElementById('commentsList');
        const commentElement = this.createCommentElement(newComment);
        commentsList.insertBefore(commentElement, commentsList.firstChild);
        
        // 清空评论框
        document.getElementById('commentContent').value = '';
        
        this.showMessage('评论成功！');
    }

    // 切换点赞
    toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            this.showPostDetail(post);
        }
    }

    // 显示消息
    showMessage(message, type = 'success') {
        // 创建消息元素
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-size: 14px;
            z-index: 4000;
            animation: slideIn 0.3s ease;
            background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        `;
        
        document.body.appendChild(messageDiv);
        
        // 3秒后自动移除
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .tag {
        display: inline-block;
        background-color: #e9ecef;
        color: #666;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 8px;
        margin-bottom: 8px;
    }
    
    .post-detail-tags {
        margin: 15px 0;
    }
`;
document.head.appendChild(style);

// 初始化应用
const forum = new CampusForum();