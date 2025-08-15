window.onscroll = function () {
  var zhidingb = document.documentElement.scrollTop || document.body.scrollTop;
  var zhidingx = document.getElementById('zhidingan');

  if (zhidingb >= 500) {
    zhidingx.style.display = 'block';
  } else {
    zhidingx.style.display = 'none';
  }
};

function zdtop() {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
}
