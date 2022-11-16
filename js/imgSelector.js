const mainImg = document.querySelector('.imgMain');
const img = document.querySelectorAll('.imgChica');

img.forEach(img =>{
    img.addEventListener('click', function() {
        const active = document.querySelector('.imgActive');
        active.classList.remove('imgActive');
        this.classList.add('imgActive');
        mainImg.src = this.src;
    })
})

const mainImg2 = document.querySelector('.imgMain2');
const img2 = document.querySelectorAll('.imgChica2');

img2.forEach(img2 =>{
    img2.addEventListener('click', function() {
        const active = document.querySelector('.imgActive2');
        active.classList.remove('imgActive2');
        this.classList.add('imgActive2');
        mainImg2.src = this.src;
    })
})