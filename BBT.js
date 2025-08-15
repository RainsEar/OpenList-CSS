// 创建回到顶部圆形 SVG 按钮
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.innerHTML = `
<svg viewBox="0 0 24 24" width="24" height="24" fill="white">
  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"/>
</svg>
`;
backToTopBtn.style.cssText = `
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  padding: 5px;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.5s, transform 0.3s;
  z-index: 1000;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
`;
document.body.appendChild(backToTopBtn);

// 鼠标悬停放大效果
backToTopBtn.addEventListener('mouseenter', () => {
  backToTopBtn.style.transform = 'scale(1.3)';
});
backToTopBtn.addEventListener('mouseleave', () => {
  backToTopBtn.style.transform = 'scale(1)';
});

// 滚动事件：超过 500px 显示按钮，否则隐藏
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop >= 500) {
    backToTopBtn.style.display = 'block';
    setTimeout(() => backToTopBtn.style.opacity = '1', 10);
  } else {
    backToTopBtn.style.opacity = '0';
    setTimeout(() => backToTopBtn.style.display = 'none', 500);
  }
});

// 点击按钮平滑回到顶部
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
