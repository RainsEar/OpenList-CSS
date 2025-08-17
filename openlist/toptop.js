(function() {
  const btn = document.createElement('button');
  btn.id = 'backToTopBtn';
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"/>
    </svg>
  `;

  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '48px',
    height: '48px',
    border: 'none',
    outline: 'none',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4facfe, #007BFF)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 9999,
    opacity: '0',
    transform: 'scale(0.8) translateY(0)',
    pointerEvents: 'none',
    boxShadow: '0 2px 6px rgba(0,123,255,0.3)',
    transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease'
  });

  document.body.appendChild(btn);

  const arrow = btn.querySelector('svg');
  let hideTimer, fadeTimer, ticking = false, isHovering = false;

  function updateStyle({ scale, shadow, translateY = 0, opacity = null, pointer = null, filter = null }) {
    if (scale !== undefined) btn.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    if (shadow !== undefined) btn.style.boxShadow = shadow;
    if (opacity !== null) btn.style.opacity = opacity;
    if (pointer !== null) btn.style.pointerEvents = pointer;
    if (filter !== null) arrow.style.filter = filter;
  }

  function showBtn(floatY = 0) {
    updateStyle({
      scale: 1,
      translateY: floatY,
      shadow: '0 4px 10px rgba(0,123,255,0.5)',
      opacity: '1',
      pointer: 'auto',
      filter: 'drop-shadow(0 0 4px rgba(0,123,255,0.5))'
    });
  }

  function hideBtn() {
    if (isHovering) return;
    updateStyle({
      scale: 0.8,
      translateY: 0,
      shadow: '0 2px 6px rgba(0,123,255,0.3)',
      opacity: '0',
      pointer: 'none',
      filter: 'drop-shadow(0 0 0 rgba(0,123,255,0))'
    });
  }

  // 悬停动画
  btn.addEventListener('mouseenter', () => {
    isHovering = true;
    clearTimeout(hideTimer);
    clearTimeout(fadeTimer);
    updateStyle({ scale: 1.1, shadow: '0 6px 12px rgba(0,123,255,0.6)' });
  });

  btn.addEventListener('mouseleave', () => {
    isHovering = false;
    updateStyle({ scale: 1, shadow: '0 4px 10px rgba(0,123,255,0.5)' });
    hideTimer = setTimeout(hideBtn, 1500);
  });

  // 点击回顶部 + 立即隐藏
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    clearTimeout(hideTimer);
    clearTimeout(fadeTimer);
    hideBtn();
  });

  // 滚动/触控显示隐藏 + 节流 + 浮动动画
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        clearTimeout(hideTimer);
        clearTimeout(fadeTimer);

        if (scrollTop >= 400) {
          // 滑动中轻微上浮 5px
          showBtn(5);
          // 滑动停止 300ms 后回到原位并淡出
          if (!isHovering) fadeTimer = setTimeout(hideBtn, 300);
        } else {
          hideBtn();
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('touchmove', handleScroll);
})();
