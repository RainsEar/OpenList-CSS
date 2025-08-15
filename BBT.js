// 创建回到顶部圆形按钮
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.innerHTML = '⬆'; // 箭头符号，可换成喜欢的图标
backToTopBtn.style.cssText = `
  display: none;
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  opacity: 0;
  transition: opacity 0.5s, transform 0.3s;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;
document.body.appendChild(backToTopBtn);

// 鼠标悬停放大效果
backToTopBtn.addEventListener('mouseenter', () => {
  backToTopBtn.style.transform = 'scale(1.2)';
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
