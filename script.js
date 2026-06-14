// ==========================================================================
// 1. Logika Background Slider Otomatis
// ==========================================================================
const slides = document.querySelectorAll('.hero-bg-slider .slide');
let currentSlide = 0;
const slideInterval = 4000; 

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, slideInterval);


// ==========================================================================
// 2. Logika Animasi Muncul Saat Di-scroll
// ==========================================================================
const hiddenElements = document.querySelectorAll('.hidden-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-scroll');
        }
    });
}, {
    threshold: 0.15 
});

hiddenElements.forEach((el) => observer.observe(el));