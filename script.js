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


// ==========================================================================
// 3. Logika FAQ Accordion (Buka-Tutup Pertanyaan)
// ==========================================================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
    question.addEventListener('click', function() {
        // Ambil elemen pembungkus utamanya (.faq-item)
        const faqItem = this.parentElement;
        
        // Cek jika item yang diklik sudah aktif sebelumnya
        const isActive = faqItem.classList.contains('active');
        
        // BONUS: Tutup semua FAQ lain yang sedang terbuka (efek eksklusif)
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
    contactForm.addEventListener('submit', async function(event) {
        // 1. Cegah form dari reload halaman bawaan browser
        event.preventDefault();
        
        // 2. Aktifkan efek loading spinner pada tombol
        submitBtn.classList.add('is-loading');
        submitBtn.innerText = "Sedang Mengirim...";
        
        // 3. Sembunyikan notifikasi lama jika ada
        formStatus.className = "form-status-message";
        formStatus.style.display = "none";

        // 4. Ambil semua data inputan dari form kamu
        const formData = new FormData(this);

        try {
            // 5. Kirim data ke Formspree secara sinkron di latar belakang
            const response = await fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // 6. Matikan efek loading spinner setelah respon diterima
            submitBtn.classList.remove('is-loading');
            submitBtn.innerText = "Kirim Pesan";

            if (response.ok) {
                // Jika sukses terkirim ke Formspree
                formStatus.textContent = "Pesan berhasil dikirim! Tim OK PACK akan segera menghubungi Anda.";
                formStatus.classList.add('success');
                contactForm.reset(); // Bersihkan isi kolom input form otomatis
            } else {
                // Jika server merespon tapi ada error data
                formStatus.textContent = "Oops! Terjadi masalah saat mengirim pesan. Coba lagi nanti.";
                formStatus.classList.add('error');
            }
        } catch (error) {
            // Jika terjadi gangguan koneksi internet
            submitBtn.classList.remove('is-loading');
            submitBtn.innerText = "Kirim Pesan";
            formStatus.textContent = "Gagal mengirim. Silakan periksa koneksi internet Anda.";
            formStatus.classList.add('error');
        }
    });
}
