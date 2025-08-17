(function() {
  // 创建按钮
  const btn = document.createElement('button');
  btn.id = 'backToTopBtn';
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"/>
    </svg>
  `;
  
  // 按钮基础样式
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
    opacity: '0',
    transform: 'scale(0.8)',
    pointerEvents: 'none',
    boxShadow: '0 4px 10px rgba(0,123,255,0.4)',
    transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease'
  });

  // 添加按钮到页面
  document.body.appendChild(btn);

  const arrow = btn.querySelector('svg');
  let hideTimer, ticking = false;
  let isHovering = false;

  // 显示按钮
  function showBtn() {
    btn.style.opacity = '1';
    btn.style.transform = 'scale(1)';
    btn.style.pointerEvents = 'auto';
    btn.style.boxShadow = '0 4px 12px rgba(0,123,255,0.6)';
    arrow.style.filter = 'drop-shadow(0 0 4px rgba(0,123,255,0.6))';
  }

  // 隐藏按钮
  function hideBtn() {
    if (isHovering) return;
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.8)';
    btn.style.pointerEvents = 'none';
    btn.style.boxShadow = '0 4px 10px rgba(0,123,255,0.2)';
    arrow.style.filter = 'drop-shadow(0 0 0 rgba(0,123,255,0))';
  }

  // 鼠标悬停保持显示
  btn.addEventListener('mouseenter', () => {
    isHovering = true;
    clearTimeout(hideTimer);
  });
  btn.addEventListener('mouseleave', () => {
    isHovering = false;
    hideTimer = setTimeout(hideBtn, 1500);
  });

  // 点击回顶部
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // 滚动监听 + 节流
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 400) {
          showBtn();
          clearTimeout(hideTimer);
          if (!isHovering) hideTimer = setTimeout(hideBtn, 1500);
        } else {
          hideBtn();
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();
