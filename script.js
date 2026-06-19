document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. HERO SLIDER */
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const arrowLeft = document.querySelector('.hero-arrow-left');
    const arrowRight = document.querySelector('.hero-arrow-right');
    
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            if(dots[i]) dots[i].classList.toggle('active', i === index);
        });
        currentSlide = index;
    }
    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }
    function startAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000);
    }
    function stopAutoPlay() { clearInterval(slideInterval); }

    if (arrowRight && arrowLeft) {
        arrowRight.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
        arrowLeft.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { stopAutoPlay(); showSlide(index); startAutoPlay(); });
    });

    if (slides.length > 0) { showSlide(0); startAutoPlay(); }

    /* 2. CARROSSEL DA GALERIA */
    const photoTrack = document.querySelector('.photo-track');

    if (photoTrack && photoTrack.children.length > 0) {
        let isAnimating = false;

        function advanceCarousel() { 
            if (isAnimating) return;
            isAnimating = true;

            // 1. Pega o primeiro item e calcula o tamanho exato dele
            const firstItem = photoTrack.firstElementChild;
            const itemWidth = firstItem.getBoundingClientRect().width;

            // Pega o espaçamento (gap) definido no CSS
            const gap = parseFloat(window.getComputedStyle(photoTrack).gap) || 0;
            const moveDistance = itemWidth + gap;

            // Aplica a transição com o nome corrigido (photoTrack)
            photoTrack.style.transition = 'transform 0.5s ease';
            photoTrack.style.transform = `translateX(-${moveDistance}px)`;

            // Executa após terminar o movimento do slide
            const onTransitionEnd = () => {
                photoTrack.style.transition = 'none';
                photoTrack.style.transform = 'translateX(0)';

                // Move o primeiro item para o final da fila (loop infinito)
                photoTrack.appendChild(firstItem);

                isAnimating = false;
                photoTrack.removeEventListener('transitionend', onTransitionEnd);
            };

            photoTrack.addEventListener('transitionend', onTransitionEnd);
        }

        // O setInterval correto fica AQUI FORA da função, iniciando o carrossel a cada 3 segundos
        setInterval(advanceCarousel, 3000);
    }
}); 