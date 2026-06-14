// ==========================================================================
// 1. Logika Background Slider Otomatis
// ==========================================================================
const slides = document.querySelectorAll('.hero-bg-slider .slide');
let currentSlide = 0;
const slideInterval = 4000; 

function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
}


// ==========================================================================
// 2. UPDATED LOGIKA: ANIMASI SCROLL BOLAK-BALIK (MUNCUL & HILANG)
// ==========================================================================
const hiddenElements = document.querySelectorAll('.hidden-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Saat di-scroll ke bawah dan masuk layar -> Munculkan
            entry.target.classList.add('show-scroll');
        } else {
            // JAWABAN: Saat di-scroll ke atas dan keluar layar -> Hilangkan kembali
            entry.target.classList.remove('show-scroll');
        }
    });
}, {
    threshold: 0.1, // Memicu transisi lebih cepat & sensitif saat 10% elemen terlihat
    rootMargin: "0px 0px -40px 0px" // Jeda halus agar animasi terasa natural sebelum mentok layar
});

hiddenElements.forEach((el) => observer.observe(el));


// ==========================================================================
// 3. Logika FAQ Accordion (Buka-Tutup Pertanyaan)
// ==========================================================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Tutup semua FAQ lain yang sedang terbuka
        document.querySelectorAll('.faq-item').forEach((item) => {
            item.classList.remove('active');
        });
        
        // Jika sebelumnya tidak aktif, sekarang buka item tersebut
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});


// ==========================================================================
// 4. Logika Interaktif Validasi Form + Efek Loading (AJAX Formspree)
// ==========================================================================
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman standar
        
        // Aktifkan animasi loading spinner pada tombol
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
        
        const data = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            // Matikan status loading
            submitBtn.classList.remove('is-loading');
            submitBtn.disabled = false;
            
            if (response.ok) {
                // Jika pengiriman sukses
                formStatus.className = "form-status-message success";
                formStatus.innerText = "Terima kasih! Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.";
                contactForm.reset(); // Kosongkan isi form kembali
            } else {
                // Jika server merespon tapi ada error
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerText = data["errors"].map(error => error.message).join(", ");
                    } else {
                        formStatus.innerText = "Oops! Terjadi kesalahan saat mengirim pesan.";
                    }
                });
                formStatus.className = "form-status-message error";
            }
        }).catch(error => {
            // Jika koneksi internet bermasalah
            submitBtn.classList.remove('is-loading');
            submitBtn.disabled = false;
            formStatus.className = "form-status-message error";
            formStatus.innerText = "Oops! Terjadi masalah koneksi. Silakan coba beberapa saat lagi.";
        });
    });
}
// Mengunci scroll saat halaman baru dimuat
document.body.classList.add('preloader-active');

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Berikan efek memudar (fade out)
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Buka kembali fungsi scroll setelah loading hilang
        setTimeout(() => {
            document.body.classList.remove('preloader-active');
        }, 500);
    }
});
