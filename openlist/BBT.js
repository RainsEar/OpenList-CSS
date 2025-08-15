// 创建按钮
const btn = document.createElement('button');
btn.id = 'zhidingan';
btn.innerHTML = `
<svg viewBox="0 0 24 24" width="24" height="24" fill="white">
  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"/>
</svg>
`;

// 样式
Object.assign(btn.style, {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '48px',
  height: '48px',
  border: 'none',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #4facfe, #007BFF)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 9999,
  padding: '0',
  opacity: '0',
  pointerEvents: 'none',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // 柔和阴影
  transition: 'opacity 0.4s, background 0.3s, transform 0.2s, box-shadow 0.3s',
});

// 悬停效果（渐变变深 + 浮起 + 阴影加强）
btn.onmouseenter = () => {
  btn.style.background = 'linear-gradient(135deg, #0056b3, #00408a)';
  btn.style.transform = 'translateY(-3px)';
  btn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
};
btn.onmouseleave = () => {
  btn.style.background = 'linear-gradient(135deg, #4facfe, #007BFF)';
  btn.style.transform = 'translateY(0)';
  btn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
};

// 点击回顶部
btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// 添加到页面
document.body.appendChild(btn);

// 滚动监听（淡入淡出 + 2秒不滑动自动隐藏）
let hideTimer;
window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop >= 500) {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }, 2000); // 2秒没滑动就淡出
  } else {
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
  }
});
