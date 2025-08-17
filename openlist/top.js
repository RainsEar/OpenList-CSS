<script>
// 创建按钮
const btn = document.createElement('button');
btn.id = 'zhidingan';
btn.innerHTML = `
<svg viewBox="0 0 24 24" width="24" height="24" fill="white">
  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z"/>
</svg>
`;

// 注入样式
Object.assign(btn.style, {
  display: 'none',         // 默认隐藏
  width: '50px',
  height: '50px',
  position: 'fixed',
  right: '20px',
  bottom: '20px',
  zIndex: '999',
  cursor: 'pointer',
  border: 'none',
  background: '#007BFF',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  animation: 'zhidingdh 2s' // 入场动画
});

// SVG 自适应
btn.querySelector('svg').style.cssText = `
  width: 100%;
  height: 100%;
`;

// 点击回到顶部
function zdtop() {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
}
btn.onclick = zdtop;

// 添加到页面
document.body.appendChild(btn);

// 滚动监听
window.onscroll = function () {
  var zhidingb = document.documentElement.scrollTop || document.body.scrollTop;
  var zhidingx = document.getElementById('zhidingan');
  if (zhidingb >= 500) {
    zhidingx.style.display = 'block';
  } else {
    zhidingx.style.display = 'none';
  }
};

// 用 JS 注入 keyframes 动画
const keyframes = `
@keyframes zhidingdh {
  0% {
    bottom: -50px;
    opacity: 0;
  }
  100% {
    bottom: 20px;
    opacity: 1;
  }
}`;
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(keyframes);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
</script>
