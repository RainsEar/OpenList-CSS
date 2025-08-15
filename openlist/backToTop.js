// 创建按钮
const btn = document.createElement('button');
btn.id = 'zhidingan';
btn.innerHTML = `
<svg viewBox="0 0 24 24" width="24" height="24" fill="white"
     style="transition: filter 0.4s ease;">
  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"/>
</svg>
`;

// 按钮样式
Object.assign(btn.style, {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '48px',
  height: '48px',
  border: 'none',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #4facfe, #007BFF)', // 渐变蓝
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 9999,
  padding: '0',
  opacity: '0',
  transform: 'scale(0.8)',
  pointerEvents: 'none',
  boxShadow: `
    0 4px 12px rgba(0, 0, 0, 0.2),
    0 0 8px rgba(79, 172, 254, 0.6),
    0 0 15px rgba(0, 123, 255, 0.4)
  `,
  transition: 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
});

// 点击回顶部
btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// 添加到页面
document.body.appendChild(btn);

const arrow = btn.querySelector('svg');
let lastScrollTop = 0;
let hideTimer;

function showBtn() {
  btn.style.opacity = '1';
  btn.style.transform = 'scale(1)';
  btn.style.pointerEvents = 'auto';
  btn.style.boxShadow = `
    0 4px 12px rgba(0, 0, 0, 0.25),
    0 0 8px rgba(79, 172, 254, 0.8),
    0 0 15px rgba(0, 123, 255, 0.6)
  `;
  arrow.style.filter = 'drop-shadow(0 0 4px rgba(79, 172, 254, 0.8)) drop-shadow(0 0 6px rgba(0, 123, 255, 0.6))';
}

function hideBtn() {
  btn.style.opacity = '0';
  btn.style.transform = 'scale(0.8)';
  btn.style.pointerEvents = 'none';
  btn.style.boxShadow = `
    0 4px 12px rgba(0, 0, 0, 0.2),
    0 0 8px rgba(79, 172, 254, 0),
    0 0 15px rgba(0, 123, 255, 0)
  `;
  arrow.style.filter = 'drop-shadow(0 0 4px rgba(79, 172, 254, 0)) drop-shadow(0 0 6px rgba(0, 123, 255, 0))';
}

// 滚动监听（判断方向）
window.addEventListener('scroll', () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  // 向上滚动且超过 500px
  if (scrollTop < lastScrollTop && scrollTop >= 500) {
    showBtn();
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideBtn, 2000);
  } else {
    hideBtn();
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 防止负数
});
