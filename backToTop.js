/* top.js (final, reviewed) */
(function () {
  // ======= 可调参数 =======
  const THRESHOLD = 500;          // 显示按钮的滚动阈值(px)
  const MAX_SCALE_EXTRA = 0.5;    // 额外放大上限(1.0 基础 + 0.5 = 1.5倍)
  const FOLLOW_OFFSET = 30;       // 桌面端靠近跟随偏移
  const EXPAND_NEAR = 60;         // 靠近自动展开阈值
  const SNAP_PAD = 10;            // 吸附到边缘的内边距
  const BASE_RIGHT = 50;          // 初始距右
  const BASE_BOTTOM = 50;         // 初始距下

  // ======= 创建按钮 =======
  const btn = document.createElement('button');
  btn.id = 'zhidingan';
  btn.type = 'button';
  btn.title = '回到顶部';
  btn.setAttribute('aria-label', '回到顶部');
  btn.textContent = '↑ 0%';
  document.body.appendChild(btn);

  // ======= 样式 =======
  const style = document.createElement('style');
  style.innerHTML = `
  #zhidingan{
    /* 动画变量：用 CSS 变量避免 JS 覆盖 transform */
    --scale: 0;
    --ty: 50px;

    display:none;
    position:fixed;
    bottom:${BASE_BOTTOM}px;
    right:${BASE_RIGHT}px;
    width:50px;height:50px;padding:0;
    font-size:16px;line-height:1;
    border:none;border-radius:50%;
    background:rgba(0,123,255,0.7);
    color:#fff;cursor:pointer;user-select:none;
    display:flex;align-items:center;justify-content:center;
    transform: translateY(var(--ty)) scale(var(--scale));
    transition:
      transform .5s cubic-bezier(0.68,-0.55,0.265,1.55),
      opacity .5s,
      width .3s, height .3s,
      background .3s, color .3s,
      right .3s, bottom .3s;
    z-index:9999; touch-action:none; overflow:hidden; opacity:0;
    box-shadow:0 8px 20px rgba(0,0,0,.12);
  }
  #zhidingan.show{ --ty:0; opacity:1; }
  #zhidingan:hover, #zhidingan.expanded{
    width:80px; height:50px; border-radius:25px; font-size:18px;
    background:rgba(0,86,179,0.9);
  }
  #zhidingan.bottom{ background:rgba(255,255,255,0.9); color:#007BFF; }
  @media (prefers-reduced-motion: reduce){
    #zhidingan{ transition:none; transform:none !important; opacity:1; }
    #zhidingan.show{ opacity:1; }
  }`;
  document.head.appendChild(style);

  // ======= 状态 =======
  let isVisible = false;
  let hideTimer = null;
  let isDragging = false;
  let userMoved = false;     // 用户是否拖动过（若拖动过，停止鼠标靠近跟随）
  let dragStartX = 0, dragStartY = 0, startRight = 0, startBottom = 0;
  let dragMoved = 0;         // 拖动距离（用于阻止误触点击）
  let suppressClick = false; // 拖完立即点击的误触保护

  // 工具：确保 inline 位置值存在（避免首次 parseFloat 为空）
  function ensureInlinePosition() {
    const cs = getComputedStyle(btn);
    if (!btn.style.right)  btn.style.right  = cs.right;
    if (!btn.style.bottom) btn.style.bottom = cs.bottom;
  }

  // 工具：clamp
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  // ======= 显示/隐藏 & 动态更新 =======
  const onScroll = () => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollTop = doc.scrollTop || body.scrollTop || 0;
    const scrollMax = Math.max(0, doc.scrollHeight - window.innerHeight);
    const atBottom = scrollTop + window.innerHeight >= doc.scrollHeight - 10;
    const percent = scrollMax > 0 ? Math.min(Math.round((scrollTop / scrollMax) * 100), 100) : 0;

    if (scrollTop >= THRESHOLD) {
      // 显示
      if (!isVisible) {
        isVisible = true;
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        btn.style.display = 'flex';
        // 下一帧加 show 触发弹跳动画
        requestAnimationFrame(() => btn.classList.add('show'));
      }

      // 缩放（不覆盖 translateY，统一走 CSS 变量）
      const extra = clamp((scrollTop - THRESHOLD) / 1000, 0, MAX_SCALE_EXTRA);
      const scale = 1 + extra;
      btn.style.setProperty('--scale', scale.toFixed(3));

      // 底部反转（清理内联样式，避免覆盖类）
      if (atBottom) {
        btn.classList.add('bottom');
        btn.style.removeProperty('background');
        btn.style.removeProperty('color');
      } else {
        btn.classList.remove('bottom');
        const alpha = clamp(0.7 + (scrollTop - THRESHOLD) / 2000, 0.7, 1);
        btn.style.background = `rgba(0,123,255,${alpha.toFixed(3)})`;
        btn.style.color = '#fff';
      }

      // 百分比
      btn.textContent = `↑ ${percent}%`;
    } else {
      // 隐藏
      if (isVisible) {
        isVisible = false;
        btn.classList.remove('show');           // 触发滑出
        btn.style.setProperty('--scale', '0');  // 同步缩回
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          btn.style.display = 'none';
          // 复位
          btn.classList.remove('bottom', 'expanded');
          btn.textContent = '↑ 0%';
          btn.style.removeProperty('background');
          btn.style.removeProperty('color');
          btn.style.right = `${BASE_RIGHT}px`;
          btn.style.bottom = `${BASE_BOTTOM}px`;
          userMoved = false;
        }, 500); // 与 CSS 动画时长一致
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ======= 点击/键盘：回到顶部（带误触保护）=======
  function goTop() {
    if (suppressClick) { suppressClick = false; return; }
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }
  btn.addEventListener('click', goTop);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goTop();
    }
  });

  // ======= 桌面：靠近跟随 + 自动展开（未拖动时才启用）=======
  document.addEventListener('mousemove', (e) => {
    if (!isVisible || isDragging || userMoved || ('ontouchstart' in window)) return;
    ensureInlinePosition();
    const rect = btn.getBoundingClientRect();
    const dx = clamp(e.clientX - (rect.left + rect.width / 2), -FOLLOW_OFFSET, FOLLOW_OFFSET);
    const dy = clamp(e.clientY - (rect.top + rect.height / 2), -FOLLOW_OFFSET, FOLLOW_OFFSET);
    btn.style.right = `${BASE_RIGHT - dx}px`;
    btn.style.bottom = `${BASE_BOTTOM - dy}px`;

    // 靠近时展开
    const nearX = Math.abs(e.clientX - (rect.left + rect.width / 2)) < EXPAND_NEAR;
    const nearY = Math.abs(e.clientY - (rect.top + rect.height / 2)) < EXPAND_NEAR;
    btn.classList.toggle('expanded', nearX && nearY);
  });

  // ======= 拖动（桌面 + 移动）并吸附到最近边缘 =======
  function dragStart(ev) {
    isDragging = true; dragMoved = 0; userMoved = true;
    const t = ev.touches ? ev.touches[0] : ev;
    ensureInlinePosition();
    dragStartX = t.clientX; dragStartY = t.clientY;
    startRight = parseFloat(btn.style.right) || BASE_RIGHT;
    startBottom = parseFloat(btn.style.bottom) || BASE_BOTTOM;
    btn.classList.remove('expanded');
  }
  function dragMove(ev) {
    if (!isDragging) return;
    const t = ev.touches ? ev.touches[0] : ev;
    const dx = dragStartX - t.clientX;
    const dy = dragStartY - t.clientY;
    dragMoved = Math.max(dragMoved, Math.hypot(dx, dy));
    const rect = btn.getBoundingClientRect();
    const maxRight = window.innerWidth  - rect.width  - SNAP_PAD;
    const maxBottom= window.innerHeight - rect.height - SNAP_PAD;
    const newRight = clamp(startRight + dx, SNAP_PAD, maxRight);
    const newBottom= clamp(startBottom + dy, SNAP_PAD, maxBottom);
    btn.style.right = `${newRight}px`;
    btn.style.bottom = `${newBottom}px`;
  }
  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    // 拖拽误触保护
    if (dragMoved > 6) suppressClick = true;

    // 吸附最近边缘
    const rect = btn.getBoundingClientRect();
    const ww = window.innerWidth, wh = window.innerHeight;
    const distR = ww - rect.right, distL = rect.left;
    const distB = wh - rect.bottom, distT = rect.top;
    const minDist = Math.min(distR, distL, distB, distT);

    ensureInlinePosition(); // 保证有 inline 值可改
    if (minDist === distR) btn.style.right  = `${SNAP_PAD}px`;
    else if (minDist === distL) btn.style.right = `${ww - rect.width - SNAP_PAD}px`;
    if (minDist === distB) btn.style.bottom = `${SNAP_PAD}px`;
    else if (minDist === distT) btn.style.bottom = `${wh - rect.height - SNAP_PAD}px`;
  }

  // 桌面
  btn.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);
  // 移动
  btn.addEventListener('touchstart', dragStart, { passive: true });
  btn.addEventListener('touchmove',  dragMove,  { passive: true });
  btn.addEventListener('touchend',   dragEnd,   { passive: true });

  // 首次计算
  onScroll();
})();
