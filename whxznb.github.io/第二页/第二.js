// 全局变量定义
let heartInterval; // 爱心飘过动画定时器
let isHeartActive = true; // 爱心动画状态标识
let collectedHearts = 0; // 收集的爱心数量（创意1）
const totalPhotos = document.querySelectorAll('.photo').length; // 总照片数
const clickedPhotos = new Set(); // 已点击的照片索引集合（创意1）

// -------------------------- 原有核心功能 --------------------------
// 照片放大模态框功能
const photos = document.querySelectorAll('.photo');
const modal = document.getElementById('photoModal');
const modalImage = document.querySelector('.modal-image');
const closeBtn = document.querySelector('.close-btn');

// 为每张照片添加点击事件（放大+爱心收集）
photos.forEach(photo => {
    photo.addEventListener('click', () => {
        // 照片放大逻辑
        const style = window.getComputedStyle(photo);
        const bgImage = style.backgroundImage;
        const imageUrl = bgImage.replace(/url\(["']?/, '').replace(/["']?\)/, '');
        modalImage.src = imageUrl;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // 爱心收集逻辑（创意1）
        const photoIndex = Array.from(photos).indexOf(photo);
        if (!clickedPhotos.has(photoIndex)) {
            clickedPhotos.add(photoIndex);
            collectedHearts++;
            updateHeartCounter();
            triggerReward(); // 触发奖励机制
        }
    });
});

// 关闭模态框
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

// -------------------------- 创意1：爱心收集功能 --------------------------
// 创建爱心计数器
function createHeartCounter() {
    const heartCounter = document.createElement('div');
    heartCounter.className = 'heart-counter';
    heartCounter.innerHTML = '<i>❤️</i><span>爱心：0/' + totalPhotos + '</span>';
    document.body.appendChild(heartCounter);
}

// 更新爱心计数器显示
function updateHeartCounter() {
    const counter = document.querySelector('.heart-counter');
    counter.innerHTML = '<i>❤️</i><span>爱心：' + collectedHearts + '/' + totalPhotos + '</span>';
}

// 触发奖励机制
function triggerReward() {
    const cuteText = document.querySelector('.cute-text');
    const centerPhoto = document.querySelector('.photo-center');

    // 收集5颗爱心：文字平滑升级（分步进行）
    if (collectedHearts === 5) {
        // 第一步：先添加弹跳动画，增强互动感
        cuteText.style.animation = 'bounce 1.5s ease-in-out';
        // 第二步：100ms后切换文字内容（等待弹跳动画启动）
        setTimeout(() => {
            cuteText.textContent = '太厉害啦～❤️';
        }, 100);
        // 第三步：300ms后切换样式（颜色+阴影），与弹跳动画衔接
        setTimeout(() => {
            cuteText.classList.add('highlight');
        }, 300);
        // 第四步：1.5s后恢复原有循环动画，保持一致性
        setTimeout(() => {
            cuteText.style.animation = 'fadeInOut 6s ease-in-out infinite';
        }, 1500);
    }

    // 收集10颗爱心：触发爱心雨（无文字变化，保持原有流畅度）
    if (collectedHearts === 10) {
        createHeartRain();
        // 额外添加轻微文字弹跳，增强反馈
        cuteText.style.animation = 'bounce 1s ease-in-out';
        setTimeout(() => {
            cuteText.style.animation = 'fadeInOut 6s ease-in-out infinite';
        }, 1000);
    }

    // 收集全部爱心：文字终极升级（分步过渡，更有层次感）
    if (collectedHearts === totalPhotos) {
        // 第一步：先停止原有动画，避免冲突
        cuteText.style.animation = 'none';
        // 第二步：轻微放大+弹跳，吸引注意力
        cuteText.style.transform = 'translate(-50%, -50%) scale(1.2)';
        setTimeout(() => {
            cuteText.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
        // 第三步：500ms后切换文字内容
        setTimeout(() => {
            cuteText.textContent = '解锁全部回忆！🎉';
        }, 500);
        // 第四步：800ms后切换终极样式（颜色+阴影）
        setTimeout(() => {
            cuteText.classList.remove('highlight');
            cuteText.classList.add('final');
        }, 800);
        // 第五步：1.2s后恢复循环动画，添加终极动画效果
        setTimeout(() => {
            cuteText.style.animation = 'fadeInOut 6s ease-in-out infinite, bounce 2s ease-in-out infinite';
            centerPhoto.classList.add('unlocked');
            createHeartRain();
        }, 1200);
    }
}

// 创建爱心雨奖励
function createHeartRain() {
    const rainContainer = document.querySelector('.heart-rain-container');
    // 清空现有爱心雨（避免叠加）
    rainContainer.innerHTML = '';

    // 生成50颗爱心
    for (let i = 0; i < 50; i++) {
        const rainHeart = document.createElement('div');
        rainHeart.className = 'rain-heart';
        rainHeart.innerHTML = '❤️';
        // 随机位置、大小、动画时长
        rainHeart.style.left = Math.random() * 100 + 'vw';
        rainHeart.style.fontSize = Math.random() * 20 + 10 + 'px';
        rainHeart.style.animationDuration = Math.random() * 2 + 1 + 's';
        rainContainer.appendChild(rainHeart);
    }

    // 2秒后移除爱心雨容器内容
    setTimeout(() => {
        rainContainer.innerHTML = '';
    }, 2000);
}

// -------------------------- 创意4：动态背景功能 --------------------------
// 生成萤火虫
function createFirefly() {
    const dynamicBg = document.querySelector('.dynamic-bg');
    // 限制萤火虫数量（最多15个，避免卡顿）
    if (document.querySelectorAll('.firefly').length < 15) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        // 随机位置
        firefly.style.top = Math.random() * 100 + 'vh';
        firefly.style.left = Math.random() * 100 + 'vw';
        // 随机动画时长（5-15秒）
        firefly.style.animationDuration = Math.random() * 10 + 5 + 's';
        dynamicBg.appendChild(firefly);

        // 10-25秒后移除萤火虫（避免内存堆积）
        setTimeout(() => {
            firefly.remove();
        }, Math.random() * 15000 + 10000);
    }
}

// 生成流星
function createMeteor() {
    const dynamicBg = document.querySelector('.dynamic-bg');
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    // 随机垂直位置（上半屏）
    meteor.style.top = Math.random() * 50 + 'vh';
    // 随机延迟（0-2秒）
    meteor.style.animationDelay = Math.random() * 2 + 's';
    dynamicBg.appendChild(meteor);

    // 动画结束后移除流星
    setTimeout(() => {
        meteor.remove();
    }, 3000);
}

// 定时生成动态背景元素
function startDynamicBg() {
    // 每秒生成1只萤火虫
    setInterval(createFirefly, 1000);
    // 每5秒生成1颗流星
    setInterval(createMeteor, 5000);

    // 初始生成10只萤火虫（页面加载即有效果）
    for (let i = 0; i < 10; i++) {
        setTimeout(createFirefly, i * 500);
    }
}

// -------------------------- 新增：可爱漂浮元素功能 --------------------------
// 生成漂浮云朵
function createFloatCloud() {
    const floatContainer = document.querySelector('.cute-float-container');
    // 限制云朵数量（最多5个）
    if (document.querySelectorAll('.float-cloud').length < 5) {
        const cloud = document.createElement('div');
        cloud.className = 'float-cloud';
        // 随机垂直位置（上半屏，避免遮挡按钮）
        cloud.style.top = Math.random() * 40 + 'vh';
        // 随机动画时长（15-25秒）
        cloud.style.animationDuration = Math.random() * 10 + 15 + 's';
        floatContainer.appendChild(cloud);

        // 动画结束后移除云朵（避免堆积）
        setTimeout(() => {
            cloud.remove();
        }, 25000);
    }
}

// 生成漂浮星星
function createFloatStar() {
    const floatContainer = document.querySelector('.cute-float-container');
    // 限制星星数量（最多8个）
    if (document.querySelectorAll('.float-star').length < 8) {
        const star = document.createElement('div');
        star.className = 'float-star';
        star.innerHTML = '⭐';
        // 随机位置（全屏）
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        // 随机大小（14-20px）
        star.style.fontSize = Math.random() * 6 + 14 + 'px';
        // 随机动画时长（20-30秒）
        star.style.animationDuration = Math.random() * 10 + 20 + 's';
        floatContainer.appendChild(star);

        // 20-30秒后移除星星
        setTimeout(() => {
            star.remove();
        }, Math.random() * 10000 + 20000);
    }
}

// 生成漂浮小爱心
function createFloatHeart() {
    const floatContainer = document.querySelector('.cute-float-container');
    // 限制小爱心数量（最多6个）
    if (document.querySelectorAll('.float-heart').length < 6) {
        const heart = document.createElement('div');
        heart.className = 'float-heart';
        heart.innerHTML = '❤️';
        // 随机位置（全屏）
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.left = Math.random() * 100 + 'vw';
        // 随机大小（12-18px）
        heart.style.fontSize = Math.random() * 6 + 12 + 'px';
        // 随机动画时长（18-28秒）
        heart.style.animationDuration = Math.random() * 10 + 18 + 's';
        floatContainer.appendChild(heart);

        // 18-28秒后移除小爱心
        setTimeout(() => {
            heart.remove();
        }, Math.random() * 10000 + 18000);
    }
}

// 定时生成可爱漂浮元素
function startCuteFloatElements() {
    // 每3秒生成1个云朵
    setInterval(createFloatCloud, 3000);
    // 每2秒生成1个星星
    setInterval(createFloatStar, 2000);
    // 每4秒生成1个小爱心
    setInterval(createFloatHeart, 4000);

    // 初始生成（页面加载即有效果）
    setTimeout(createFloatCloud, 500);
    setTimeout(createFloatStar, 1000);
    setTimeout(createFloatHeart, 1500);
}

// -------------------------- 爱心飘过动画功能 --------------------------
// 创建单个爱心
function createHeart() {
    const heartContainer = document.querySelector('.heart-container');
    const heart = document.createElement('div');
    const size = Math.random() * 20 + 10; // 随机大小（10-30px）

    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.fontSize = `${size}px`;
    heart.style.top = `${Math.random() * 100}vh`; // 随机垂直位置
    const duration = Math.random() * 5 + 3; // 随机动画时长（3-8秒）
    heart.style.animationDuration = `${duration}s`;

    heartContainer.appendChild(heart);

    // 动画结束后移除爱心
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// 启动爱心飘过动画
function startHeartAnimation() {
    if (!heartInterval) {
        heartInterval = setInterval(createHeart, 200);
        // 初始生成15颗爱心
        for (let i = 0; i < 15; i++) {
            setTimeout(createHeart, i * 300);
        }
    }
}

// 停止爱心飘过动画
function stopHeartAnimation() {
    if (heartInterval) {
        clearInterval(heartInterval);
        heartInterval = null;
    }
}

// 小猫按钮控制爱心动画开关
const stopHeartBtn = document.getElementById('stopHeartBtn');
stopHeartBtn.addEventListener('click', () => {
    isHeartActive = !isHeartActive;
    if (isHeartActive) {
        startHeartAnimation();
        stopHeartBtn.textContent = '点我停止关闭爱心（你真的舍得吗）';
        stopHeartBtn.style.background = 'linear-gradient(135deg, #ffd1dc 0%, #ffc1e9 100%)';
        stopHeartBtn.style.borderColor = '#ff9bb3';
        stopHeartBtn.style.color = '#d6336c';
    } else {
        stopHeartAnimation();
        stopHeartBtn.textContent = '点我恢复爱心～(≧∇≦)ﾉ';
        stopHeartBtn.style.background = 'linear-gradient(135deg, #c1eaff 0%, #b1e9ff 100%)';
        stopHeartBtn.style.borderColor = '#9bb3ff';
        stopHeartBtn.style.color = '#336cd6';
    }
});

// -------------------------- 初始化所有功能 --------------------------
window.onload = function() {
    createHeartCounter(); // 初始化爱心计数器（创意1）
    startHeartAnimation(); // 初始化爱心飘过动画
    startDynamicBg(); // 初始化动态背景（创意4）
    startCuteFloatElements(); // 初始化可爱漂浮元素（新增）
};