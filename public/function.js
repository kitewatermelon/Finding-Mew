document.addEventListener('DOMContentLoaded', function() {
    var grayTop = document.querySelector('.graytop');
    var grayBot = document.querySelector('.graybot');
    var textBox = document.querySelector('.textBox');

    grayTop.addEventListener('click', function() {
        this.style.transform = 'rotate(60deg)';
        setTimeout(function() {
            window.location.href = '/sticker';
        }, 1000); // 3초 후에 sticker.html로 이동
    });

    grayBot.addEventListener('click', function() {
        grayTop.style.transform = 'rotate(60deg)';
        setTimeout(function() {
            window.location.href = '/sticker';
        }, 1000); // 3초 후에 sticker.html로 이동
    });
});

var arrow = document.querySelector('.arrow');

setInterval(function() {
    arrow.innerText = '▽';
}, 500); // 0.5초마다 내용을 ▽로 변경
setInterval(function() {
    arrow.innerText = '▼';
}, 1000); // 0.5초마다 내용을 ▽로 변경

