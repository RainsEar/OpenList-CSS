(function() {
  // 创建按钮
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
    transform: 'scale(0.8)',
    pointerEvents: 'none',
    boxShadow: '0 2px 6px rgba(0,123,255,0.3)',
    transition: 'opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease'
  });

  document.body.appendChild(btn);

  const arrow = btn.querySelector('svg');
  let hideTimer, ticking = false, isHovering = false;

  function updateStyle({ scale, shadow, opacity = null, pointer = null, filter = null }) {
    if (scale !== undefined) btn.style.transform = `scale(${scale})`;
    if (shadow !== undefined) btn.style.boxShadow = shadow;
    if (opacity !== null) btn.style.opacity = opacity;
    if (pointer !== null) btn.style.pointerEvents = pointer;
    if (filter !== null) arrow.style.filter = filter;
  }

  function showBtn() {
    updateStyle({
      scale: 1,
      shadow: '0 4px 10px rgba(0,123,255,0.5)',
      opacity: '1',
      pointer: 'auto',
      filter: 'drop-shadow(0 0 2px rgba(0,123,255,0.5))'
    });
  }

  function hideBtn() {
    if (isHovering) return;
    updateStyle({
      scale: 0.8,
      shadow: '0 2px 6px rgba(0,123,255,0.3)',
      opacity: '0',
      pointer: 'none',
      filter: 'drop-shadow(0 0 0 rgba(0,123,255,0))'
    });
  }

  btn.addEventListener('mouseenter', () => {
    isHovering = true;
    clearTimeout(hideTimer);
    updateStyle({ scale: 1.1, shadow: '0 6px 12px rgba(0,123,255,0.6)' });
  });

  btn.addEventListener('mouseleave', () => {
    isHovering = false;
    updateStyle({ scale: 1, shadow: '0 4px 10px rgba(0,123,255,0.5)' });
    hideTimer = setTimeout(hideBtn, 1500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        clearTimeout(hideTimer);
        if (scrollTop >= 400) {
          showBtn();
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
