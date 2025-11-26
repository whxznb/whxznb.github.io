// 获取元素
const wishModal = document.getElementById('wishModal');
const meteorContainer = document.getElementById('meteorContainer');
const wishContent = document.getElementById('wishContent');
const wishBtns = document.querySelectorAll('.wish-btn');

// 点击许愿按钮触发特效
wishBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 获取心愿文本
        const wishText = btn.getAttribute('data-wish');
        
        // 隐藏许愿框
        wishModal.classList.add('hidden');
        
        // 清空之前的心愿内容
        wishContent.textContent = '';
        setTimeout(() => {
            wishContent.textContent = wishText;
            wishContent.classList.add('show');
        }, 300);
        
        // 创建4个大流星（从右上方不同位置划过）
        createBigMeteors(4);
        
        // 动画结束后重置并显示许愿框（匹配动画时长）
        setTimeout(() => {
            wishContent.classList.remove('show');
            // 确保许愿框缓慢淡入
            setTimeout(() => {
                wishModal.classList.remove('hidden');
            }, 800); // 延长延迟，确保过渡自然
        }, 5500); // 匹配许愿内容动画时长（5s）
    });
});

// 创建大流星函数（分散位置）
function createBigMeteors(count) {
    // 先清空之前的流星
    meteorContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const bigMeteor = document.createElement('div');
        bigMeteor.classList.add('big-meteor');
        
        // 分散流星位置（右侧不同位置）
        const rightPos = i * 80; // 0px, 80px, 160px, 240px
        bigMeteor.style.right = `${rightPos}px`;
        
        // 错开动画时间
        bigMeteor.style.animationDelay = `${i * 0.4}s`;
        
        meteorContainer.appendChild(bigMeteor);
        
        // 动画结束后移除流星元素
        setTimeout(() => {
            if (bigMeteor.parentNode) {
                bigMeteor.remove();
            }
        }, 2000);
    }
}

// 可选：添加随机小流星（增强星空效果）
function createRandomMeteor() {
    const meteor = document.createElement('div');
    meteor.classList.add('big-meteor');
    meteor.style.width = '4px';
    meteor.style.height = '200px';
    meteor.style.right = `${Math.random() * 300}px`;
    meteor.style.animation = 'bigMeteor 2.5s linear forwards';
    meteor.style.animationDelay = '0s';
    
    meteorContainer.appendChild(meteor);
    
    setTimeout(() => {
        if (meteor.parentNode) {
            meteor.remove();
        }
    }, 2500);
}

// 每隔8秒生成一个随机流星
setInterval(createRandomMeteor, 8000);