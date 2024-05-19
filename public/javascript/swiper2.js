// View Property Page Slider JS
const mainSwiper = new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});

const swiper2 = new Swiper('.mySwiper2', {
    loop: true,
    spaceBetween: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs : {
        swiper : mainSwiper
    }
})

// Get scroll back to top button:
let mybutton = document.getElementById("myBtn")

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}