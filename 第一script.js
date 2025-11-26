// 正确答案
const correctAnswer = "949";

// 页面加载后绑定按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('button');
    submitBtn.addEventListener('click', validateAnswer);
});

// 验证答案函数
function validateAnswer(event) {
    event.preventDefault();
    const userInput = document.getElementById("answer").value.trim();
    const errorMsg = document.getElementById("error-message");

    if (userInput === correctAnswer) {
        // 跳转目标页面（确保路径正确）
        window.location.href = "第二页/index.html";
    } else {
        errorMsg.textContent = "猪儿你居然忘了！！！！！！！";
        // 重置动画状态，确保每次错误都能触发动画
        errorMsg.style.display = "none";
        void errorMsg.offsetWidth;
        errorMsg.style.display = "block";
    }
}