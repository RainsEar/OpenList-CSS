window.onscroll = function () {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const zhidingBtn = document.getElementById('zhidingan');

  zhidingBtn.style.display = scrollTop >= 500 ? 'block' : 'none';
}

function zdtop() {
  window.scroll({ top: 0, behavior: 'smooth' });
}
