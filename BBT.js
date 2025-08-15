// 创建回到顶部圆形 SVG 按钮
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.innerHTML = `
<svg viewBox="0 0 24 24" width="24" height="24" fill="white">
  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"/>
</svg>
`;
backToTopBtn.style.cssText = `
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
  visibility: hidden;
  transform: scale(0.8);
  transition: opacity 0.4s ease, transform 0.4s ease;
  z-index: 1000;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
`;
document.body.appendChild(backToTopBtn);

let isHovered = false;

// 鼠标悬浮放大
backToTopBtn.addEventListener('mouseenter', () => {
  isHovered = true;
  backToTopBtn.style.transform = 'scale(1.2)';
});
backToTopBtn.addEventListener('mouseleave', () => {
  isHovered = false;
  backToTopBtn.style.transform = 'scale(1)';
});

// 滚动显示按钮
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop >= 100) {
    backToTopBtn.style.visibility = 'visible';
    backToTopBtn.style.opacity = '1';
    if (!isHovered) backToTopBtn.style.transform = 'scale(1)';
  } else {
    backToTopBtn.style.opacity = '0';
    if (!isHovered) backToTopBtn.style.transform = 'scale(0.8)';
    setTimeout(() => backToTopBtn.style.visibility = 'hidden', 400);
  }
});

// 点击按钮平滑回到顶部
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
