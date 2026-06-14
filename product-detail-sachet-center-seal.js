// ==========================================================================
// JAVASCRIPT KHUSUS: ANIMASI SCROLL (BOLAK-BALIK) & KACA PEMBESAR SPESIFIKASI
// ==========================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. ANIMASI MASUK TEKS HERO BANNER (Saat Pertama Load)
    const heroContent = document.querySelector('.bs-hero-full-content');
    if(heroContent) {
        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateX(-30px)";
        heroContent.style.transition = "all 0.8s ease";
        setTimeout(() => {
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateX(0)";
        }, 100);
    }

    // ==========================================================================
    // 2. LOGIKA BARU: INTERSECTION OBSERVER (MUNCUL KE BAWAH, HILANG KE ATAS)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    // Menghapus parameter 'observer' karena kita ingin memantau elemen terus-menerus
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Saat di-scroll ke bawah dan masuk layar -> Munculkan
                entry.target.classList.add('appeared'); 
            } else {
                // JAWABAN: Saat di-scroll ke atas dan keluar layar -> Hilangkan kembali
                entry.target.classList.remove('appeared'); 
            }
        });
    }, {
        threshold: 0.1, // Respons senyap: memicu efek saat 10% bagian elemen terlihat/hilang
        rootMargin: "0px 0px -40px 0px" // Jeda halus di batas bawah layar komputer
    });

    // Daftarkan semua elemen yang mau dianimasikan ke observer
    revealElements.forEach(element => {
        scrollObserver.observe(element);
    });


    // ==========================================================================
    // 3. KACA PEMBESAR (120% ZOOM) PADA GAMBAR SPESIFIKASI
    // ==========================================================================
    const magnifierArea = document.querySelector('.bs-gallery-large'); 
    const imgElement = document.querySelector('.bs-gallery-img');       

    if (magnifierArea && imgElement) {
        magnifierArea.style.position = 'relative';
        magnifierArea.style.overflow = 'hidden';

        const zoomedImg = document.createElement('div');
        zoomedImg.id = 'zoomed-spec-layer';
        zoomedImg.style.position = 'absolute';
        zoomedImg.style.top = '0';
        zoomedImg.style.left = '0';
        zoomedImg.style.width = '100%';
        zoomedImg.style.height = '100%';
        zoomedImg.style.backgroundImage = `url('${imgElement.src}')`; 
        zoomedImg.style.backgroundSize = '120%'; 
        zoomedImg.style.backgroundRepeat = 'no-repeat';
        zoomedImg.style.pointerEvents = 'none';
        zoomedImg.style.opacity = '0';
        zoomedImg.style.transition = 'opacity 0.2s ease';
        zoomedImg.style.zIndex = '10';
        
        magnifierArea.appendChild(zoomedImg);

        magnifierArea.addEventListener('mousemove', function(e) {
            zoomedImg.style.opacity = '1'; 
            const { left, top, width, height } = magnifierArea.getBoundingClientRect();
            const xPercent = ((e.clientX - left) / width) * 100;
            const yPercent = ((e.clientY - top) / height) * 100;
            zoomedImg.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        });

        magnifierArea.addEventListener('mouseleave', function() {
            zoomedImg.style.opacity = '0'; 
        });
    }
});
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