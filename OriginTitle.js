var OriginTitle = document.title;
var titleTimer;

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        document.title = "你别走吖 ʕ ᵔᴥᵔ ʔ";
        clearTimeout(titleTimer);
    } else {
        document.title = "欢迎回家 o( ❛ᴗ❛ )o";
        titleTimer = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});